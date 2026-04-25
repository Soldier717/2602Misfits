# GNFR 26-02 // 2602 Misfits Class Dashboard

Cloud-backed dashboard for fire academy class GNFR 26-02. Deployed on Vercel with Vercel KV for shared data storage.

## What's in here

```
gnfr2602/
├── api/
│   ├── data.js     ← GET endpoint - serves dashboard data (public)
│   ├── save.js     ← POST endpoint - saves data (admin password required)
│   └── auth.js     ← POST endpoint - verifies admin password
├── public/
│   └── index.html  ← The whole dashboard UI
├── package.json
├── vercel.json
└── README.md
```

## Deploy (one-time setup, ~15 minutes)

### Step 1: Push to GitHub
1. Create a new GitHub repo (private is fine) — name it whatever, e.g. `gnfr2602-dashboard`
2. Upload all these files to the repo (drag-and-drop in GitHub web UI works)

### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Click "Import" next to your new GitHub repo
3. Leave all settings as default — click **Deploy**
4. Wait ~30 seconds. You'll get a URL like `gnfr2602-dashboard.vercel.app`

### Step 3: Add the database
1. In your Vercel project dashboard, click **Storage** tab
2. Click **Create Database** → choose **KV** (Upstash for Redis)
3. Pick a name (e.g. `gnfr2602-kv`), region near you, click Create
4. Click **Connect Project** → select your project → click Connect
5. Vercel automatically adds the connection environment variables

### Step 4: Set the admin password
1. In your Vercel project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** whatever password you want (use something strong)
   - **Environment:** check all three (Production, Preview, Development)
3. Click Save

### Step 5: Redeploy so the password takes effect
1. Go to **Deployments** tab
2. Click the `...` menu on the latest deployment → **Redeploy**

### Step 6: Connect your domain
1. In your Vercel project → **Settings** → **Domains**
2. Add `2602misfits.com` and `www.2602misfits.com`
3. Vercel will show you DNS records to add at your domain registrar (where you bought the domain)
4. Add those records — usually takes 5–30 min to propagate

## Done

- Class goes to `2602misfits.com` to view
- You go to `2602misfits.com`, click **Admin** in bottom-left, enter your password, edit anything
- All your edits save instantly and everyone sees them on next page load

## Future updates

To change the design, code, or behavior — just edit the files and push to GitHub. Vercel auto-deploys on every push.

To change the admin password — update the `ADMIN_PASSWORD` env var in Vercel settings, then redeploy.
