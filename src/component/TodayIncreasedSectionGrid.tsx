import ProductCard from "./ProductCard";
import { getProducts, type Product } from "@/lib/bazardor-api";
import { numericValue } from "@/lib/format";

export default async function TodayIncreasedSectionGrid() {
  let products: Product[] = [];
  let unavailable = false;
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Could not load rising products:", error);
    unavailable = true;
  }
  const rising = products
    .filter((product) => product.change.dir === "up" || numericValue(product.change.pct) > 0)
    .sort((a, b) => numericValue(b.change.pct) - numericValue(a.change.pct))
    .slice(0, 6);

  return (
    <section className="page-section" aria-labelledby="rising-title">
      <h2 id="rising-title" className="section-heading"><span className="text-up">▲</span> আজ দাম বেড়েছে</h2>
      {unavailable ? <p className="empty-state mt-4">দামের তথ্য সাময়িকভাবে পাওয়া যাচ্ছে না।</p> : rising.length > 0 ? (
        <div className="product-grid mt-4">{rising.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : <p className="section-subtitle">আজ কোনো পণ্যের দাম বাড়েনি।</p>}
    </section>
  );
}
