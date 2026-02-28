import Link from "next/link";
import { LibraryCard } from "@/components/library-card";
import { getCollection } from "@/lib/content";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams?: Promise<{ stage?: string | string[] }>;
}) {
  const docs = getCollection("library");
  const visibleDocs = docs.filter((doc) => String(doc.content_track ?? "") !== "draft");
  const filterChips = ["基礎", "観察", "会話分析", "倫理", "発表"];
  const params = searchParams ? await searchParams : {};
  const stageRaw = Array.isArray(params?.stage) ? params?.stage[0] : params?.stage;
  const stageFilter = stageRaw === "理解" || stageRaw === "練習" || stageRaw === "自力実践"
    ? stageRaw
    : "all";

  const filteredDocs = stageFilter === "all"
    ? visibleDocs
    : visibleDocs.filter((doc) => String(doc.learning_stage ?? "") === stageFilter);

  const coreDocs = filteredDocs.filter((doc) => String(doc.content_track ?? "supplement") === "core");
  const supplementDocs = filteredDocs.filter((doc) => String(doc.content_track ?? "supplement") !== "core");

  return (
    <section>
      <div className="card section-hero section-hero-library reveal">
        <p className="section-kicker">文献</p>
        <h1>文献リスト</h1>
        <p>
          学習段階ごとに読む順番を整理しています。まず `core` を読み、必要に応じて `supplement` を参照してください。
        </p>
        <p className="meta">学習段階: {stageFilter === "all" ? "全段階" : stageFilter} / {filteredDocs.length}件表示</p>
        <div className="chip-row" aria-label="学習段階フィルタ">
          {(["all", "理解", "練習", "自力実践"] as const).map((stage) => {
            const href = stage === "all"
              ? "/library"
              : `/library?stage=${encodeURIComponent(stage)}`;
            return (
              <Link key={stage} href={href} className="chip-link" aria-current={stageFilter === stage ? "page" : undefined}>
                {stage === "all" ? "全段階" : stage}
              </Link>
            );
          })}
        </div>
        <div className="chip-row">
          {filterChips.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="chip-link">
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <section>
        <div className="detail-meta-row" style={{ marginBottom: "0.75rem" }}>
          <h2 style={{ margin: 0 }}>優先文献（core）</h2>
          <span className="meta">{coreDocs.length}件</span>
        </div>
        <div className="grid">
          {coreDocs.map((doc) => (
            <LibraryCard key={doc.slug} doc={doc} href="/library" />
          ))}
        </div>
      </section>

      {supplementDocs.length ? (
        <section style={{ marginTop: "1rem" }}>
          <details open>
            <summary style={{ cursor: "pointer", fontWeight: 700 }}>補助文献（supplement） {supplementDocs.length}件</summary>
            <div className="grid" style={{ marginTop: "0.8rem" }}>
              {supplementDocs.map((doc) => (
                <LibraryCard key={doc.slug} doc={doc} href="/library" />
              ))}
            </div>
          </details>
        </section>
      ) : null}
    </section>
  );
}
