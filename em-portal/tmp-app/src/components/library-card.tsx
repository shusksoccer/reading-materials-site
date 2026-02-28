import Link from "next/link";
import { MarkdownBody } from "@/components/markdown-body";
import { SourceLinks } from "@/components/source-links";
import type { ContentDoc } from "@/lib/content";

export function LibraryCard({ doc }: { doc: ContentDoc }) {
  const difficulty = "difficulty" in doc ? String(doc.difficulty) : null;
  const year = "year" in doc ? String(doc.year) : null;
  const author = "author" in doc ? String(doc.author) : null;
  const useCase = "use_case" in doc ? String(doc.use_case) : null;
  const url = "url" in doc ? String(doc.url ?? "") : "";
  const validUrl = url.startsWith("http://") || url.startsWith("https://");

  return (
    <article className="card card-kind-library">
      <div className="library-head">
        <div>
          <h2 style={{ marginBottom: "0.2rem" }}>{doc.title}</h2>
          {author && year ? (
            <p className="meta" style={{ margin: 0 }}>{author}（{year}）</p>
          ) : null}
        </div>
        {difficulty ? (
          <span className="detail-pill">難易度: {difficulty}</span>
        ) : null}
      </div>
      {useCase ? (
        <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem", color: "var(--ink-soft)" }}>
          {useCase}
        </p>
      ) : null}
      {doc.tags.length > 0 ? (
        <div className="tags" style={{ marginTop: "0.5rem" }}>
          {doc.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      ) : null}

      <details style={{ marginTop: "0.85rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>文献メモを開く</summary>
        <div style={{ marginTop: "0.75rem" }}>
          <MarkdownBody body={doc.body} />
          <SourceLinks sourceIds={doc.sources} />
          {validUrl ? (
            <p style={{ marginTop: "0.7rem" }}>
              <Link href={url} target="_blank" rel="noreferrer">外部リンクを開く</Link>
            </p>
          ) : null}
        </div>
      </details>
    </article>
  );
}
