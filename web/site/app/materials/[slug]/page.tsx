"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MaterialPage() {
  const params = useParams();
  const slug = (params?.slug ?? "") as string;

  const [title, setTitle] = useState<string>("");
  const [contentHtml, setContentHtml] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!slug) return;

    (async () => {
      setError("");
      const res = await fetch(`/api/materials/${slug}`);
      if (!res.ok) {
        setError(`教材が見つかりません: ${slug}`);
        return;
      }
      const json = await res.json();
      setTitle(json.title ?? slug);
      setContentHtml(json.contentHtml ?? "");
    })();
  }, [slug]);

  if (!slug) {
    return (
      <main style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
        <p>slug が取得できません。</p>
        <p>
          <Link href="/materials">← 一覧へ</Link>
        </p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <p style={{ marginBottom: "1rem" }}>
        <Link href="/materials">← 一覧へ</Link>
      </p>

      <h1 style={{ fontSize: "1.8rem", fontWeight: 700 }}>{title || slug}</h1>

      {error ? (
        <p style={{ marginTop: "1rem" }}>{error}</p>
      ) : (
        <article
          style={{ marginTop: "1.2rem", lineHeight: 1.9 }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}
    </main>
  );
}
