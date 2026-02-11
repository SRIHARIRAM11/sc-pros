
# 🚀 Deployment Guide for SC-PRO

This project consists of two parts:
1. **Frontend**: React (Vite)
2. **Backend**: Node.js (Express + SQLite)

To make this website live, you need to host both parts. Since we are using an SQLite database (a file), it's easiest to host the backend on a service that supports persistent disks or use a simple VPS.

For free/easy hosting, we recommend:
*   **Frontend**: Vercel
*   **Backend**: Render (Web Service)

---

## Step 1: Upload to GitHub

1.  Create a new Repository on [GitHub](https://github.com/new). Name it `sc-pro-live`.
2.  Run the following commands in your terminal (inside `SC - PRO` folder):

```bash
git remote add origin https://github.com/YOUR_USERNAME/sc-pro-live.git
git branch -M main
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username)*

---

## Step 2: Deploy Backend (Render)

1.  Go to [Render.com](https://render.com) and Sign Up/Log In.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository `sc-pro-live`.
4.  **Configuration**:
    *   **Name**: `sc-pro-api`
    *   **Root Directory**: `server`  *(Important!)*
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Disk (Important for Database)**:
    *   Since we use SQLite (`database.db`), if the server restarts, data might be lost on the free tier without a persistent disk.
    *   For a true demo, you can skip adding a disk (data resets on deploy), or pay for a Starter plan to add a Disk mounted at `/opt/render/project/src/server`.
6.  Click **Create Web Service**.
7.  Copy the **URL** provided by Render (e.g., `https://sc-pro-api.onrender.com`).

---

## Step 3: Deploy Frontend (Vercel)

1.  Go to [Vercel.com](https://vercel.com) and Sign Up/Log In.
2.  Click **Add New...** -> **Project**.
3.  Import `sc-pro-live` from GitHub.
4.  **Environment Variables**:
    *   Click on **Environment Variables**.
    *   Add Name: `VITE_API_URL`
    *   Add Value: `https://sc-pro-api.onrender.com/api`  *(Use the URL from Step 2 + /api)*
5.  Click **Deploy**.

---

## Step 4: Final Check

1.  Open your Vercel URL.
2.  Try logging in with:
    *   **Student**: `srihariram@sc.edu` / `password`
    *   **Teacher**: `alice@sc.edu` / `password`
    *   **Admin**: `admin@sc.edu` / `admin`

**Note**: If the backend on Render "spins down" (sleeps) on the free tier, the first request might take 30-60 seconds to wake it up.
