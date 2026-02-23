"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import searchIndex from "../../../public/search-index.json";
import { STATUS_OPTIONS, getStatusLabel, getStatusValue } from "@/lib/status-filter";

type SearchRow = {
  status?: string;
  kind: string;
  slug: string;
  title: string;
  tags: string[];
  text: string;
};

const routeMap: Record<string, string> = {
  lessons: "/curriculum",
  worksheets: "/worksheets",
  glossary: "/glossary",
  figures: "/figures",
  library: "/library",
  people: "/people",
  faq: "/faq",
};

const labelMap: Record<string, string> = {
  lessons: "授業",
  worksheets: "ワーク",
  glossary: "用語",
  figures: "図解",
  library: "文献",
  people: "研究者",
  faq: "FAQ",
};

function buildHref(item: SearchRow) {
  const base = routeMap[item.kind] ?? "/";
  if (item.kind === "library" || item.kind === "people" || item.kind === "faq") return base;
  return `${base}/${item.slug}`;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = searchIndex as SearchRow[];
    return rows
      .filter((row) => (kindFilter === "all" ? true : row.kind === kindFilter))
      .filter((row) => (statusFilter === "all" ? true : getStatusValue(row.status) === statusFilter))
      .filter((row) => {
        if (!q) return true;
        const hay = `${row.title} ${getStatusValue(row.status)} ${row.tags.join(" ")} ${row.text}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 40);
  }, [query, kindFilter, statusFilter]);

  const kinds = ["all", ...Object.keys(labelMap)];
  const statusCounts = useMemo(() => {
    const rows = searchIndex as SearchRow[];
    return {
      all: rows.length,
      inbox: rows.filter((row) => getStatusValue(row.status) === "inbox").length,
      reviewed: rows.filter((row) => getStatusValue(row.status) === "reviewed").length,
      published: rows.filter((row) => getStatusValue(row.status) === "published").length,
      unknown: rows.filter((row) => getStatusValue(row.status) === "unknown").length,
    } as const;
  }, []);

  return (
    <section>
      <div className="card section-hero section-hero-search reveal">
        <p className="section-kicker">検索</p>
        <h1>検索</h1>
        <p>教材全体から、タイトル・タグ・本文を横断検索できます。</p>
        <input
          className="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例: 修復 観察 倫理"
          aria-label="サイト内検索"
        />
        <div className="chip-row" aria-label="種別フィルタ">
          {kinds.map((kind) => (
            <button
              key={kind}
              type="button"
              className={kindFilter === kind ? "chip-button active" : "chip-button"}
              onClick={() => setKindFilter(kind)}
            >
              {kind === "all" ? "すべて" : labelMap[kind]}
            </button>
          ))}
        </div>
        <div className="chip-row" aria-label="statusフィルタ">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              className={statusFilter === status ? "chip-button active" : "chip-button"}
              onClick={() => setStatusFilter(status)}
            >
              {getStatusLabel(status)} ({statusCounts[status]})
            </button>
          ))}
        </div>
      </div>

      <p className="meta" style={{ marginTop: "0.5rem" }}>
        {results.length}件表示
      </p>

      <div className="grid reveal">
        {results.map((item) => (
          <article key={`${item.kind}-${item.slug}`} className="card search-result-card">
            <div className="search-result-head">
              <div className="search-head-top">
                <span className={`search-kind kind-${item.kind}`}>{labelMap[item.kind] ?? item.kind}</span>
                <span className="meta search-slug">{item.slug}</span>
                <span className="meta search-slug">状態: {getStatusLabel(getStatusValue(item.status))}</span>
              </div>
              <h2>
                <Link href={buildHref(item)}>{item.title}</Link>
              </h2>
            </div>
            <div className="tags">
              {item.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <p className="search-excerpt">{item.text.slice(0, 180)}...</p>
          </article>
        ))}
      </div>
    </section>
  );
}
