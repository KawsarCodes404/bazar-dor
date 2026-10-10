export function numericValue(value: number | string): number {
  const ascii = String(value)
    .replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))
    .replaceAll(",", "")
    .trim();
  const parsed = Number(ascii);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatBanglaNumber(value: number | string, maximumFractionDigits = 1): string {
  return new Intl.NumberFormat("bn-BD", { maximumFractionDigits }).format(numericValue(value));
}

export function formatUnit(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    l: "লিটার",
    piece: "পিস",
    pcs: "পিস",
    dozen: "ডজন",
  };
  return units[unit.toLowerCase()] ?? unit;
}

export function productHref(product: { id: string | number; slug?: string }): string {
  return `/product/${encodeURIComponent(product.slug || String(product.id))}`;
}
