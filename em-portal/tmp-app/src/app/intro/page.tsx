import Link from "next/link";

export default function IntroPage() {
  return (
    <section className="card reveal">
      <p className="section-kicker">入門</p>
      <h1>開始前チェック（3分）</h1>
      <p>
        ここで確認するのは4つだけです。読み終わったらすぐにL1へ進んでください。
      </p>
      <div className="chip-row" style={{ marginTop: "0.8rem" }}>
        <Link href="/curriculum/l1-what-is-em" className="chip-link">L1を始める</Link>
        <Link href="/worksheets/ws-l1" className="chip-link">先にWS1を見る</Link>
      </div>

      <section className="card" aria-label="開始チェック" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>開始チェック</h2>
        <ul style={{ marginTop: "0.5rem" }}>
          <li>観察できる事実（発話・行為・順序）を根拠にする</li>
          <li>主張にはデータ箇所を対応づける</li>
          <li>限界や別解を1点以上書く</li>
          <li>同意・匿名化・安全性を先に確認する</li>
        </ul>
      </section>

      <section className="card" aria-label="詰まり予防" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>よくある詰まり</h2>
        <ul style={{ marginTop: "0.5rem" }}>
          <li>印象だけで結論を書く（根拠が抜ける）</li>
          <li>観察と評価を混ぜる（再現できない）</li>
          <li>引用元なしで要約だけ書く（検証できない）</li>
        </ul>
      </section>

      <section className="card" aria-label="次の行動" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>この後にやること</h2>
        <div className="grid two">
          <article className="card">
            <h3 style={{ marginTop: 0 }}><Link href="/curriculum/l1-what-is-em">L1を開く</Link></h3>
            <p>まず授業本文を読み、観察の視点を理解する。</p>
          </article>
          <article className="card">
            <h3 style={{ marginTop: 0 }}><Link href="/worksheets/ws-l1">WS1を提出する</Link></h3>
            <p>L1の内容を使って最初の観察ログを作る。</p>
          </article>
        </div>
      </section>

      <section className="card" aria-label="補助リンク" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>困ったとき</h2>
        <div className="grid two">
          <article className="card">
            <h3 style={{ marginTop: 0 }}><Link href="/faq">FAQ</Link></h3>
            <p>まず短答で詰まりを解消する。</p>
          </article>
          <article className="card">
            <h3 style={{ marginTop: 0 }}><Link href="/figures/fig-learning-route">学習ルート図</Link></h3>
            <p>全体像を図で確認して再開する。</p>
          </article>
        </div>
      </section>
    </section>
  );
}
