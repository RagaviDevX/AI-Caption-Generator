import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import GenerateClient from "./GenerateClient";

export const metadata: Metadata = {
  title: "Generate AI Captions",
  description: "Upload your image and generate viral captions for Instagram, YouTube, LinkedIn and hashtags instantly.",
};

export default function GeneratePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)" }}>
      <Navbar />
      <GenerateClient />
    </div>
  );
}
