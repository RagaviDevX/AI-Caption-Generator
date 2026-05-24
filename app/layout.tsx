import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: { default: "CaptionAI — Generate Viral Social Media Captions", template: "%s | CaptionAI" },
  description: "Generate AI captions for Instagram, YouTube, LinkedIn and viral hashtags in seconds. Powered by Groq AI.",
  keywords: ["AI caption generator", "Instagram captions", "YouTube captions", "LinkedIn captions", "viral hashtags"],
  openGraph: {
    type: "website",
    url: "https://captionai.vercel.app",
    title: "CaptionAI — Generate Viral Social Media Captions",
    description: "Generate AI-powered captions for every social platform in seconds.",
    siteName: "CaptionAI",
  },
  twitter: { card: "summary_large_image", title: "CaptionAI", description: "Generate viral captions with AI." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#000", color: "#fff" }}>
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(12px)" },
          }}
          theme="dark"
          richColors
        />
      </body>
    </html>
  );
}
