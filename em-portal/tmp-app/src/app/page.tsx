import Link from "next/link";

export default function HomePage() {
  const links = [
    { href: "/intro", label: "入門", desc: "EMの基本的な見方を短くつかむ" },
    { href: "/curriculum", label: "カリキュラム", desc: "授業構成と各コマの詳細" },
    { href: "/worksheets", label: "ワーク集", desc: "配布しやすい実践用シート" },
    { href: "/glossary", label: "用語集", desc: "基本概念をすばやく確認" },
    { href: "/figures", label: "図解", desc: "授業説明に使える図解素材" },
    { href: "/library", label: "文献", desc: "授業づくりの参照文献メモ" },
    { href: "/people", label: "研究者", desc: "主要研究者の要点紹介" },
    { href: "/faq", label: "FAQ", desc: "よくある疑問への短い回答" },
    { href: "/search", label: "検索", desc: "教材全体を横断検索" },
    { href: "/tags", label: "タグ", desc: "観察・記述・分析の観点で辿る" },
  ];

  const timeline = [
    { no: "L1", title: "EMの見方をつかむ", desc: "日常の秩序をどう観察するかを知る" },
    { no: "L2", title: "観察する", desc: "印象ではなく再確認できる記録を作る" },
    { no: "L3", title: "記述する", desc: "時刻・発話・行為を分けて整理する" },
    { no: "L4", title: "会話を読む", desc: "順番取りと修復を短い会話データで見る" },
    { no: "L5", title: "背景的期待を考える", desc: "安全な例で当たり前の前提を分析する" },
    { no: "L6", title: "発表へまとめる", desc: "問い・方法・倫理・限界を整理する" },
  ];

  const aiWorkflowLinks = [
    { href: "/library?status=inbox", label: "収集済み（未整理）", desc: "AI収集した文献メモの整理前一覧" },
    { href: "/library?status=reviewed", label: "レビュー済み", desc: "人間確認を終えた文献メモ" },
    { href: "/library?status=published", label: "公開用", desc: "授業に載せやすい整理済み文献" },
    { href: "/search", label: "横断検索", desc: "種別・状態で全体を確認" },
  ];

  return (
    <>
      <section className="card home-hero reveal">
        <span className="home-kicker">高校探究授業向け</span>
        <h1>エスノメソドロジー探究授業ポータル</h1>
        <p>
          観察から発表までを、短い教材・ワーク・図解でつなぐ授業ハブです。
          AIで収集した情報を人間がレビューし、日本語教材として整理していく運用を前提にしています。
        </p>
      </section>

      <section className="card reveal">
        <div className="timeline-head">
          <div>
            <p className="section-kicker">AI運用</p>
            <h2>AI収集・編集の作業導線</h2>
          </div>
          <Link href="/library?status=inbox">収集済み（未整理）を見る</Link>
        </div>
        <div className="grid two" aria-label="AI作業ショートカット">
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
            <h2>6コマの進め方</h2>
          </div>
          <Link href="/curriculum">詳細を見る</Link>
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

