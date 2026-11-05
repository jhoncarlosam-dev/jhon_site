export function ApiOffline() {
  return (
    <section className="offline">
      <h1>The content service is not running.</h1>
      <p>
        From <code>proof/content-platform</code>, run <code>npm run dev</code>.
        The API listens on port 4000 and this site on port 3001.
      </p>
    </section>
  );
}
