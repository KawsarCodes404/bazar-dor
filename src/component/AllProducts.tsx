import ProductCard from "./ProductCard";
import { getProducts, type Product } from "@/lib/bazardor-api";

export default async function AllProducts() {
  let products: Product[] = [];
  let unavailable = false;
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Could not load all products:", error);
    unavailable = true;
  }

  return (
    <section className="page-section" id="সব-পণ্য" aria-labelledby="all-products-title">
      <h2 id="all-products-title" className="section-heading">সব পণ্য</h2>
      <p className="section-subtitle">মোট {new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্যের আজকের দাম</p>
      {unavailable ? (
        <p className="empty-state mt-4">এই মুহূর্তে পণ্যের তথ্য পাওয়া যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
      ) : products.length > 0 ? (
        <div className="product-grid mt-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <p className="empty-state mt-4">এখনো কোনো পণ্যের তথ্য যোগ করা হয়নি।</p>
      )}
    </section>
  );
}
