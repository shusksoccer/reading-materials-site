import Link from "next/link";
import { MarkdownBody } from "@/components/markdown-body";
import { SourceLinks } from "@/components/source-links";
import { getCollection } from "@/lib/content";

export default function IntroPage() {
  const lessons = getCollection("lessons");
  const intro = lessons[0];

  const starterLinks = [
    { href: "/curriculum/l1-what-is-em", label: "L1 授業ページ", desc: "授業の流れ・ねらいを確認" },
    { href: "/figures/fig-learning-route", label: "図解: 学習ルート", desc: "単元全体の見取り図" },
    { href: "/glossary/accountability", label: "用語: 可説明可能性", desc: "EMの見方の入口" },
    { href: "/worksheets/ws-l1", label: "WS1 観察ログ", desc: "授業内ミニ活動・提出用" },
    { href: "/faq", label: "FAQ", desc: "止まりやすい点の確認" },
  ];

  return (
    <section className="card reveal">
      <p className="section-kicker">入門</p>
      <h1>はじめに読むページ</h1>
      <p>
        エスノメソドロジー（EM）の全体像を短く確認し、授業で使うページへ移動するための入口です。
        初回授業の準備や、授業前の確認に使う想定です。
      </p>

      <section className="card" aria-label="このサイトの使い方" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>このサイトの使い方（最短）</h2>
        <ol style={{ marginTop: "0.5rem" }}>
          <li>まず `L1 授業ページ` を開いて授業の流れを確認する</li>
          <li>必要に応じて図解と用語を開き、説明の順番を決める</li>
          <li>ワークシートと FAQ を開いて授業中の補助に使う</li>
        </ol>
      </section>

      <section className="card" aria-label="最初に開くリンク" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>最初に開くリンク</h2>
        <div className="grid two">
          {starterLinks.map((item) => (
            <article key={item.href} className="card">
              <h3 style={{ marginTop: 0 }}>
                <Link href={item.href}>{item.label}</Link>
              </h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {intro ? (
        <>
          <section className="card" aria-label="最初の授業の内容" style={{ marginTop: "1rem" }}>
            <div className="detail-meta-row">
              <h2 style={{ margin: 0 }}>最初に読む授業の内容</h2>
              <Link href={`/curriculum/${intro.slug}`} className="chip-link">
                授業ページへ移動
              </Link>
            </div>
            <p className="meta">
              授業 {String(intro.lesson_no ?? 1)} コマ目 / {String(intro.duration_min ?? 50)}分
            </p>
            <MarkdownBody body={intro.body} />
          </section>
          <SourceLinks sourceIds={intro.sources} />
        </>
      ) : (
        <p className="meta">授業データがまだありません。</p>
      )}
    </section>
  );
}
