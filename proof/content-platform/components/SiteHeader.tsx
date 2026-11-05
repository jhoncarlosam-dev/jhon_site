import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        Portico
      </Link>
      <nav aria-label="Demo">
        <Link href="/">Page</Link>
        <Link href="/model">Content model</Link>
        <Link href="/stories/schema-change">Schema change</Link>
        <Link href="/stories/experiments">Experiment</Link>
      </nav>
    </header>
  );
}
