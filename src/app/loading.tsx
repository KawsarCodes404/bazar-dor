export default function LoadingPage() {
  return <section className="loading-page" role="status" aria-live="polite">
    <span className="loading-spinner" aria-hidden="true" />
    <p>লোড হচ্ছে…</p>
  </section>;
}
