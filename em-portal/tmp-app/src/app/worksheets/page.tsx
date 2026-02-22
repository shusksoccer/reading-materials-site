import { DocCard } from "@/components/doc-card";
import { getCollection } from "@/lib/content";

export default function WorksheetsPage() {
  const worksheets = getCollection("worksheets");

  return (
    <section>
      <div className="card section-hero section-hero-worksheets reveal">
        <p className="section-kicker">Worksheets</p>
        <h1>ワーク集</h1>
        <p>
          20分で実施できる配布用ワークです。記入欄、評価観点、発展課題を揃えてあるので、
          授業中でも宿題でも使えます。
        </p>
        <div className="chip-row">
          <span className="chip-muted">20分想定</span>
          <span className="chip-muted">記入欄あり</span>
          <span className="chip-muted">簡易ルーブリック付き</span>
        </div>
      </div>

      <div className="grid two">
        {worksheets.map((item) => (
          <DocCard key={item.slug} doc={item} href={`/worksheets/${item.slug}`} />
        ))}
      </div>
    </section>
  );
}

