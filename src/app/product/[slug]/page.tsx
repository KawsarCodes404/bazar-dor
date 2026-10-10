import { notFound } from "next/navigation";
import ProductDetails from "@/component/ProductDetails";
import { getProductBySlug } from "@/lib/bazardor-api";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
