import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/markdown-body";
import { PrintButton } from "@/components/print-button";
import { SourceLinks } from "@/components/source-links";
import { getCollection, getDocBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getCollection("glossary").map((item) => ({ slug: item.slug }));
}

export default async function GlossaryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getDocBySlug("glossary", slug);
  if (!term) notFound();

  return (
    <article>
      <header className="card detail-hero detail-hero-glossary reveal">
        <p className="section-kicker">用語集</p>
        <h1>{term.title}</h1>
        <div className="detail-meta-row">
          <PrintButton label="用語を印刷" />
        </div>
        <div className="tags">
          {term.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <section className="card detail-body reveal">
        <MarkdownBody body={term.body} />
      </section>
      <SourceLinks sourceIds={term.sources} />
    </article>
  );
}
