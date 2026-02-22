import type { ReactNode } from "react";

function getYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

function getGoogleDriveFileId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("drive.google.com")) return null;
    const match = parsed.pathname.match(/\/d\/([^/]+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function renderLine(line: string, index: number): ReactNode {
  const trimmed = line.trim();
  if (!trimmed) return <br key={`br-${index}`} />;

  if (trimmed.startsWith("### ")) return <h3 key={index}>{trimmed.slice(4)}</h3>;
  if (trimmed.startsWith("## ")) return <h2 key={index}>{trimmed.slice(3)}</h2>;
  if (trimmed.startsWith("# ")) return <h1 key={index}>{trimmed.slice(2)}</h1>;

  const ytId = getYoutubeId(trimmed);
  if (ytId) {
    return (
      <div key={index} className="embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}`}
          loading="lazy"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  const driveId = getGoogleDriveFileId(trimmed);
  if (driveId) {
    return (
      <p key={index} className="link-row">
        <a href={`https://drive.google.com/file/d/${driveId}/view`} target="_blank" rel="noreferrer">
          Google Driveで開く
        </a>
      </p>
    );
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return (
      <p key={index} className="link-row">
        <a href={trimmed} target="_blank" rel="noreferrer">
          {trimmed}
        </a>
      </p>
    );
  }

  if (/^\d+\)\s+/.test(trimmed)) {
    return <p key={index} className="step-line">{trimmed}</p>;
  }

  if (trimmed.includes(":") && trimmed.length < 56) {
    const [head, ...rest] = trimmed.split(":");
    if (rest.length > 0) {
      return (
        <p key={index}>
          <strong>{head}:</strong>
          {rest.join(":")}
        </p>
      );
    }
  }

  return <p key={index}>{trimmed}</p>;
}

export function MarkdownBody({ body }: { body: string }) {
  const lines = body.split("\n");
  const nodes: ReactNode[] = [];
  let listBuffer: ReactNode[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listBuffer.length) {
      nodes.push(
        <ul key={`ul-${listKey++}`} className="prose-list">
          {listBuffer}
        </ul>,
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      listBuffer.push(<li key={`li-${index}`}>{trimmed.slice(2)}</li>);
      return;
    }
    flushList();
    nodes.push(renderLine(line, index));
  });
  flushList();

  return <div className="prose">{nodes}</div>;
}
