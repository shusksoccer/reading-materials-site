"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const startNow = [
    {
      href: "/intro",
      label: "1. 前提を3分で確認",
      desc: "まずここだけ読めば開始できます。",
      why: "最初に判断基準をそろえると、後の課題で迷いにくくなるため。",
    },
    {
      href: "/curriculum/l1-what-is-em",
      label: "2. L1を始める",
      desc: "最初の授業でEMの見方をつかみます。",
      why: "観察の視点がないままワークに入ると、記述が感想になるため。",
    },
    {
      href: "/worksheets/ws-l1",
      label: "3. WS1を提出する",
      desc: "観察ログを1つ作って提出します。",
      why: "概念理解を実作業につなげ、学習を定着させるため。",
    },
    {
      href: "/curriculum",
      label: "4. 次の授業を決める",
      desc: "L2以降の進行を確認します。",
      why: "次の行動を固定して、途中離脱を防ぐため。",
    },
  ];

  const stuckHelp = [
    { href: "/faq", label: "詰まったとき: FAQ", desc: "まずここを見て30秒で再開。" },
    { href: "/glossary", label: "言葉が分からない: 用語", desc: "用語の意味を短く確認。" },
    { href: "/figures", label: "手順が分からない: 図解", desc: "流れを図で確認。" },
  ];

  const checklist = useMemo(
    () => [
      { id: "intro", label: "前提を確認した", href: "/intro" },
      { id: "l1", label: "L1を読んだ", href: "/curriculum/l1-what-is-em" },
      { id: "ws1", label: "WS1に着手した", href: "/worksheets/ws-l1" },
      { id: "next", label: "次の授業（L2）を確認した", href: "/curriculum/l2-how-to-observe" },
    ],
    [],
  );
  const storageKey = "em_portal_progress_v1";
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as Record<string, boolean>;
      setProgress(parsed);
    } catch {
      setProgress({});
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // ignore storage errors
    }
  }, [progress]);

  const completedCount = checklist.filter((item) => progress[item.id]).length;

  function toggleProgress(id: string) {
    setProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function clearProgress() {
    setProgress({});
  }

  return (
    <>
      <section className="card home-hero reveal">
        <span className="home-kicker">EM 探究ポータル</span>
        <h1>何をすればいいかが1分で分かる入口</h1>
        <p>
          迷ったらこのページだけ見てください。今やることは4つだけです。
          前提確認から始めて、最初の提出と次の授業決定まで進めます。
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
              <p className="meta"><strong>なぜやるか:</strong> {item.why}</p>
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
        <div className="grid two">
          <article className="timeline-step">
            <span className="timeline-no">L1-L2</span>
            <h3>理解フェーズ</h3>
            <p>観察対象と根拠の取り方を理解する。</p>
            <p className="meta">できるようになること: 発話・行為・順序を根拠として説明できる。</p>
          </article>
          <article className="timeline-step">
            <span className="timeline-no">L3-L5</span>
            <h3>実践フェーズ</h3>
            <p>記述と分析を手順で再現する。</p>
            <p className="meta">できるようになること: データを記述し、修復や背景期待を分析できる。</p>
          </article>
          <article className="timeline-step">
            <span className="timeline-no">L6</span>
            <h3>統合フェーズ</h3>
            <p>問い・方法・根拠・倫理を統合して発表計画を作る。</p>
            <p className="meta">できるようになること: 自力ミニ実践を説明可能な形で提案できる。</p>
          </article>
        </div>
      </section>

      <section className="card reveal">
        <div className="timeline-head">
          <div>
            <p className="section-kicker">進捗チェック</p>
            <h2>学習チェックリスト</h2>
          </div>
          <button type="button" className="chip-button" onClick={clearProgress}>チェックをリセット</button>
        </div>
        <p className="meta">達成: {completedCount}/{checklist.length}</p>
        <div className="progress-list" aria-label="進捗チェックリスト">
          {checklist.map((item) => (
            <label key={item.id} className={`progress-item${progress[item.id] ? " done" : ""}`}>
              <input
                type="checkbox"
                checked={Boolean(progress[item.id])}
                onChange={() => toggleProgress(item.id)}
              />
              <span>{item.label}</span>
              <Link href={item.href}>開く</Link>
            </label>
          ))}
        </div>
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
