import { notFound } from "next/navigation";
import CategoryProducts from "@/component/CategoryProducts";
import { getCategories, getProductsByCategory, type Category } from "@/lib/bazardor-api";

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  const products = await getProductsByCategory(categoryId);
  if (products.length === 0) notFound();

  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Could not load category labels:", error);
  }
  const category = categories.find((item) => item.slug === categoryId);
  const title = category?.nameBn ?? products[0]?.categoryNameBn ?? categoryId;
  const icon = category?.icon ?? products[0]?.categoryIcon ?? products[0]?.image ?? "🛒";

  return (
    <section className="page-section" aria-labelledby="category-title">
      <div className="detail-card category-header-card">
        <div className="flex min-w-0 items-center gap-3">
          <span className="product-card-image category-hero-icon" aria-hidden="true">{icon}</span>
          <div>
            <h1 id="category-title" className="section-heading category-heading">{title}</h1>
            <p className="section-subtitle">{new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>
      </div>
      <CategoryProducts products={products} />
    </section>
  );
}
