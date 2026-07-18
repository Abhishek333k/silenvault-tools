# SilenVault Subtitle Proxy (site infrastructure)

**Not a user-facing step.** End users never log in, never grant permissions, and never configure this.

This is optional **site-owner** infrastructure so YouTube caption downloads stay reliable after Google’s PO-token changes. When mounted at the same origin, the tool page discovers it silently via `/api/subtitles/health` — visitors only see normal same-site requests.

## Why this exists

- Browsers cannot call `youtubei/v1/player` from a third-party origin (CORS).
- WEB timedtext often returns empty `200` without a PO token.
- ANDROID player baseUrls still work without PO tokens when requested server-side.

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/yt/tracks?v=VIDEO_ID` | List caption tracks (ANDROID) |
| GET | `/fetch?url=` | GET relay for allowed hosts |
| OPTIONS | `*` | CORS preflight |

## Recommended production mount (invisible to users)

Deploy this worker and attach a route:

```text
tools.silenvault.com/api/subtitles/*
```

The tool already probes **`${location.origin}/api/subtitles`** only. No `localStorage`, no third-party worker hostnames, no localhost on production.

```bash
cd workers/subtitle-proxy
npx wrangler login    # site owner, once
npx wrangler deploy
# then add CF route → /api/subtitles/*
```

## Local development only

```bash
node workers/subtitle-proxy/local-server.mjs
# → http://127.0.0.1:8787
```

The page only probes localhost when `location.hostname` is `localhost` / `127.0.0.1`.
