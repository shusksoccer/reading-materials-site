import Link from "next/link";
import { listMaterials } from "@/lib/content";

export default function MaterialsPage() {
  const materials = listMaterials();

  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700 }}>教材一覧</h1>

      {materials.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>
          contentフォルダにMarkdownがありません（web/content/*.md）。
        </p>
      ) : (
        <ul style={{ marginTop: "1rem", lineHeight: 1.9 }}>
          {materials.map((m) => (
            <li key={m.slug}>
              <Link href={`/materials/${m.slug}`}>{m.title}</Link>{" "}
              <span style={{ opacity: 0.6 }}>({m.slug})</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
