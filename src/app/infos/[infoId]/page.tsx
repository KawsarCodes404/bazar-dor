import { notFound } from "next/navigation";
import ProductDetails from "@/component/ProductDetails";
import { getProductById } from "@/lib/bazardor-api";

export default async function LegacyInfoPage({ params }: { params: Promise<{ infoId: string }> }) {
  const { infoId } = await params;
  let product;
  try {
    product = await getProductById(infoId);
  } catch (error) {
    console.error("Could not load product detail:", error);
    notFound();
  }
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
