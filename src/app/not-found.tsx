import Link from "next/link";

export default function NotFound() {
  return <section className="not-found-page">
    <div className="not-found-content">
      <p className="not-found-code">404</p>
      <h1>পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1>
      <p>লিংকটি ভুল হতে পারে অথবা পৃষ্ঠাটি সরানো হয়েছে।</p>
      <Link className="btn-brand mt-6 inline-flex" href="/">হোম পেজে ফিরে যান</Link>
    </div>
  </section>;
}
