export interface MarketPrice {
  market: string;
  division: string;
  min: number | string;
  max: number | string;
  average?: number | string;
}

export interface Product {
  id: string | number;
  slug?: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number | string;
  yesterday?: number | string;
  lastWeek?: number | string;
  lastMonth?: number | string;
  change: { pct: number | string; dir: string };
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  markets?: MarketPrice[];
}

export interface Category {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
}

const API_BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  process.env.BAZARDOR_API_URL,
]
  .filter((base): base is string => Boolean(base))
  .map((base) => base.replace(/\/$/, ""));

async function getJson<T>(path: string): Promise<T> {
  const failures: string[] = [];

  for (const base of [...new Set(API_BASES)]) {
    try {
      const response = await fetch(`${base}${path}`, { next: { revalidate: 120 } });
      if (!response.ok) {
        failures.push(`${base} returned HTTP ${response.status}`);
        continue;
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        failures.push(`${base} returned a non-JSON response`);
        continue;
      }

      return (await response.json()) as T;
    } catch (error) {
      failures.push(`${base}: ${error instanceof Error ? error.message : "request failed"}`);
    }
  }

  throw new Error(`Bazar Dor data is temporarily unavailable. ${failures.join("; ")}`);
}

export async function getProducts(): Promise<Product[]> {
  const data = await getJson<unknown>("/products");
  if (!Array.isArray(data)) throw new Error("Products API returned an invalid list.");
  return data as Product[];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const data = await getJson<unknown>(`/products?category=${encodeURIComponent(category)}`);
  if (!Array.isArray(data)) throw new Error("Category API returned an invalid list.");
  return data as Product[];
}

export async function getCategories(): Promise<Category[]> {
  const data = await getJson<unknown>("/categories");
  if (!Array.isArray(data)) throw new Error("Categories API returned an invalid list.");
  return data as Category[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const data = await getJson<unknown>(`/products/${encodeURIComponent(id)}`);
  if (Array.isArray(data)) return (data[0] as Product | undefined) ?? null;
  return data && typeof data === "object" && "id" in data ? (data as Product) : null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug || String(item.id) === slug);
  if (!product) return null;
  try {
    const detail = await getProductById(String(product.id));
    return detail ? { ...product, ...detail } : product;
  } catch {
    return product;
  }
}
