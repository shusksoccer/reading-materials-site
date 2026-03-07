import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bodyFont = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const headingFont = Noto_Serif_JP({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "エスノメソドロジー探究ポータル",
    template: "%s | エスノメソドロジー探究ポータル",
  },
  description:
    "高校生向けエスノメソドロジー探究授業の教材ポータル。観察・記述・分析の手順を短く学べます。",
  openGraph: {
    title: "エスノメソドロジー探究ポータル",
    description: "観察・記述・分析・発表をつなぐ高校探究授業サイト。",
    type: "website",
    locale: "ja_JP",
  },
};

const navItems = [
  { href: "/intro", label: "EMとは", sub: "" },
  { href: "/curriculum/l1-what-is-em", label: "L1", sub: "EMとは" },
  { href: "/curriculum/l2-how-to-observe", label: "L2", sub: "観察" },
  { href: "/curriculum/l3-how-to-describe", label: "L3", sub: "記述" },
  { href: "/curriculum/l4-ca-entry", label: "L4", sub: "会話分析" },
  { href: "/curriculum/l5-breaching", label: "L5", sub: "実験" },
  { href: "/curriculum/l6-project", label: "L6", sub: "まとめ" },
  { href: "/reference", label: "参照", sub: "" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <a href="#main-content" className="skip-link">
          本文へスキップ
        </a>
        <div className="bg-orb bg-orb-a" aria-hidden />
        <div className="bg-orb bg-orb-b" aria-hidden />

        <header className="site-header reveal">
          <div className="container">
            <Link href="/" className="site-title">
              エスノメソドロジー探究ポータル
            </Link>
            <nav aria-label="メインナビゲーション" className="main-nav">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span>{item.label}</span>
                  {item.sub && <span className="nav-sub">{item.sub}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main id="main-content" className="container page-shell reveal">
          {children}
        </main>
      </body>
    </html>
  );
}
