import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CategoryNav from "./CategoryNav";
import DateLabel from "./DateLabel";
import UserInfo from "./UserInfo";
import { getCategories, type Category } from "@/lib/bazardor-api";

export default async function Header() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Could not load category navigation:", error);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="header-top-row">
          <Link href="/" className="brand-lockup" aria-label="বাজার দর হোম">
            <Image src="/logo-icon.png" alt="" width={40} height={40} className="brand-logo" priority />
            <span className="brand-copy">
              <strong>বাজার দর</strong>
              <small><DateLabel /></small>
            </span>
          </Link>
          <UserInfo />
        </div>
        <Suspense fallback={<div className="category-nav category-nav-loading" aria-hidden="true" />}>
          <CategoryNav categories={categories} />
        </Suspense>
      </div>
    </header>
  );
}
