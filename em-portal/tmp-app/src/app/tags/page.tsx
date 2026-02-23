import Link from "next/link";
import { getTagMap } from "@/lib/content";

export default function TagsPage() {
  const tagMap = getTagMap();

  return (
    <section>
      <div className="card section-hero section-hero-tags reveal">
        <p className="section-kicker">タグ</p>
        <h1>タグ一覧</h1>
        <p>
          「観察」「記述」「会話分析」など、授業の観点で教材を横断できます。件数を見ながら導線として使ってください。
        </p>
      </div>
      <div className="tag-cloud reveal" aria-label="タグ一覧">
        {Object.entries(tagMap).map(([tag, count]) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag-cloud-item">
            <span>{tag}</span>
            <small>{count}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
