"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/bazardor-api";
import { numericValue } from "@/lib/format";
import ProductCard from "./ProductCard";

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");
  const sortedProducts = useMemo(() => {
    const result = [...products];
    if (sort === "price-asc") result.sort((a, b) => numericValue(a.today) - numericValue(b.today));
    if (sort === "price-desc") result.sort((a, b) => numericValue(b.today) - numericValue(a.today));
    return result;
  }, [products, sort]);

  return (
    <>
      <label className="sort-bar">
        <span>সাজান</span>
        <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
      </label>
      <p className="section-subtitle mt-3">মোট {new Intl.NumberFormat("bn-BD").format(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে</p>
      <div className="product-grid mt-4">
        {sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </>
  );
}
