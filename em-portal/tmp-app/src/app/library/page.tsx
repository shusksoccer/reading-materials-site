import Link from "next/link";
import { MarkdownBody } from "@/components/markdown-body";
import { SourceLinks } from "@/components/source-links";
import { getCollection } from "@/lib/content";

export default function LibraryPage() {
  const docs = getCollection("library");
  const filterChips = ["基礎", "観察", "会話分析", "倫理", "発表"];

  return (
    <section>
      <div className="card section-hero section-hero-library reveal">
        <p className="section-kicker">Library</p>
        <h1>文献リスト</h1>
        <p>
          授業で使う順に読みやすい短い文献メモです。難易度・用途・読むポイントが先に見える形にしています。
        </p>
        <div className="chip-row">
          {filterChips.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="chip-link">
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid">
        {docs.map((doc) => (
          <article key={doc.slug} className="card">
            <div className="library-head">
              <div>
                <h2>{doc.title}</h2>
                <p className="meta">著者: {String(doc.author ?? "-")} / 年: {String(doc.year ?? "-")}</p>
              </div>
              <div className="library-meta-box">
                <span>難易度: {String(doc.difficulty ?? "-")}</span>
                <span>用途: {String(doc.use_case ?? "-")}</span>
              </div>
            </div>
            <p>
              <Link href={String(doc.url ?? "#")} target="_blank" rel="noreferrer">
                外部リンクを開く
              </Link>
            </p>
            <MarkdownBody body={doc.body} />
            <SourceLinks sourceIds={doc.sources} />
          </article>
        ))}
      </div>
    </section>
  );
}
