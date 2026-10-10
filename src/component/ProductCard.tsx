import Link from "next/link";
import type { Product } from "@/lib/bazardor-api";
import { formatBanglaNumber, formatUnit, numericValue, productHref } from "@/lib/format";

export function ChangeBadge({ product }: { product: Product }) {
  const amount = numericValue(product.change.pct);
  const direction = product.change.dir === "up" ? "up" : product.change.dir === "down" ? "down" : amount > 0 ? "up" : amount < 0 ? "down" : "flat";

  return (
    <span className={`change-badge change-${direction}`}>
      {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"} {formatBanglaNumber(Math.abs(amount))}%
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={productHref(product)} className="product-card group">
      <div className="flex min-w-0 items-start gap-3">
        <span className="product-card-image" aria-hidden="true">{product.image}</span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-ink group-hover:text-brand">{product.nameBn}</h3>
          <p className="mt-0.5 text-xs text-muted">প্রতি {formatUnit(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="mt-0.5 text-lg font-bold text-ink">{formatBanglaNumber(product.today, 0)} টাকা</p>
        </div>
        <ChangeBadge product={product} />
      </div>
    </Link>
  );
}
