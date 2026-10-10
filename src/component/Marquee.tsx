import { getProducts, type Product } from "@/lib/bazardor-api";
import { formatBanglaNumber } from "@/lib/format";

export default async function Marquee() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Could not load price ticker:", error);
  }

  if (products.length === 0) {
    return <div className="price-ticker price-ticker-empty">আজকের বাজারদর লোড করা যাচ্ছে না</div>;
  }

  const items = products.map((product) => (
    <span key={product.id} className="ticker-item">
      <span aria-hidden="true">{product.image}</span>
      <span>{product.nameBn}</span>
      <span>{formatBanglaNumber(product.today, 0)} টাকা/{product.unit}</span>
      <span className={product.change.dir === "down" ? "text-down" : "text-up"}>
        {product.change.dir === "down" ? "▼" : "▲"} {formatBanglaNumber(product.change.pct)}%
      </span>
    </span>
  ));

  return (
    <div className="price-ticker" aria-label="আজকের পণ্যের দাম">
      <div className="ticker-track">
        <div className="ticker-group">{items}</div>
        <div className="ticker-group" aria-hidden="true">{items}</div>
      </div>
    </div>
  );
}
