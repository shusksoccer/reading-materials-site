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

  const lessonToolkit = lesson.slug === "l1-what-is-em"
    ? {
      figures: [
        { href: "/figures/fig-learning-route", label: "学習ルート", note: "単元全体の流れを最初に共有" },
        { href: "/figures/fig-observe-describe-analyze", label: "観察・記述・分析", note: "役割の違いを説明" },
        { href: "/figures/fig-background-expectancy", label: "背景的期待", note: "EMの見方を導入" },
      ] satisfies LessonLinkItem[],
      glossary: [
        { href: "/glossary/accountability", label: "可説明可能性" },
        { href: "/glossary/indexicality", label: "文脈依存性" },
        { href: "/glossary/reflexivity", label: "反射性" },
        { href: "/glossary/context", label: "文脈" },
      ] satisfies LessonLinkItem[],
      worksheets: [
        { href: "/worksheets/ws-l1", label: "WS1 観察ログ", note: "授業内ミニ活動の提出用" },
      ] satisfies LessonLinkItem[],
      faqs: [
        { href: "/faq", label: "FAQ一覧", note: "心理学との違い / AI公開 / データ量などを確認" },
      ] satisfies LessonLinkItem[],
    }
    : null;

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

      <section className="card detail-body reveal">
        <MarkdownBody body={lesson.body} />
      </section>
      <SourceLinks sourceIds={lesson.sources} />
    </article>
  );
}
