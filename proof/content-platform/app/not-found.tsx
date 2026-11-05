import Link from "next/link";

export default function NotFound() {
  return (
    <section className="offline">
      <h1>That page is not in the content model.</h1>
      <p>
        <Link href="/">Back to the home entry</Link>
      </p>
    </section>
  );
}
