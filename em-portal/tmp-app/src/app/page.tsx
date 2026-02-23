import Link from "next/link";

export default function HomePage() {
  const links = [
    { href: "/intro", label: "入門", desc: "最初に読むページ。授業で使う導線の入口です。" },
    { href: "/curriculum", label: "カリキュラム", desc: "L1〜L6 の授業構成と各回の導線。" },
    { href: "/worksheets", label: "ワーク集", desc: "授業回ごとの提出用ワークシート。" },
    { href: "/glossary", label: "用語集", desc: "授業で使う概念を短く確認。" },
    { href: "/figures", label: "図解", desc: "授業説明に使える図解と解説。" },
    { href: "/library", label: "文献", desc: "授業向けに整理した文献メモ。" },
    { href: "/people", label: "研究者", desc: "人物ごとの覚える一言と授業で使う観点。" },
    { href: "/faq", label: "FAQ", desc: "授業で止まりやすい点の短答集。" },
    { href: "/search", label: "検索", desc: "用語・図解・文献・ワークを横断検索。" },
    { href: "/tags", label: "タグ", desc: "観点別に教材を探す。" },
  ];

  const timeline = [
    { no: "L1", title: "EMとは何か", desc: "EMの見方をつかみ、観察の入口をつくる。" },
    { no: "L2", title: "観察のしかた", desc: "観察ログの型と倫理チェックを学ぶ。" },
    { no: "L3", title: "記述とデータ化", desc: "観察ログを分析できる記述に整える。" },
    { no: "L4", title: "会話分析の入口", desc: "順番取り・修復を短いデータで読む。" },
    { no: "L5", title: "背景期待とブリーチング", desc: "安全な模擬データで期待の破れを分析する。" },
    { no: "L6", title: "発表計画", desc: "問い・方法・根拠・倫理・限界をまとめる。" },
  ];

  const aiWorkflowLinks = [
    { href: "/library?status=inbox", label: "収集中（inbox）", desc: "AIで収集した文献メモの確認入口。" },
    { href: "/library?status=reviewed", label: "レビュー済み", desc: "人間レビューを終えた文献メモ。" },
    { href: "/library?status=published", label: "公開用", desc: "授業で使う前提の文献メモ。" },
    { href: "/search", label: "横断検索", desc: "用語・図解・ワーク・文献をまとめて検索。" },
  ];

  return (
    <>
      <section className="card home-hero reveal">
        <span className="home-kicker">授業で使える EM ポータル</span>
        <h1>エスノメソドロジー授業用ポータル</h1>
        <p>
          観察・記述・分析・発表までを、用語、図解、ワーク、FAQで支える授業向けサイトです。
          AIで収集した情報をレビューして整理し、日本語で授業に使える形にまとめています。
        </p>
      </section>

      <section className="card reveal">
        <div className="timeline-head">
          <div>
            <p className="section-kicker">AI運用</p>
            <h2>AI収集・整理の作業導線</h2>
          </div>
          <Link href="/library?status=inbox">収集中の文献を見る</Link>
        </div>
        <div className="grid two" aria-label="AI運用ショートカット">
          {aiWorkflowLinks.map((item) => (
            <article key={item.href} className="card">
              <h3>
                <Link href={item.href}>{item.label}</Link>
              </h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card reveal">
        <div className="timeline-head">
          <div>
            <p className="section-kicker">授業の流れ</p>
            <h2>6コマの進行</h2>
          </div>
          <Link href="/curriculum">授業一覧を見る</Link>
        </div>
        <div className="lesson-timeline" aria-label="授業タイムライン">
          {timeline.map((step) => (
            <article key={step.no} className="timeline-step">
              <span className="timeline-no">{step.no}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid two home-links reveal" aria-label="主要ページ">
        {links.map((item) => (
          <article key={item.href} className="card">
            <h2>
              <Link href={item.href}>{item.label}</Link>
            </h2>
            <p>{item.desc}</p>
          </article>
        ))}
      </section>
    </>
  );
}
