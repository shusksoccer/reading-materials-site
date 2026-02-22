import Link from "next/link";

export default function HomePage() {
  const links = [
    { href: "/intro", label: "入門", desc: "EMの見方を5分でつかむ" },
    { href: "/curriculum", label: "カリキュラム", desc: "6コマの授業構成と詳細" },
    { href: "/worksheets", label: "ワーク集", desc: "そのまま配れる実践シート" },
    { href: "/glossary", label: "用語集", desc: "短い定義で素早く確認" },
    { href: "/figures", label: "図解", desc: "授業で使える10枚のSVG" },
    { href: "/library", label: "文献", desc: "難易度付きの参照リスト" },
    { href: "/people", label: "研究者", desc: "人物史より方法の要点" },
    { href: "/faq", label: "FAQ", desc: "つまずきやすい点を短く整理" },
    { href: "/search", label: "検索", desc: "全教材を横断検索" },
    { href: "/tags", label: "タグ", desc: "観察・記述・分析で辿る" },
  ];

  const timeline = [
    { no: "L1", title: "見方をつくる", desc: "EMの基本視点と授業全体の流れを確認" },
    { no: "L2", title: "観察する", desc: "印象ではなく再確認できる観察ログを作る" },
    { no: "L3", title: "記述する", desc: "時刻・発話・行為を分けてデータ化する" },
    { no: "L4", title: "会話を読む", desc: "順番取りと修復を短い会話データで読む" },
    { no: "L5", title: "背景期待を読む", desc: "模擬データで安全にブリーチングを分析" },
    { no: "L6", title: "発表へまとめる", desc: "問い・方法・倫理・限界を1枚に整理" },
  ];

  const aiWorkflowLinks = [
    { href: "/library?status=inbox", label: "収集Inbox", desc: "AI収集した文献メモの未整理分" },
    { href: "/library?status=reviewed", label: "レビュー済み", desc: "人間確認を終えた文献メモ" },
    { href: "/library?status=published", label: "公開候補", desc: "授業導線に載せやすい整理済み文献" },
    { href: "/search", label: "横断検索", desc: "statusと種別で全体を確認" },
  ];

  return (
    <>
      <section className="card home-hero reveal">
        <span className="home-kicker">for high school inquiry</span>
        <h1>エスノメソドロジー探究授業ポータル</h1>
        <p>
          観察から発表までを、短い教材・ワーク・図解でつなぐ授業ハブです。
          各ページは「そのまま配布」「そのまま説明」しやすい粒度で整理しています。
        </p>
      </section>

      <section className="card reveal">
        <div className="timeline-head">
          <div>
            <p className="section-kicker">AI Workflow</p>
            <h2>AI収集・編集の作業導線</h2>
          </div>
          <Link href="/library?status=inbox">Inboxを開く</Link>
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
            <p className="section-kicker">Lesson Flow</p>
            <h2>授業の進め方（6コマ）</h2>
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

