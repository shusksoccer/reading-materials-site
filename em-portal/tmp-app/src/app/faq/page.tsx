import { MarkdownBody } from "@/components/markdown-body";
import { SourceLinks } from "@/components/source-links";
import { getCollection } from "@/lib/content";

export default function FaqPage() {
  const faqs = getCollection("faq");

  return (
    <section>
      <div className="card section-hero section-hero-faq reveal">
        <p className="section-kicker">FAQ</p>
        <h1>よくある質問</h1>
        <p>
          授業で止まりやすいポイントを短く確認できます。回答は短く、チェック項目は共通でそろえています。
        </p>
      </div>
      <div className="grid reveal">
        {faqs.map((faq, index) => (
          <article key={faq.slug} className="card faq-card">
            <p className="faq-index">Q{index + 1}</p>
            <h2>{faq.title}</h2>
            <MarkdownBody body={faq.body} />
            <SourceLinks sourceIds={faq.sources} />
          </article>
        ))}
      </div>
    </section>
  );
}
