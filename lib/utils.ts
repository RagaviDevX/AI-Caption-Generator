import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export const PLATFORM_CONFIG = {
  instagram: {
    label: "Instagram",
    icon: "📸",
    color: "from-pink-500 to-rose-500",
    bg: "bg-gradient-to-r from-pink-500/10 to-rose-500/10",
    border: "border-pink-500/20",
    maxChars: 2200,
  },
  youtube: {
    label: "YouTube",
    icon: "🎬",
    color: "from-red-500 to-orange-500",
    bg: "bg-gradient-to-r from-red-500/10 to-orange-500/10",
    border: "border-red-500/20",
    maxChars: 5000,
  },
  linkedin: {
    label: "LinkedIn",
    icon: "💼",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
    maxChars: 3000,
  },
  hashtags: {
    label: "Viral Hashtags",
    icon: "#️⃣",
    color: "from-violet-500 to-purple-500",
    bg: "bg-gradient-to-r from-violet-500/10 to-purple-500/10",
    border: "border-violet-500/20",
    maxChars: 2200,
  },
};
