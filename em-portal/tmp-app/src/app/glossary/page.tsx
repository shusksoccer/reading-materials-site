import Link from "next/link";
import { DocCard } from "@/components/doc-card";
import { getCollection } from "@/lib/content";

export default function GlossaryPage() {
  const glossary = getCollection("glossary");
  const quick = ["accountability", "indexicality", "reflexivity", "turn-taking", "repair"];

  return (
    <section>
      <div className="card section-hero section-hero-glossary reveal">
        <p className="section-kicker">Glossary</p>
        <h1>用語集</h1>
        <p>
          授業で頻出する語を、短い定義・身近な例・使い方の3点で確認できます。
          まずここで意味をつかみ、各授業ページで使ってください。
        </p>
        <div className="chip-row" aria-label="頻出語">
          {quick.map((slug) => (
            <Link key={slug} href={`/glossary/${slug}`} className="chip-link">
              {slug}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid two">
        {glossary.map((item) => (
          <DocCard key={item.slug} doc={item} href={`/glossary/${item.slug}`} />
        ))}
      </div>
    </section>
  );
}
