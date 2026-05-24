"use client";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatBytes } from "@/lib/utils";
import { toast } from "sonner";

interface Props { onUpload: (f: File) => Promise<string | null>; imageUrl: string | null; imageFile: File | null; uploading: boolean; onReset: () => void; }

export default function ImageUploader({ onUpload, imageUrl, imageFile, uploading, onReset }: Props) {
  const [drag, setDrag] = useState(false);

  const handle = useCallback(async (file: File) => {
    if (!["image/jpeg","image/png","image/webp","image/gif"].includes(file.type)) { toast.error("Please use JPEG, PNG, WebP or GIF"); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error("File too large — max 10 MB"); return; }
    await onUpload(file);
  }, [onUpload]);

  return (
    <AnimatePresence mode="wait">
      {!imageUrl ? (
        <motion.label key="drop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onDragEnter={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 210, borderRadius: 18, border: `2px dashed ${drag ? "rgba(99,102,241,0.7)" : "rgba(255,255,255,0.14)"}`, background: drag ? "rgba(99,102,241,0.07)" : "rgba(255,255,255,0.018)", cursor: "pointer", transition: "all 0.2s", transform: drag ? "scale(1.015)" : "scale(1)", padding: 28, gap: 16, textAlign: "center" }}>
          <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) handle(f); }} style={{ display: "none" }} disabled={uploading} />
          <div style={{ width: 64, height: 64, borderRadius: 18, background: drag ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${drag ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, transition: "all 0.2s", transform: drag ? "scale(1.1)" : "scale(1)" }}>
            {uploading ? <span style={{ width: 26, height: 26, border: "2px solid rgba(99,102,241,0.4)", borderTopColor: "#818cf8", borderRadius: "50%", display: "inline-block" }} className="spin" /> : drag ? "🎯" : "📤"}
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: uploading ? "#818cf8" : "rgba(255,255,255,0.72)", marginBottom: 6 }}>
              {uploading ? "Uploading…" : drag ? "Drop it here!" : "Drop your image here"}
            </p>
            <p style={{ fontSize: 12, color: "var(--c-dim)" }}>JPEG · PNG · WebP · GIF · Max 10 MB</p>
          </div>
          {!uploading && (
            <div style={{ padding: "9px 22px", borderRadius: 11, background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.28)", fontSize: 13, color: "#a5b4fc", fontWeight: 600 }}>
              🖼 Choose Image
            </div>
          )}
        </motion.label>
      ) : (
        <motion.div key="preview" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: "1px solid var(--c-border)", background: "#000" }}>
          <img src={imageUrl} alt="Uploaded" style={{ width: "100%", maxHeight: 320, objectFit: "contain", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 55%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {imageFile?.name || "Uploaded"} {imageFile && <span style={{ color: "var(--c-dim)" }}>({formatBytes(imageFile.size)})</span>}
              </span>
            </div>
            <button onClick={onReset} style={{ padding: "6px 14px", borderRadius: 9, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.78)", fontSize: 12, cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>
              ✕ Remove
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
