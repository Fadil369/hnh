# ⚡ 5-Minute Deployment to Cloudflare Pages

## Your Deployment Command Checklist

### ✅ Step 1: Prepare Your GitHub Repository (2 min)

```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Opal Clinical Engine - Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/opal-clinical-engine.git
git push -u origin main
```

**Expected Output:**
```
Counting objects: XX
Compressing objects: 100%
Writing objects: 100%
To https://github.com/YOUR_USERNAME/opal-clinical-engine.git
 * [new branch]      main -> main
```

---

### ✅ Step 2: Get Your API Key (1 min)

**Get Anthropic API Key:**
1. Go to https://console.anthropic.com/keys
2. Click "Create Key"
3. Copy the key (looks like: `sk_live_xxx`)
4. **Save this temporarily** - you'll need it in Step 4

---

### ✅ Step 3: Connect Cloudflare Pages (1 min)

1. **Go to:** https://dash.cloudflare.com → **Pages**
2. **Click:** "Create a project"
3. **Select:** "Connect to Git"
4. **Authorize:** GitHub (if first time)
5. **Select:** `opal-clinical-engine` repository
6. **Click:** "Begin Setup"

---

### ✅ Step 4: Configure Build Settings (1 min)

**Fill in these exact values:**

| Field | Value |
|-------|-------|
| **Production branch** | `main` |
| **Build command** | `npm install && npm run build` |
| **Build output directory** | `dist` |
| **Node version** | `18.x` |

**Then scroll down and add Environment Variables:**

| Name | Value |
|------|-------|
| **ANTHROPIC_API_KEY** | *Paste your key from Step 2* |

---

### ✅ Step 5: Deploy! (automated)

**Click:** "Save and Deploy"

Cloudflare will:
1. ✅ Clone your repo
2. ✅ Install dependencies
3. ✅ Build the project
4. ✅ Deploy to production

**Expected Deployment Time:** 2-3 minutes

---

## 🎉 Your App is Live!

After deployment completes:

**Your app will be accessible at:**
```
https://opal-clinical-engine.pages.dev
```

**Or use a custom domain:**
1. Go to Pages project → Settings → Domains
2. Add your custom domain
3. Update DNS records (Cloudflare will guide you)

---

## 📝 Verify Deployment

### Check these to confirm everything works:

1. **Open the app:**
   ```
   https://opal-clinical-engine.pages.dev
   ```

2. **Test quiz generation:**
   - Select specialties
   - Click "Generate Quizzes"
   - You should see generated content in 30-60 seconds

3. **Test export:**
   - Click "Output" tab
   - Click "Export CSV"
   - File downloads as `opal_quizzes_YYYY-MM-DD.csv`

4. **Check audit logs:**
   - Click "Audit" tab
   - You should see action history

---

## 🔄 Future Deployments (Super Easy!)

After the first deployment, **future updates are automatic:**

```bash
# Just push to main branch
git add .
git commit -m "Update: New feature or fix"
git push origin main
```

**Cloudflare automatically:**
1. Detects the push
2. Builds the new code
3. Deploys to production
4. **No downtime!**

---

## 🆘 Troubleshooting

### ❌ Build Fails With "ANTHROPIC_API_KEY Not Found"

**Fix:** In Cloudflare Pages → Settings → Environment variables
- Confirm `ANTHROPIC_API_KEY` is set to production
- Regenerate the deployment

### ❌ App Shows Blank Page

**Fix:**
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check if API key is valid
4. Try hard refresh (Ctrl+Shift+R)

### ❌ Styling Looks Wrong

**Fix:**
1. Clear browser cache
2. Try different browser
3. Hard refresh (Ctrl+Shift+R)

### ❌ CSV Export Not Working

**Fix:** Try JSON export instead, or check browser console for errors

---

## 📊 Monitor Your Deployment

In Cloudflare Pages:

1. **See build logs:** Pages → opal-clinical-engine → Deployments
2. **Monitor performance:** Analytics tab
3. **Check uptime:** Status tab
4. **View error rates:** Real-time analytics

---

## 🚀 What's Next?

After successful deployment:

### 1. **Customize the Domain**
   ```
   opal.brainsait.org → Points to Cloudflare Pages
   ```

### 2. **Add to Your Portfolio**
   - Show in your GitHub
   - Add to your resume
   - Share with healthcare teams

### 3. **Integrate with n8n Workflows**
   - n8n → Webhook → Opal → Export → Canva

### 4. **Monitor & Optimize**
   - Track usage in Cloudflare Analytics
   - Monitor API costs (Anthropic console)
   - Optimize quiz generation for speed

---

## 📱 Mobile Support

The app is fully responsive! Test on:
- iPhone/iPad (Safari)
- Android (Chrome)
- Desktop (All browsers)

---

## 🔐 Security Checklist

- ✅ HTTPS enabled (automatic)
- ✅ API key secured in environment (not in code)
- ✅ HIPAA audit logging active
- ✅ Role-based access working
- ✅ No PHI stored client-side

---

## ✨ You're All Set!

Your Opal Clinical Engine is now:
- 🌍 **Live on the internet**
- ⚡ **Fast** (Cloudflare CDN)
- 🔒 **Secure** (TLS + environment vars)
- 📈 **Scalable** (auto-handles traffic)
- 🔄 **Auto-updating** (via GitHub pushes)

---

**Questions?** Check the full [README.md](./README.md) or reach out to the team.

**Built for BRAINSAIT LTD** 🏥
