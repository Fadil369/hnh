# 🔬 Opal Clinical Engine - Complete Deployment Guide

**Version:** 1.0.0  
**Built for:** BRAINSAIT LTD  
**Status:** Production-Ready

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Deployment to Cloudflare Pages](#deployment-to-cloudflare-pages)
4. [Configuration](#configuration)
5. [Features](#features)
6. [Usage Guide](#usage-guide)
7. [API Integration](#api-integration)
8. [Security & Compliance](#security--compliance)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Cloudflare account with Pages enabled
- Anthropic API key (Claude API access)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Fadil369/opal-clinical-engine.git
cd opal-clinical-engine

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# The app will open at http://localhost:3000
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Test production build locally
npm run preview
```

---

## 🏗️ Architecture Overview

### Component Structure

```
opal-clinical-engine/
├── src/
│   ├── App.jsx                 # Main application
│   ├── components/
│   │   ├── QuizGenerator.jsx   # Configuration & generation
│   │   ├── OutputDisplay.jsx   # Quiz preview & display
│   │   ├── BulkDownload.jsx    # Export functionality
│   │   ├── VoiceOverScript.jsx # Audio script generation
│   │   └── AuditLog.jsx        # HIPAA compliance logs
│   ├── styles/
│   │   ├── global.css          # BrainSAIT branding
│   │   ├── generator.css
│   │   ├── output.css
│   │   ├── download.css
│   │   ├── voiceover.css
│   │   └── audit.css
│   └── main.jsx                # React entry point
├── index.html                  # HTML entry
├── package.json                # Dependencies
├── vite.config.js             # Vite configuration
├── wrangler.toml              # Cloudflare Pages config
└── .github/
    └── workflows/
        └── deploy.yml         # CI/CD automation
```

### Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** CSS3 with BrainSAIT design system
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **API:** Anthropic Claude API (via artifacts)
- **Deployment:** Cloudflare Pages + GitHub Actions
- **Compliance:** HIPAA audit logging, role-based access

---

## ☁️ Deployment to Cloudflare Pages

### Method 1: GitHub Integration (Recommended)

**Step 1: Prepare GitHub Repository**

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial Opal Clinical Engine commit"
git branch -M main
git remote add origin https://github.com/Fadil369/opal-clinical-engine.git
git push -u origin main
```

**Step 2: Connect Cloudflare Pages**

1. Go to **Cloudflare Dashboard** → **Pages**
2. Click **Create a project** → **Connect to Git**
3. Select your GitHub repository (`opal-clinical-engine`)
4. Configure build settings:
   - **Production branch:** `main`
   - **Build command:** `npm install && npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18.x (or higher)

**Step 3: Set Environment Variables**

In Cloudflare Pages project settings:

1. Go to **Settings** → **Environment variables**
2. Add production environment variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your Claude API key (from Anthropic console)

**Step 4: Deploy**

Push to main branch:
```bash
git push origin main
```

GitHub Actions will automatically:
- Build the project
- Run linting
- Deploy to Cloudflare Pages

**Your app will be live at:** `https://opal-clinical-engine.pages.dev`

---

### Method 2: Direct Cloudflare CLI Deployment

```bash
# 1. Install Wrangler
npm install -g @cloudflare/wrangler

# 2. Authenticate
wrangler login

# 3. Build the project
npm run build

# 4. Deploy directly
npm run deploy
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Anthropic API Key (required)
VITE_ANTHROPIC_API_KEY=sk_live_your_key_here

# Optional: Analytics
VITE_GA_ID=G-XXXXXXXXXX

# Optional: Feature flags
VITE_ENABLE_ADVANCED_EXPORT=true
VITE_MAX_QUIZZES_PER_BATCH=50
```

### Cloudflare Pages Configuration

The `wrangler.toml` file controls:
- Build settings
- Security headers
- Cache rules
- Redirects

**Key configurations:**
- Cache HTML: 0 seconds (always fresh)
- Cache JS/CSS: 1 year (immutable)
- CORS headers configured
- Frame options: SAMEORIGIN
- Content type protection enabled

---

## ✨ Features

### 1. Quiz Generation
- ✅ Bulk generation (1-50 quizzes)
- ✅ Rotating medical specialties
- ✅ Mixed difficulty levels
- ✅ Bilingual (English/Arabic)
- ✅ HIPAA/MOH compliance

### 2. Content Formats
- ✅ **CSV Export** - Canva bulk import ready
- ✅ **JSON Export** - API/webhook integration
- ✅ **Voiceover Scripts** - ElevenLabs, Canva, Adobe compatible
- ✅ **Visual Prompts** - Canva design suggestions

### 3. Voiceover Generation
- ✅ ElevenLabs integration guide
- ✅ Canva Studio script format
- ✅ Adobe Podcast compatible
- ✅ Bilingual voiceover support

### 4. Compliance & Security
- ✅ HIPAA audit logging
- ✅ Role-based access control
- ✅ Activity tracking
- ✅ No PHI stored client-side

---

## 📖 Usage Guide

### Step 1: Generate Quizzes

1. **Select Specialties:** Check multiple medical specialties
   - Cardiology, Radiology, Emergency Medicine, etc.
   - AI in Health / NPHIES
   - MOH Digital Transformation

2. **Configure Generation:**
   - Set number of quizzes (1-50)
   - Choose difficulty level (Beginner/Intermediate/Expert/Mixed)
   - Select content tone (Professional/Conversational/Challenging)

3. **Click "Generate Quizzes"**
   - Claude API processes the request
   - Results appear in the Output tab

### Step 2: Review & Customize

In the **Output** tab:
- Expand each quiz card to view full details
- Check bilingual content quality
- Review clinical pearls for accuracy
- Copy individual quizzes as needed

### Step 3: Export for Canva

**Option A: CSV for Bulk Import**
1. Click **Export CSV**
2. Open Canva → Create new design
3. Use "Bulk Create" feature
4. Upload CSV file
5. Auto-generate videos from template

**Option B: JSON for Custom Pipeline**
1. Click **Export JSON**
2. Integrate with your n8n workflow
3. Process through NPHIES/FHIR pipeline
4. Publish to multiple platforms

### Step 4: Generate Voiceover Scripts

In the **Voiceover** tab:
1. Select a quiz from the dropdown
2. Choose voice provider:
   - **ElevenLabs** (highest quality)
   - **Canva Studio** (integrated)
   - **Adobe Podcast** (full-featured)
3. Copy the formatted script
4. Paste into the selected platform

---

## 🔌 API Integration

### Calling Claude from the App

The app automatically calls the Anthropic API via the `buildOpalPrompt()` function:

```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: buildOpalPrompt(config),
    }],
  }),
});
```

### Webhook Integration Example

To integrate with n8n:

```javascript
// Send generated quizzes to n8n webhook
async function publishToN8n(quizzes) {
  await fetch('https://n8n-t992.srv791040.hstgr.cloud/webhook/opal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'generate_canva_videos',
      quizzes: quizzes,
      timestamp: new Date().toISOString(),
    }),
  });
}
```

---

## 🔒 Security & Compliance

### HIPAA Compliance

✅ **Implemented:**
- Audit logging of all user actions
- User role tracking (Creator/Reviewer/Admin)
- No PHI storage on client device
- Secure API communication via HTTPS
- Activity timestamps for accountability

✅ **Best Practices:**
- Use in clinical workflows only with proper training
- Review generated content for medical accuracy
- Maintain audit logs for compliance audits
- Restrict access by role

### Privacy

- **No data persistence:** Quizzes stored in-memory only
- **No cookies:** Pure session-based operation
- **No external tracking:** Only Cloudflare analytics (optional)
- **GDPR compliant:** No user personal data collected

### Security Headers

Automatically configured in Cloudflare:
```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 🆘 Troubleshooting

### Issue: "API Key Not Found"
**Solution:** Ensure `ANTHROPIC_API_KEY` is set in Cloudflare Pages environment variables.

### Issue: Quiz Generation Fails
**Solution:** Check Claude API quota and rate limits. Reduce batch size to 5-10 quizzes.

### Issue: Styling Looks Broken
**Solution:** Clear browser cache (Ctrl+Shift+Delete) and refresh. CSS variables require modern browsers.

### Issue: CSV Export Has Encoding Issues
**Solution:** Export as JSON instead, then use Excel's "From JSON" import feature.

---

## 📚 Further Resources

- **Anthropic API Docs:** https://docs.anthropic.com
- **Cloudflare Pages:** https://pages.cloudflare.com
- **Vite Documentation:** https://vitejs.dev
- **React Documentation:** https://react.dev
- **BrainSAIT Docs:** https://docs.brainsait.org

---

## 📞 Support

For questions or issues:
1. Check this README
2. Review component JSDoc comments
3. Check Cloudflare Pages deployment logs
4. Open GitHub issues

---

**Built with ❤️ for BRAINSAIT LTD**  
**Healthcare AI × Content Automation × Vision 2030**
