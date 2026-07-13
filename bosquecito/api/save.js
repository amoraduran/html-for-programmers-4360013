// Bosquecito — optional cloud save (Vercel serverless function).
//
// Lets a player back their progress to the cloud under a short code
// (BOSQUE-XXXXX) and pull it on another device. It stores the *same* opaque
// BQ1- blob the in-game "Respaldo" panel produces — no accounts, no personal
// data, just a code -> blob.
//
// SETUP (once):
//   1. Deploy this repo's `bosquecito/` folder to Vercel (not just the HTML).
//   2. Vercel dashboard -> Storage -> create a KV database (Upstash Redis, free
//      tier). It injects KV_REST_API_URL / KV_REST_API_TOKEN env vars.
//   3. Dependency @vercel/kv is declared in package.json (Vercel installs it).
//   4. In bosquecito.html turn it on:  window.BOSQUECITO_SYNC_URL = '/api/save';
//   Then the "Nube" section appears in the Respaldo panel.
//
// Endpoints:
//   GET  /api/save?code=BOSQUE-XXXXX   -> { data: "<BQ1-...>" | null }
//   POST /api/save  { code, data }     -> { ok: true }

const { kv } = require('@vercel/kv');

const CODE_RE = /^BOSQUE-[A-Z0-9]{4,8}$/;
const MAX_BLOB = 200000; // ~200 KB, plenty for six characters

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const code = String(req.query.code || '').trim().toUpperCase();
      if (!CODE_RE.test(code)) return res.status(400).json({ error: 'bad code' });
      const data = await kv.get('save:' + code);
      return res.status(200).json({ data: data || null });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const code = String(body.code || '').trim().toUpperCase();
      const data = String(body.data || '');
      if (!CODE_RE.test(code)) return res.status(400).json({ error: 'bad code' });
      if (!data.startsWith('BQ1-') || data.length > MAX_BLOB) return res.status(400).json({ error: 'bad data' });
      // keep saves for a year of inactivity, refreshed on every push
      await kv.set('save:' + code, data, { ex: 60 * 60 * 24 * 365 });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'method' });
  } catch (e) {
    return res.status(500).json({ error: 'server' });
  }
};
