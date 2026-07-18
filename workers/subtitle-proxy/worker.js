/**
 * SilenVault Subtitle Proxy — Cloudflare Worker
 *
 * Why: YouTube's ANDROID innertube player returns caption baseUrls that work
 * without WEB PO-tokens, but the browser cannot call youtubei (CORS/403).
 * Timedtext itself often allows CORS once you have a signed baseUrl.
 *
 * Routes:
 *   GET  /health
 *   GET  /yt/tracks?v=VIDEO_ID
 *   GET  /fetch?url=ENCODED_URL   (generic GET relay for VTT/XML/config)
 *   OPTIONS *                    (CORS preflight)
 */

const YT_KEY = 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w';
const ANDROID = {
  clientName: 'ANDROID',
  clientVersion: '20.10.38',
  androidSdkVersion: 30,
  hl: 'en',
  gl: 'US',
};

const ALLOWED_ORIGINS = [
  'https://tools.silenvault.com',
  'https://silenvault.com',
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://127.0.0.1:8080',
  'http://localhost:8080',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

function text(request, body, status = 200, type = 'text/plain; charset=utf-8') {
  return new Response(body, {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': type,
      'Cache-Control': 'public, max-age=60',
    },
  });
}

async function fetchYouTubeTracks(videoId) {
  const endpoint = `https://www.youtube.com/youtubei/v1/player?key=${YT_KEY}&prettyPrint=false`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip',
    },
    body: JSON.stringify({
      context: { client: { ...ANDROID } },
      videoId,
      contentCheckOk: true,
      racyCheckOk: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`YouTube player ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const tracks =
    data?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

  if (!tracks.length) {
    const status = data?.playabilityStatus?.status || 'UNKNOWN';
    const reason = data?.playabilityStatus?.reason || 'No caption tracks';
    throw new Error(`No captions (${status}): ${reason}`);
  }

  return tracks.map((t, idx) => {
    let url = t.baseUrl || '';
    if (url && !/[?&]fmt=/.test(url)) {
      url += (url.includes('?') ? '&' : '?') + 'fmt=srv3';
    }
    const label =
      (t.name && (t.name.simpleText || t.name.runs?.map((r) => r.text).join(''))) ||
      t.languageCode ||
      `Track ${idx + 1}`;
    return {
      id: `yt-${idx}-${t.languageCode || 'und'}`,
      label,
      lang: t.languageCode || 'und',
      kind: t.kind === 'asr' ? 'asr' : 'manual',
      url,
      source: 'android',
    };
  });
}

function isAllowedFetchTarget(urlStr) {
  let u;
  try {
    u = new URL(urlStr);
  } catch {
    return false;
  }
  if (u.protocol !== 'https:') return false;
  const host = u.hostname.toLowerCase();
  const allow = [
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'googlevideo.com',
    'player.vimeo.com',
    'vimeo.com',
    'www.dailymotion.com',
    'dailymotion.com',
    'static.dailymotion.com',
  ];
  return allow.some((h) => host === h || host.endsWith('.' + h));
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    try {
      if (path === '/health' || path === '/') {
        return json(request, {
          ok: true,
          service: 'silenvault-subtitle-proxy',
          routes: ['/health', '/yt/tracks?v=', '/fetch?url='],
        });
      }

      if (path === '/yt/tracks') {
        const videoId = (url.searchParams.get('v') || url.searchParams.get('id') || '').trim();
        if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
          return json(request, { error: 'Invalid or missing video id (v)' }, 400);
        }
        const tracks = await fetchYouTubeTracks(videoId);
        return json(request, { videoId, tracks, count: tracks.length });
      }

      if (path === '/fetch') {
        const target = url.searchParams.get('url') || '';
        if (!target || !isAllowedFetchTarget(target)) {
          return json(request, { error: 'Missing or disallowed url param' }, 400);
        }
        const upstream = await fetch(target, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            Accept: '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        });
        const body = await upstream.arrayBuffer();
        const type = upstream.headers.get('content-type') || 'text/plain; charset=utf-8';
        return new Response(body, {
          status: upstream.status,
          headers: {
            ...corsHeaders(request),
            'Content-Type': type,
            'Cache-Control': 'public, max-age=120',
          },
        });
      }

      return json(request, { error: 'Not found' }, 404);
    } catch (e) {
      return json(request, { error: e.message || String(e) }, 502);
    }
  },
};
