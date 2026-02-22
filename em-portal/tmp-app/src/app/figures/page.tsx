import Image from "next/image";
import Link from "next/link";
import { getCollection } from "@/lib/content";

export default function FiguresPage() {
  const figures = getCollection("figures");

  return (
    <section>
      <div className="card section-hero section-hero-figures reveal">
        <p className="section-kicker">Figures</p>
        <h1>図解ギャラリー</h1>
        <p>
          授業の説明に使えるSVG図解です。1図1主張で作成しており、各図解ページで説明文と参考リンクを確認できます。
        </p>
        <div className="chip-row">
          <span className="chip-muted">SVG 10点</span>
          <span className="chip-muted">授業投影向け</span>
          <span className="chip-muted">alt付き</span>
        </div>
      </div>

      <div className="figure-gallery reveal" aria-label="図解一覧">
        {figures.map((item) => (
          <Link key={item.slug} href={`/figures/${item.slug}`} className="figure-tile">
            <div className="figure-thumb">
              <Image
                src={`/figures/${item.slug}.svg`}
                alt={String(item.alt ?? item.title)}
                width={1200}
                height={720}
              />
            </div>
            <div className="figure-caption">
              <h2>{item.title}</h2>
              <p>{String(item.alt ?? "")}</p>
              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
