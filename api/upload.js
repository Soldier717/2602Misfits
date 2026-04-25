// POST /api/upload
// Uploads an image to Vercel Blob. Requires admin password.

import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const provided = req.headers['x-admin-password'];
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const filename = req.headers['x-filename'] || `image-${Date.now()}.jpg`;
  const contentType = req.headers['content-type'] || 'image/jpeg';

  try {
    const blob = await put(`gnfr2602/${filename}`, req, {
      access: 'public',
      contentType,
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Upload failed: ' + err.message });
  }
}
