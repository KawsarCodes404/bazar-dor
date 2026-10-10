import { Suspense } from "react";
import CategoryNav from "./CategoryNav";
import { getCategories, type Category } from "@/lib/bazardor-api";

export default async function NavLinks() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Could not load category navigation:", error);
  }

  return (
    <Suspense fallback={<div className="category-nav category-nav-loading" aria-hidden="true" />}>
      <CategoryNav categories={categories} />
    </Suspense>
  );
}
