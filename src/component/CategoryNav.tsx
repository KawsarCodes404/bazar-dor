"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/bazardor-api";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের বিভাগ"
      className="category-nav"
      style={{ justifyContent: "flex-start", paddingLeft: "1.5rem" }}
    >
      {categories.map((category) => {
        const href = `/category/${encodeURIComponent(category.slug)}`;
        const active = pathname === href;
        return (
          <Link
            key={category.id}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`category-nav-link ${active ? "category-nav-link-active" : ""}`}
          >
            <span aria-hidden="true">{category.icon}</span>{category.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
