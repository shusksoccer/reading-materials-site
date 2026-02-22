import { MarkdownBody } from "@/components/markdown-body";
import { SourceLinks } from "@/components/source-links";
import { getCollection } from "@/lib/content";

export default function IntroPage() {
  const intro = getCollection("lessons")[0];
  return (
    <section className="card">
      <h1>入門</h1>
      <p>まずは「エスノメソドロジーとは何か」と、授業全体の学習目的を確認します。</p>
      {intro ? (
        <>
          <h2>最初に読む授業</h2>
          <MarkdownBody body={intro.body} />
          <SourceLinks sourceIds={intro.sources} />
        </>
      ) : null}
    </section>
  );
}
