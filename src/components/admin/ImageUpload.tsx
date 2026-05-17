"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/app/admin/actions";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.ok) onChange(res.url);
    else setError(res.error);
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-ivory/10">
          <Image
            src={value}
            alt=""
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handle}
        disabled={busy}
        className="text-xs text-ivory/60"
      />
      {busy && <p className="text-xs text-ivory/40">Uploading…</p>}
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}
