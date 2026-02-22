import { MarkdownBody } from "@/components/markdown-body";
import { SourceLinks } from "@/components/source-links";
import { getCollection } from "@/lib/content";

export default function PeoplePage() {
  const docs = getCollection("people");

  return (
    <section>
      <div className="card section-hero section-hero-people reveal">
        <p className="section-kicker">People</p>
        <h1>研究者紹介</h1>
        <p>
          人物史を長く追うよりも、「授業でどの考え方を使うか」に焦点を当てたメモです。
          各ページは覚える一言つきで、配布資料の欄外解説に使えます。
        </p>
      </div>
      <div className="grid two reveal">
        {docs.map((doc) => (
          <article key={doc.slug} className="card profile-card">
            <h2>{doc.title}</h2>
            <MarkdownBody body={doc.body} />
            <SourceLinks sourceIds={doc.sources} />
          </article>
        ))}
      </div>
    </section>
  );
}
