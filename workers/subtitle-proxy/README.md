# SilenVault Subtitle Proxy

Tiny Cloudflare Worker that runs YouTube’s ANDROID player API **server-side** so the browser can list caption tracks. Signed timedtext URLs usually allow CORS from `tools.silenvault.com`, so the page can download SRT/VTT/TXT client-side after that.

## Why this exists

Browsers cannot call `https://www.youtube.com/youtubei/v1/player` from a third-party origin (CORS / 403).  
WEB timedtext without a PO token often returns an empty `200`.  
ANDROID player baseUrls work without PO tokens.

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/yt/tracks?v=VIDEO_ID` | List caption tracks (ANDROID) |
| GET | `/fetch?url=` | GET relay for allowed hosts (timedtext, Vimeo, Dailymotion) |
| OPTIONS | `*` | CORS preflight |

## Local (dev)

```bash
node workers/subtitle-proxy/local-server.mjs
# → http://127.0.0.1:8787
```

The tool page probes this address automatically.

## Cloudflare deploy

```bash
cd workers/subtitle-proxy
npx wrangler login
npx wrangler deploy
```

Default worker name: `sv-subtitle-proxy`  
Public URL: `https://sv-subtitle-proxy.<your-subdomain>.workers.dev`

Optional: point a route such as `tools.silenvault.com/api/subtitles/*` at the worker and set:

```js
localStorage.setItem('SV_SUB_PROXY', 'https://tools.silenvault.com/api/subtitles')
```

Or override any base:

```js
localStorage.setItem('SV_SUB_PROXY', 'https://sv-subtitle-proxy.YOUR_ACCOUNT.workers.dev')
```
