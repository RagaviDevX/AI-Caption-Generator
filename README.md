<div align="center">

# ✨ CaptionAI

### Generate Viral Social Media Captions with AI

**Platform-optimized captions for Instagram, YouTube, LinkedIn & viral hashtags — in seconds.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/caption-ai)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Groq](https://img.shields.io/badge/Groq-AI-orange)](https://groq.com)

</div>

---

## 🚀 Features

- **⚡ Lightning Fast** — Groq inference in under 3 seconds
- **📸 Multi-Platform** — Instagram, YouTube, LinkedIn, Hashtags
- **🎨 6 Caption Tones** — Viral, Funny, Luxury, Emotional, Professional, Inspirational
- **🖼️ Drag & Drop Upload** — With Cloudinary CDN or local fallback
- **📋 One-Click Copy** — Instant clipboard copy for each platform
- **💾 Download All** — Export all captions as a text file
- **🌙 Dark Mode** — Premium dark-first design
- **📱 Mobile Responsive** — Fully optimized for all devices
- **🔒 Secure** — Server-side API calls, keys never exposed
- **🔔 Toast Notifications** — Realtime feedback with Sonner
- **🎭 Framer Motion** — Smooth, premium animations
- **🏠 Landing Page** — Hero, Features, Pricing, FAQ, CTA, Footer
- **📊 Dashboard** — Usage stats and generation history

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | App Router, SSR, API Routes |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations |
| **Groq SDK** | AI caption generation (Llama 4) |
| **Cloudinary** | Image hosting & CDN |
| **Sonner** | Toast notifications |
| **Lucide React** | Icons |

---

## 📁 Folder Structure

```
caption-ai/
├── app/
│   ├── api/
│   │   ├── generate/route.ts     # AI caption generation
│   │   └── upload/route.ts       # Image upload handler
│   ├── dashboard/page.tsx        # User dashboard
│   ├── generate/
│   │   ├── page.tsx              # Generate page (SSR)
│   │   └── GenerateClient.tsx    # Client component
│   ├── login/page.tsx            # Auth page
│   ├── pricing/page.tsx          # Pricing page
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout + metadata
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive navbar
│   │   └── Footer.tsx            # Footer with links
│   ├── sections/
│   │   ├── HeroSection.tsx       # Landing hero
│   │   ├── FeaturesSection.tsx   # Features grid
│   │   ├── PricingSection.tsx    # Pricing cards
│   │   ├── FAQSection.tsx        # Accordion FAQ
│   │   ├── CTASection.tsx        # Call to action
│   │   ├── ImageUploader.tsx     # Drag & drop upload
│   │   ├── CaptionCard.tsx       # Caption display + copy
│   │   └── ToneSelector.tsx      # Tone picker
│   └── ui/
│       ├── button.tsx            # Button component
│       ├── badge.tsx             # Badge component
│       └── card.tsx              # Card component
├── hooks/
│   └── useCaption.ts             # Caption generation hook
├── lib/
│   ├── groq.ts                   # Groq AI integration
│   ├── cloudinary.ts             # Cloudinary helper
│   └── utils.ts                  # Utility functions
├── types/
│   └── index.ts                  # TypeScript types
├── .env.example                  # Environment template
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/caption-ai.git
cd caption-ai
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional (for cloud image hosting)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=caption_ai

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Getting API Keys

### Groq API Key (Required)

1. Go to [console.groq.com](https://console.groq.com)
2. Create an account and generate an API key
3. Add to `.env.local` as `GROQ_API_KEY`

### Cloudinary (Optional)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload Presets**
3. Create an **unsigned** preset named `caption_ai`
4. Add your Cloud Name to `.env.local`

> **Note:** Without Cloudinary, images are processed as base64 locally. Cloudinary is recommended for production for better performance and storage.

---

## 🚀 Deployment (Vercel)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/caption-ai)

### Manual Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

Add environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 🎨 Customization

### Change Caption Tones

Edit `components/sections/ToneSelector.tsx` to add or modify tone options.

### Update Pricing

Edit `components/sections/PricingSection.tsx` to change plans, prices, and features.

### Modify AI Prompts

Edit `lib/groq.ts` to customize the system prompt and caption generation behavior.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ using **Next.js** + **Groq AI**

[Live Demo](https://captionai.vercel.app) · [Report Bug](https://github.com/yourusername/caption-ai/issues) · [Request Feature](https://github.com/yourusername/caption-ai/issues)

</div>
