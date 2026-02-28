import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/markdown-body";
import { PrintButton } from "@/components/print-button";
import { SourceLinks } from "@/components/source-links";
import { getCollection, getDocBySlug } from "@/lib/content";

type LessonLinkItem = {
  href: string;
  label: string;
  note?: string;
};

function LessonLinkGroup({
  title,
  items,
}: {
  title: string;
  items: LessonLinkItem[];
}) {
  if (!items.length) return null;
  return (
    <section>
      <p className="meta" style={{ marginBottom: "0.4rem" }}>{title}</p>
      <div className="tags" aria-label={title}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="tag" title={item.note}>
            {item.label}
          </Link>
        ))}
      </div>
      {items.some((item) => item.note) ? (
        <div style={{ marginTop: "0.5rem" }}>
          {items.map((item) => (
            item.note ? <p key={`${item.href}-note`} className="meta" style={{ margin: "0.2rem 0" }}>{item.label}: {item.note}</p> : null
          ))}
        </div>
      ) : null}
    </section>
  );
}

function getLessonToolkit(slug: string): {
  figures: LessonLinkItem[];
  glossary: LessonLinkItem[];
  worksheets: LessonLinkItem[];
  faqs: LessonLinkItem[];
} | null {
  switch (slug) {
    case "l1-what-is-em":
      return {
        figures: [
          { href: "/figures/fig-learning-route", label: "学習ルート", note: "単元全体の流れを最初に共有" },
          { href: "/figures/fig-observe-describe-analyze", label: "観察・記述・分析", note: "役割の違いを説明" },
          { href: "/figures/fig-background-expectancy", label: "背景的期待", note: "EMの見方を導入" },
        ],
        glossary: [
          { href: "/glossary/accountability", label: "可説明可能性" },
          { href: "/glossary/indexicality", label: "文脈依存性" },
          { href: "/glossary/reflexivity", label: "反射性" },
          { href: "/glossary/context", label: "文脈" },
        ],
        worksheets: [
          { href: "/worksheets/ws-l1", label: "WS1 観察ログ", note: "授業内ミニ活動の提出用" },
        ],
        faqs: [
          { href: "/faq", label: "FAQ一覧", note: "心理学との違い / AI公開 / データ量などを確認" },
        ],
      };
    case "l2-how-to-observe":
      return {
        figures: [
          { href: "/figures/fig-observation-log", label: "観察ログの書き方" },
          { href: "/figures/fig-ethics-checklist", label: "倫理チェック" },
        ],
        glossary: [
          { href: "/glossary/observation", label: "観察" },
          { href: "/glossary/fieldnote", label: "フィールドノート" },
          { href: "/glossary/anonymization", label: "匿名化" },
        ],
        worksheets: [{ href: "/worksheets/ws-l2", label: "WS2 観察チェックシート" }],
        faqs: [{ href: "/faq", label: "FAQ一覧", note: "データ量・テーマ設定も確認可" }],
      };
    case "l3-how-to-describe":
      return {
        figures: [
          { href: "/figures/fig-observe-describe-analyze", label: "観察・記述・分析" },
          { href: "/figures/fig-transcript-template", label: "転写テンプレート" },
        ],
        glossary: [
          { href: "/glossary/description", label: "記述" },
          { href: "/glossary/transcript", label: "転写" },
          { href: "/glossary/data-session", label: "データセッション" },
        ],
        worksheets: [{ href: "/worksheets/ws-l3", label: "WS3 記述テンプレート" }],
        faqs: [{ href: "/faq", label: "FAQ一覧", note: "記述と分析の混同を確認" }],
      };
    case "l4-ca-entry":
      return {
        figures: [
          { href: "/figures/fig-turn-structure", label: "順番取りの基本構造" },
          { href: "/figures/fig-repair-pattern", label: "修復パターン" },
        ],
        glossary: [
          { href: "/glossary/turn-taking", label: "順番取り" },
          { href: "/glossary/repair", label: "修復" },
          { href: "/glossary/adjacency-pair", label: "隣接ペア" },
        ],
        worksheets: [{ href: "/worksheets/ws-l4", label: "WS4 ターン分けと修復" }],
        faqs: [{ href: "/faq", label: "FAQ一覧", note: "会話分析で何を数えるか等" }],
      };
    case "l5-breaching":
      return {
        figures: [
          { href: "/figures/fig-breaching-safe", label: "安全なブリーチング学習" },
          { href: "/figures/fig-background-expectancy", label: "背景的期待" },
          { href: "/figures/fig-ethics-checklist", label: "倫理チェック" },
        ],
        glossary: [
          { href: "/glossary/breaching", label: "ブリーチング" },
          { href: "/glossary/background-expectancies", label: "背景的期待" },
          { href: "/glossary/ethics", label: "倫理" },
        ],
        worksheets: [{ href: "/worksheets/ws-l5", label: "WS5 模擬ブリーチング分析" }],
        faqs: [{ href: "/faq", label: "FAQ一覧", note: "ブリーチングの安全運用を確認" }],
      };
    case "l6-project":
      return {
        figures: [
          { href: "/figures/fig-presentation-map", label: "発表構成マップ" },
          { href: "/figures/fig-learning-route", label: "学習ルート" },
        ],
        glossary: [
          { href: "/glossary/presentation", label: "発表" },
          { href: "/glossary/validity", label: "妥当性" },
          { href: "/glossary/anonymization", label: "匿名化" },
        ],
        worksheets: [{ href: "/worksheets/ws-l6", label: "WS6 発表計画シート" }],
        faqs: [{ href: "/faq", label: "FAQ一覧", note: "テーマの絞り込み・発表評価を確認" }],
      };
    default:
      return null;
  }
}

export function generateStaticParams() {
  return getCollection("lessons").map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getDocBySlug("lessons", slug);
  if (!lesson) notFound();

  const lessonToolkit = getLessonToolkit(lesson.slug);
  const objectives = Array.isArray(lesson.objectives) ? lesson.objectives : [];
  const prereq = Array.isArray(lesson.prereq) ? lesson.prereq : [];

  return (
    <article>
      <header className="card detail-hero detail-hero-lesson reveal">
        <p className="section-kicker">授業</p>
        <h1>{lesson.title}</h1>
        <div className="detail-meta-row">
          <span className="detail-pill">授業{String(lesson.lesson_no)}コマ目</span>
          <span className="detail-pill">{String(lesson.duration_min)}分</span>
          <PrintButton label="授業を印刷" />
        </div>
        <div className="tags">
          {lesson.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <section className="card reveal" aria-label="この授業でやること">
        <h2 style={{ marginTop: 0 }}>この授業でやること（先に確認）</h2>
        <ol style={{ marginTop: "0.4rem", paddingLeft: "1.1rem" }}>
          <li>本文を読み、観察可能な根拠を押さえる</li>
          <li>対応ワークを実施して提出物を作る</li>
          <li>FAQで詰まりを解消し、次の授業へ進む</li>
        </ol>
      </section>

      {lessonToolkit ? (
        <section className="card reveal" aria-label="この授業で使うリンク">
          <h2 style={{ marginTop: 0 }}>この授業で使うリンク</h2>
          <p className="meta" style={{ marginTop: 0 }}>
            導入で開く順に並べています。授業中はここから図解・用語・ワークへ移動してください。
          </p>
          <div className="grid two">
            <div>
              <LessonLinkGroup title="図解" items={lessonToolkit.figures} />
              <LessonLinkGroup title="用語" items={lessonToolkit.glossary} />
            </div>
            <div>
              <LessonLinkGroup title="ワーク" items={lessonToolkit.worksheets} />
              <LessonLinkGroup title="補助" items={lessonToolkit.faqs} />
              {lesson.next ? (
                <section style={{ marginTop: "0.75rem" }}>
                  <p className="meta" style={{ marginBottom: "0.4rem" }}>次の授業</p>
                  <Link href={`/curriculum/${encodeURIComponent(String(lesson.next))}`} className="chip-link">
                    {String(lesson.next)}
                  </Link>
                </section>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="card reveal" aria-label="高探究チェック">
        <h2 style={{ marginTop: 0 }}>高探究チェック</h2>
        {objectives.length ? (
          <>
            <p className="meta">この回の到達目標</p>
            <ul style={{ marginTop: "0.4rem" }}>
              {objectives.map((item) => (
                <li key={String(item)}>{String(item)}</li>
              ))}
            </ul>
          </>
        ) : null}
        {prereq.length ? (
          <p className="meta" style={{ marginTop: "0.8rem" }}>
            前提授業: {prereq.map((item) => String(item)).join(" / ")}
          </p>
        ) : null}
        <div className="grid two" style={{ marginTop: "0.8rem" }}>
          <article className="card">
            <h3 style={{ marginTop: 0 }}>根拠</h3>
            <p>主張ごとに、対応するデータ箇所を示す。</p>
          </article>
          <article className="card">
            <h3 style={{ marginTop: 0 }}>限界</h3>
            <p>別解または不足データを1点以上書く。</p>
          </article>
          <article className="card">
            <h3 style={{ marginTop: 0 }}>再現性</h3>
            <p>手順を他者が追える形で残す。</p>
          </article>
          <article className="card">
            <h3 style={{ marginTop: 0 }}>倫理</h3>
            <p>同意・匿名化・安全性の確認を残す。</p>
          </article>
        </div>
      </section>

      <section className="card detail-body reveal">
        <MarkdownBody body={lesson.body} />
      </section>
      <SourceLinks sourceIds={lesson.sources} />
    </article>
  );
}
