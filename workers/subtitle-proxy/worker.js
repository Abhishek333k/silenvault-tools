/**
 * SilenVault Subtitle Proxy — Cloudflare Worker (site infrastructure)
 *
 * Mount at: tools.silenvault.com/api/subtitles/*
 * Visitors never configure this — the tool page talks same-origin only.
 *
 * Routes:
 *   GET /health
 *   GET /yt/tracks?v=VIDEO_ID
 *   GET /yt/caption?v=VIDEO_ID&lang=xx&kind=asr|manual&fmt=json|srt|vtt|txt|raw
 *   GET /fetch?url=ENCODED_URL
 *   OPTIONS *
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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=120',
    },
  });
}

function text(request, body, status = 200, type = 'text/plain; charset=utf-8') {
  return new Response(body, {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': type,
      'Cache-Control': 'public, max-age=120',
    },
  });
}

function pad(n, w = 2) {
  return String(n).padStart(w, '0');
}

function msToSrtTime(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const milli = Math.floor(ms % 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(milli, 3)}`;
}

function msToVttTime(ms) {
  return msToSrtTime(ms).replace(',', '.');
}

function cuesToSrt(cues) {
  return cues
    .map((c, i) => `${i + 1}\n${msToSrtTime(c.startMs)} --> ${msToSrtTime(c.endMs)}\n${c.text}\n`)
    .join('\n');
}

function cuesToVtt(cues) {
  return `WEBVTT\n\n${cues.map((c) => `${msToVttTime(c.startMs)} --> ${msToVttTime(c.endMs)}\n${c.text}`).join('\n\n')}\n`;
}

function cuesToTxt(cues) {
  return cues.map((c) => c.text).filter(Boolean).join('\n');
}

function decodeEntities(str) {
  return String(str || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
}

function cleanText(raw) {
  return decodeEntities(
    String(raw || '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function parseSrv3OrXml(xml) {
  const cues = [];
  // <p t="ms" d="ms">text</p>
  const pRe = /<p\b([^>]*)>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = pRe.exec(xml))) {
    const attrs = m[1];
    const t = +(attrs.match(/\bt="(\d+)"/) || [])[1] || 0;
    const d = +(attrs.match(/\bd="(\d+)"/) || [])[1] || 2000;
    const text = cleanText(m[2]);
    if (text) cues.push({ startMs: t, endMs: t + d, text });
  }
  if (cues.length) return cues;
  // <text start="1.2" dur="2.3">
  const tRe = /<text\b([^>]*)>([\s\S]*?)<\/text>/gi;
  while ((m = tRe.exec(xml))) {
    const attrs = m[1];
    const start = parseFloat((attrs.match(/\bstart="([^"]+)"/) || [])[1] || '0') * 1000;
    const dur = parseFloat((attrs.match(/\bdur="([^"]+)"/) || [])[1] || '2') * 1000;
    const text = cleanText(m[2]);
    if (text) cues.push({ startMs: Math.round(start), endMs: Math.round(start + dur), text });
  }
  return cues;
}

function parseJson3(json) {
  const events = json.events || [];
  const cues = [];
  for (const ev of events) {
    if (!ev.segs || ev.tStartMs == null) continue;
    const text = cleanText(ev.segs.map((s) => s.utf8 || '').join(''));
    if (!text) continue;
    const startMs = ev.tStartMs;
    const endMs = startMs + (ev.dDurationMs || 2000);
    cues.push({ startMs, endMs, text });
  }
  return cues;
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
    throw new Error(`YouTube player ${res.status}: ${errText.slice(0, 160)}`);
  }

  const data = await res.json();
  const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
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

async function fetchTimedtext(url) {
  const attempts = [
    url,
    url.replace(/[?&]fmt=[^&]*/g, '') + (url.includes('?') ? '&' : '?') + 'fmt=json3',
    url.replace(/[?&]fmt=[^&]*/g, '') + (url.includes('?') ? '&' : '?') + 'fmt=srv3',
  ];
  let last = '';
  for (const u of attempts) {
    const res = await fetch(u, {
      headers: {
        'User-Agent': 'com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip',
        Accept: '*/*',
      },
    });
    const body = await res.text();
    last = body;
    if (res.status === 429) throw new Error('YouTube rate-limited caption download. Try again shortly.');
    if (!body || body.length < 20) continue;
    if (body.includes('<html') && body.length < 5000) continue;
    return body;
  }
  throw new Error('Empty caption payload from YouTube');
}

function parseCaptionBody(body) {
  const trimmed = body.trim();
  if (trimmed.startsWith('{')) {
    try {
      const cues = parseJson3(JSON.parse(trimmed));
      if (cues.length) return { cues, raw: body };
    } catch (_) {}
  }
  const cues = parseSrv3OrXml(body);
  return { cues, raw: body };
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
    // Support both / and /api/subtitles prefix when routed
    let path = url.pathname.replace(/\/+$/, '') || '/';
    path = path.replace(/^\/api\/subtitles/, '') || '/';

    try {
      if (path === '/health' || path === '/') {
        return json(request, {
          ok: true,
          service: 'silenvault-subtitle-proxy',
          routes: ['/health', '/yt/tracks?v=', '/yt/caption?v=&lang=', '/fetch?url='],
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

      if (path === '/yt/caption') {
        const videoId = (url.searchParams.get('v') || url.searchParams.get('id') || '').trim();
        const lang = (url.searchParams.get('lang') || 'en').trim();
        const kind = (url.searchParams.get('kind') || '').trim(); // asr | manual | ''
        const fmt = (url.searchParams.get('fmt') || 'json').trim().toLowerCase();
        if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
          return json(request, { error: 'Invalid or missing video id (v)' }, 400);
        }

        const tracks = await fetchYouTubeTracks(videoId);
        const match =
          tracks.find((t) => t.lang === lang && (!kind || t.kind === kind)) ||
          tracks.find((t) => t.lang === lang) ||
          tracks.find((t) => t.lang.startsWith(lang)) ||
          tracks[0];
        if (!match) return json(request, { error: 'No matching caption track' }, 404);

        const raw = await fetchTimedtext(match.url);
        const { cues } = parseCaptionBody(raw);
        if (!cues.length && !raw) {
          return json(request, { error: 'Caption body empty' }, 502);
        }

        if (fmt === 'srt') return text(request, cuesToSrt(cues), 200, 'application/x-subrip; charset=utf-8');
        if (fmt === 'vtt') return text(request, cuesToVtt(cues), 200, 'text/vtt; charset=utf-8');
        if (fmt === 'txt') return text(request, cuesToTxt(cues), 200, 'text/plain; charset=utf-8');
        if (fmt === 'raw') return text(request, raw, 200, 'text/plain; charset=utf-8');

        return json(request, {
          videoId,
          track: { label: match.label, lang: match.lang, kind: match.kind },
          cues,
          raw,
          srt: cuesToSrt(cues),
          vtt: cuesToVtt(cues),
          txt: cuesToTxt(cues),
        });
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
