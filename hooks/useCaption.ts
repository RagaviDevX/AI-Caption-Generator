"use client";
import { useState } from "react";
import { CaptionResult, CaptionTone } from "@/types";
import { toast } from "sonner";

export function useCaption() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [captions, setCaptions] = useState<CaptionResult | null>(null);
  const [tone, setTone] = useState<CaptionTone>("viral");

  const uploadImage = async (file: File) => {
    setUploading(true);
    setCaptions(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setImageUrl(data.url);
      setImageFile(file);
      toast.success("Image uploaded!");
      return data.url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
      return null;
    } finally { setUploading(false); }
  };

  const generate = async () => {
    if (!imageUrl) { toast.error("Please upload an image first"); return; }
    setGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, tone }),
      });
      const data = await res.json();
      if (res.status === 401) { toast.error("Please sign in to generate captions"); return; }
      if (res.status === 429) { toast.error(data.error || "Daily limit reached. Upgrade to Pro!"); return; }
      if (!data.success) throw new Error(data.error);
      setCaptions(data.data);
      toast.success("Captions generated! ✨");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation failed");
    } finally { setGenerating(false); }
  };

  const reset = () => { setImageUrl(null); setImageFile(null); setCaptions(null); };

  return { imageUrl, imageFile, uploading, generating, captions, tone, setTone, uploadImage, generate, reset };
}
