// POST /api/save
// Saves dashboard data. Requires admin password in x-admin-password header.

import { kv } from '@vercel/kv';

const STORAGE_KEY = 'gnfr2602:data';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check password
  const provided = req.headers['x-admin-password'];
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not configured on server' });
  }
  if (provided !== expected) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Validate body
  const data = req.body;
  if (!data || typeof data !== 'object' || !data.weeks) {
    return res.status(400).json({ error: 'Invalid data shape' });
  }

  try {
    await kv.set(STORAGE_KEY, data);
    return res.status(200).json({ ok: true, savedAt: new Date().toISOString() });
  } catch (err) {
    console.error('KV write error:', err);
    return res.status(500).json({ error: 'Failed to save data' });
  }
}
