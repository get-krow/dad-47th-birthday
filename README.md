# 🎂 Happy 47th Birthday, Daddy! ❤️

A personal, interactive digital birthday card website built with React, Vite, and custom CSS. It celebrates 47 years of memories, morning school drives, Star Wars, hockey, life advice, and family inside jokes.

Production URL target: **`https://youareonly47yearsoldhaha.vercel.app`**

---

## ✨ Features

- 🎁 **Interactive Opening Card**: 3D card unwrap experience with celebratory melodic chimes, party pop sound effects, and canvas confetti bursts.
- 💫 **Us & Our Dynamic**: Celebrating differences in personality, taste, and the mutual respect and bond shared.
- 🚗 **7 Years on the Road**: A dedicated milestone honoring seven consecutive years of early morning school drop-offs since middle school.
- 🧭 **Preparing Me For The World**: Heartfelt tribute to how he prepared you for life rather than just sheltering you.
- 🏆 **Things Daddy Likes**: 6 interactive cards with tap-to-reveal secret ratings (Star Wars, Hockey, Fish, Motorcycles, Tech/Gadgets, and "Studying").
- 📊 **Funny Dad Stats**: Animated progress meters with an infinite `+1 Dad Joke` counter.
- 📸 **Photo Highlights**: Touch-swipe photo slideshow with captions, next/previous buttons, dot indicators, and full-screen lightbox zoom.
- 🎮 **Daddy's Mini-Games**:
  - **Star Wars Alignment**: Toggle between Light Side and Dad Side with dynamic saber glow, sound effects, and funny quotes.
  - **Hockey Overtime Slap-Shot**: Tap to shoot the puck into top shelf for an arena goal horn, siren, and celebration confetti.
- 💖 **Closing Finale**: Heartfelt closing note with an interactive "Send Birthday Love" counter.
- ✏️ **Visual Content Editor (`/edit`)**:
  - Live in-browser visual editing for all text, titles, stories, jokes, stats, and photos.
  - Reorder, upload, or replace photos with instant preview.
  - **1-Click Save Changes** with `✓ Saved!` confirmation.
  - **Export JSON & Restore JSON** backup tools.
  - Vercel SPA routing configured so refreshing `/edit` never gives a 404!

---

## 🚀 Step 1: Run Locally

```bash
# 1. Open the project folder
cd dad-47th-birthday

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev
```

Open your browser to [http://localhost:3000](http://localhost:3000).
- Visit `http://localhost:3000` to view the card.
- Visit `http://localhost:3000/edit` to customize content.

---

## 🐙 Step 2: Push to GitHub (Step-by-Step)

We have already initialized your local Git repository with the complete code and initial commit! Here is how to connect it to your GitHub account:

1. Go to [https://github.com/new](https://github.com/new).
2. Name your repository: `dad-47th-birthday` (or any name you prefer).
3. Leave **"Initialize this repository with a README" unchecked** (we already have one).
4. Click **Create repository**.
5. Copy the commands shown under **"…or push an existing repository from the command line"** and run them in your terminal:

```bash
# Replace YOUR_GITHUB_USERNAME with your GitHub username:
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/dad-47th-birthday.git
git branch -M main
git push -u origin main
```

### ⚡ Easy 1-Command Push Whenever You Make Changes!
To push future updates automatically without typing manual git commands, just run:

```bash
npm run push
```
This automatically runs:
`git add -A && git commit -m "Update birthday card" && git push`

---

## ▲ Step 3: Deploy on Vercel (`youareonly47yearsoldhaha.vercel.app`)

1. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** ➔ **"Project"**.
3. In the list of GitHub repositories, find **`dad-47th-birthday`** and click **Import**.
4. **Configure Project**:
   - **Project Name**: Enter `youareonly47yearsoldhaha` (this will automatically give you the domain `youareonly47yearsoldhaha.vercel.app` if available!).
   - **Framework Preset**: Vite (automatically detected).
   - **Root Directory**: `./` (default).
5. Click **Deploy**!
6. In ~30 seconds, your site will be live!

### Custom Domain / Subdomain check:
If you want to ensure the exact URL is `youareonly47yearsoldhaha.vercel.app`:
1. In your Vercel Dashboard, go to your project ➔ **Settings** ➔ **Domains**.
2. If it is not already `youareonly47yearsoldhaha.vercel.app`, type `youareonly47yearsoldhaha.vercel.app` into the domain field and click **Add**.

---

## 💾 Cloud Persistence (Optional for Multi-Device Sync)

The website works **100% out of the box** using your browser's local storage and offers a 1-click **Backup (Export JSON)** and **Restore (Import JSON)** button in `/edit`.

If you want changes made in `/edit` on your computer to automatically sync in the cloud so Dad sees them on his phone:

### Option A: Upstash Redis REST (Easiest & Free)
1. Create a free account at [https://upstash.com](https://upstash.com).
2. Click **Create Database** (Redis, free tier).
3. Scroll down to the **REST API** section on your Upstash dashboard.
4. Copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
5. In your Vercel Project Dashboard:
   - Go to **Settings** ➔ **Environment Variables**.
   - Add:
     - Key: `VITE_UPSTASH_REDIS_REST_URL`, Value: your url
     - Key: `VITE_UPSTASH_REDIS_REST_TOKEN`, Value: your token
6. Trigger a redeploy (or run `npm run push`). Now your card synchronizes across all devices globally!

---

## 🛠️ Tech Stack
- **Frontend**: React 18 + Vite
- **Icons**: Lucide React
- **Confetti**: Canvas-Confetti
- **Sound**: Pure Web Audio API synthesizers (zero broken MP3 links or CDN dependencies)
- **Routing**: Client-side SPA routing with `vercel.json` rewrite rules
