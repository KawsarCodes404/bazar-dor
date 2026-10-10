import ProductCard from "./ProductCard";
import { getProducts, type Product } from "@/lib/bazardor-api";
import { numericValue } from "@/lib/format";

export default async function TodayDecreasedSectionGrid() {
  let products: Product[] = [];
  let unavailable = false;
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Could not load falling products:", error);
    unavailable = true;
  }
  const falling = products
    .filter((product) => product.change.dir === "down" || numericValue(product.change.pct) < 0)
    .sort((a, b) => numericValue(a.change.pct) - numericValue(b.change.pct))
    .slice(0, 6);

  return (
    <section className="page-section" aria-labelledby="falling-title">
      <h2 id="falling-title" className="section-heading"><span className="text-down">▼</span> আজ দাম কমেছে</h2>
      {unavailable ? <p className="empty-state mt-4">দামের তথ্য সাময়িকভাবে পাওয়া যাচ্ছে না।</p> : falling.length > 0 ? (
        <div className="product-grid mt-4">{falling.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : <p className="section-subtitle">আজ কোনো পণ্যের দাম কমেনি।</p>}
    </section>
  );
}
