export const STATUS_OPTIONS = ["all", "inbox", "reviewed", "published", "unknown"] as const;

export type StatusFilter = (typeof STATUS_OPTIONS)[number];

export function getStatusValue(value: unknown): Exclude<StatusFilter, "all"> {
  const raw = String(value ?? "").trim().toLowerCase();
  if (raw === "inbox" || raw === "reviewed" || raw === "published") return raw;
  return "unknown";
}

export function parseStatusFilter(value: string | string[] | undefined): StatusFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  const normalized = String(raw ?? "all").trim().toLowerCase();
  if (STATUS_OPTIONS.includes(normalized as StatusFilter)) {
    return normalized as StatusFilter;
  }
  return "all";
}

export function getStatusLabel(value: StatusFilter | string | undefined): string {
  const raw = String(value ?? "").trim().toLowerCase();
  switch (raw) {
    case "all":
      return "すべて";
    case "inbox":
      return "収集済み（未整理）";
    case "reviewed":
      return "レビュー済み";
    case "published":
      return "公開用";
    case "unknown":
      return "未設定";
    default:
      return raw || "未設定";
  }
}
