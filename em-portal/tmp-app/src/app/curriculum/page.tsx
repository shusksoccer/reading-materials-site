import Link from "next/link";
import { DocCard } from "@/components/doc-card";
import { getCollection, getTagMap } from "@/lib/content";

export default function CurriculumPage() {
  const lessons = getCollection("lessons");
  const tagMap = getTagMap();
  const focusTags = ["基礎", "観察", "記述", "会話分析", "倫理", "発表"];

  return (
    <section>
      <div className="card section-hero section-hero-curriculum reveal">
        <p className="section-kicker">Curriculum</p>
        <h1>カリキュラム</h1>
        <p>
          全6コマを、観察から発表まで順番に学ぶ構成です。各コマは50分想定で、
          次の授業につながる最小限の課題を含みます。
        </p>
        <div className="stat-row" aria-label="カリキュラム情報">
          <div>
            <span>コマ数</span>
            <strong>{lessons.length}</strong>
          </div>
          <div>
            <span>総時間</span>
            <strong>{lessons.reduce((acc, lesson) => acc + Number(lesson.duration_min ?? 0), 0)}分</strong>
          </div>
          <div>
            <span>対象</span>
            <strong>高校探究</strong>
          </div>
        </div>
        <div className="chip-row" aria-label="注目タグ">
          {focusTags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="chip-link">
              {tag} <small>({tagMap[tag] ?? 0})</small>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid">
        {lessons.map((lesson) => (
          <DocCard key={lesson.slug} doc={lesson} href={`/curriculum/${lesson.slug}`} />
        ))}
      </div>
    </section>
  );
}
