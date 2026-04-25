// POST /api/auth
// Verifies the admin password. Used during login flow.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const provided = req.headers['x-admin-password'];
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not configured on server' });
  }
  if (provided !== expected) {
    return res.status(401).json({ ok: false });
  }

  return res.status(200).json({ ok: true });
}
