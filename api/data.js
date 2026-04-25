// GET /api/data
// Returns the current dashboard data. Public endpoint.

import { kv } from '@vercel/kv';

const STORAGE_KEY = 'gnfr2602:data';

const DEFAULT_DATA = {
  weeks: {
    1: { title: 'Orientation & Foundations', schedule: [], videos: [] },
    2: { title: 'PPE & SCBA', schedule: [], videos: [] },
    3: { title: 'Hose Operations', schedule: [], videos: [] },
    4: { title: 'Ladders & Forcible Entry', schedule: [], videos: [] },
    5: { title: 'Search & Rescue', schedule: [], videos: [] },
    6: { title: 'Live Fire Evolutions', schedule: [], videos: [] },
    7: { title: 'Final Skills & Graduation', schedule: [], videos: [] }
  },
  docs: []
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await kv.get(STORAGE_KEY);
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(data || DEFAULT_DATA);
  } catch (err) {
    console.error('KV read error:', err);
    return res.status(500).json({ error: 'Failed to load data' });
  }
}
