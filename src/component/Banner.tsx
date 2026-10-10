import Image from "next/image";
import Link from "next/link";
import DateLabel from "./DateLabel";

export default function Banner() {
  return (
    <section className="hero-card" aria-labelledby="home-title">
      <div>
        <span className="hero-eyebrow"><DateLabel /></span>
        <h1 id="home-title" className="hero-title">আজকের বাজারের দাম এক নজরে</h1>
        <p className="hero-description">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম—বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <Link href="#সব-পণ্য" className="btn btn-brand btn-sm mt-5 sm:btn-md">সব পণ্য দেখুন</Link>
      </div>
      <Image className="hero-art" alt="বাজারের ফল ও সবজির ঝুড়ি" width={360} height={300} src="/bazar-hero.png" priority />
    </section>
  );
}
