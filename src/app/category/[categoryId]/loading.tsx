export default function CategoryLoading() {
  return (
    <section className="page-section animate-pulse" aria-label="ক্যাটাগরি লোড হচ্ছে">
      <div className="h-20 rounded-2xl border border-line bg-surface" />
      <div className="mt-5 h-12 rounded-xl border border-line bg-surface" />
      <div className="product-grid mt-4">
        {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-32 rounded-2xl border border-line bg-surface" />)}
      </div>
    </section>
  );
}
