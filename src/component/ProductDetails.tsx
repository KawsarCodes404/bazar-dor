import Link from "next/link";
import type { Product } from "@/lib/bazardor-api";
import { formatBanglaNumber, formatUnit, numericValue } from "@/lib/format";
import { ChangeBadge } from "./ProductCard";

export default function ProductDetails({ product }: { product: Product }) {
  const markets = product.markets ?? [];
  const today = numericValue(product.today);
  const changePercent = numericValue(product.change.pct);
  const yesterday = product.yesterday !== undefined
    ? numericValue(product.yesterday)
    : product.change.dir === "up" && changePercent > -100
      ? today / (1 + changePercent / 100)
      : product.change.dir === "down" && changePercent < 100
        ? today / (1 - changePercent / 100)
        : today;
  const difference = Math.round(Math.abs(today - yesterday));
  const trend = today > yesterday ? "বেড়েছে" : today < yesterday ? "কমেছে" : "অপরিবর্তিত রয়েছে";
  const minimum = markets.length ? Math.min(...markets.map((market) => numericValue(market.min))) : numericValue(product.today);
  const maximum = markets.length ? Math.max(...markets.map((market) => numericValue(market.max))) : numericValue(product.today);
  const average = markets.length
    ? markets.reduce((sum, market) => sum + numericValue(market.average ?? (numericValue(market.min) + numericValue(market.max)) / 2), 0) / markets.length
    : numericValue(product.today);

  return (
    <section className="page-section">
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted">
        <Link href="/">হোম</Link><span aria-hidden="true">›</span>
        {product.category && <><Link href={`/category/${encodeURIComponent(product.category)}`}>{product.categoryNameBn ?? "বিভাগ"}</Link><span aria-hidden="true">›</span></>}
        <span className="text-ink">{product.nameBn}</span>
      </nav>

      <div className="detail-card">
        <div className="flex min-w-0 items-center gap-4">
          <span className="detail-product-image" aria-hidden="true">{product.image}</span>
          <div className="detail-product-copy">
            <h1 className="detail-product-title">{product.nameBn}</h1>
            <p className="mt-1 text-sm text-muted">প্রতি {formatUnit(product.unit)} · {product.categoryNameBn ?? "নিত্যপ্রয়োজনীয় পণ্য"}</p>
            <p className="detail-product-change">গতকালের তুলনায় আজ দাম {trend}{difference > 0 ? ` · ${formatBanglaNumber(difference, 0)} টাকা` : ""}</p>
          </div>
        </div>
        <div className="detail-price-tile">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-2xl font-bold text-ink">{formatBanglaNumber(product.today, 0)}</p>
          <p className="text-xs text-muted">টাকা / {formatUnit(product.unit)}</p>
          <div className="mt-2 flex justify-center"><ChangeBadge product={product} /></div>
        </div>
      </div>

      <section className="mt-4 rounded-2xl border border-line bg-surface p-4 sm:p-5" aria-labelledby="summary-title">
        <h2 id="summary-title" className="section-heading text-base">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PriceSummary label="সর্বনিম্ন দাম" value={minimum} tone="text-brand" />
          <PriceSummary label="সর্বোচ্চ দাম" value={maximum} tone="text-up" />
          <PriceSummary label="গড় দাম" value={average} tone="text-ink" />
        </div>

        <h2 className="section-heading mt-9 text-base pt-5">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length > 0 ? (
          <div className="market-table-wrap mt-3">
            <table className="market-table">
              <thead><tr><th>বাজার</th><th>বিভাগ</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th><th>গড়</th></tr></thead>
              <tbody>{markets.map((market, index) => {
                const marketAverage = market.average ?? (numericValue(market.min) + numericValue(market.max)) / 2;
                return <tr key={`${market.market}-${index}`}>
                  <td>{market.market}</td><td>{market.division}</td>
                  <td>{formatBanglaNumber(market.min, 0)} টাকা</td>
                  <td>{formatBanglaNumber(market.max, 0)} টাকা</td>
                  <td>{formatBanglaNumber(marketAverage)} টাকা</td>
                </tr>;
              })}</tbody>
            </table>
          </div>
        ) : <p className="empty-state mt-3">এই পণ্যের বাজারভিত্তিক তথ্য এখন পাওয়া যাচ্ছে না।</p>}
      </section>
    </section>
  );
}

function PriceSummary({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 text-xl font-bold ${tone}`}>{formatBanglaNumber(value, 0)} টাকা</p>
      <p className="mt-1 text-xs text-muted">বাজারের তথ্য অনুযায়ী</p>
    </div>
  );
}
