/**
 * Local subtitle proxy (same contract as Cloudflare Worker).
 * Run: node workers/subtitle-proxy/local-server.mjs
 * Listens on http://127.0.0.1:8787
 */
import http from 'node:http';
import worker from './worker.js';

const PORT = Number(process.env.PORT || 8787);

const server = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host || `127.0.0.1:${PORT}`;
    const url = `http://${host}${req.url}`;
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (v == null) continue;
      headers.set(k, Array.isArray(v) ? v.join(',') : String(v));
    }
    if (!headers.has('Origin')) headers.set('Origin', 'http://127.0.0.1:5500');

    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      body = Buffer.concat(chunks);
    }

    const request = new Request(url, { method: req.method, headers, body });
    const response = await worker.fetch(request);
    const outHeaders = {};
    response.headers.forEach((v, k) => { outHeaders[k] = v; });
    res.writeHead(response.status, outHeaders);
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (e) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify({ error: e.message || String(e) }));
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`SilenVault subtitle proxy on http://127.0.0.1:${PORT}`);
  console.log(`Health  http://127.0.0.1:${PORT}/health`);
  console.log(`Tracks  http://127.0.0.1:${PORT}/yt/tracks?v=dQw4w9WgXcQ`);
});
