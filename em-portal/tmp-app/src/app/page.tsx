import Link from "next/link";

export default function HomePage() {
  const startNow = [
    { href: "/intro", label: "1. 前提を3分で確認", desc: "まずここだけ読めば開始できます。" },
    { href: "/curriculum/l1-what-is-em", label: "2. L1を始める", desc: "最初の授業でEMの見方をつかみます。" },
    { href: "/worksheets/ws-l1", label: "3. WS1を提出する", desc: "観察ログを1つ作って提出します。" },
  ];

  const stuckHelp = [
    { href: "/faq", label: "詰まったとき: FAQ", desc: "まずここを見て30秒で再開。" },
    { href: "/glossary", label: "言葉が分からない: 用語", desc: "用語の意味を短く確認。" },
    { href: "/figures", label: "手順が分からない: 図解", desc: "流れを図で確認。" },
  ];

  return (
    <>
      <section className="card home-hero reveal">
        <span className="home-kicker">EM 探究ポータル</span>
        <h1>何をすればいいかが1分で分かる入口</h1>
        <p>
          迷ったらこのページだけ見てください。今やることは3つだけです。
          前提確認 → L1 → WS1 の順で進めれば、最初の提出まで到達できます。
        </p>
        <div className="chip-row" style={{ marginTop: "0.8rem" }}>
          <Link href="/intro" className="chip-link">今すぐ始める</Link>
          <Link href="/curriculum" className="chip-link">全6コマを見る</Link>
        </div>
      </section>

      <section className="card reveal">
        <div className="timeline-head">
          <div>
            <p className="section-kicker">最短ルート</p>
            <h2>今やること（この順番）</h2>
          </div>
          <Link href="/intro">ステップ1へ</Link>
        </div>
        <div className="grid two" aria-label="今やること">
          {startNow.map((item) => (
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
            <p className="section-kicker">進み方</p>
            <h2>6コマの全体像</h2>
          </div>
          <Link href="/curriculum">授業一覧を見る</Link>
        </div>
        <ol style={{ marginTop: "0.4rem", paddingLeft: "1.1rem" }}>
          <li>L1-L2: 観察の基本を身につける</li>
          <li>L3-L5: 記述と分析を練習する</li>
          <li>L6: 自分のミニ実践計画を完成させる</li>
        </ol>
      </section>

      <section className="card reveal">
        <div className="timeline-head">
          <div>
            <p className="section-kicker">困ったとき</p>
            <h2>再開用リンク</h2>
          </div>
        </div>
        <div className="grid two home-links" aria-label="再開用リンク">
          {stuckHelp.map((item) => (
            <article key={item.href} className="card">
              <h3>
                <Link href={item.href}>{item.label}</Link>
              </h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
