// components/store/MobileStoreClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, SlidersHorizontal, X, ShoppingCart,
  Star, ChevronLeft, ChevronRight, Check
} from "lucide-react";
import { useCart } from "@/lib/store/cart";

type Product = {
  id: string; slug: string; name: string; price: number;
  compareAtPrice: number | null; condition: string;
  images: string[]; reviews: { rating: number }[];
  category: { name: string; slug: string };
};

type Category = { id: string; name: string; slug: string; count: number };

type Props = {
  products: Product[];
  categories: Category[];
  total: number; pages: number; currentPage: number;
  currentSearch: string; currentCategory: string;
  currentCondition: string; currentSort: string;
};

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function avgRating(reviews: { rating: number }[]) {
  if (!reviews.length) return null;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}

const CONDITIONS = [
  { value: "", label: "All" },
  { value: "NEW", label: "New" },
  { value: "REFURBISHED", label: "Refurbished" },
  { value: "CUSTOM", label: "Custom Build" },
];

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most reviewed" },
];

function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const rating = avgRating(product.reviews);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id: product.id, slug: product.slug, name: product.name,
      price: product.price, image: product.images[0] ?? "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const conditionColor = product.condition === "NEW"
    ? "bg-green-100 text-green-700"
    : product.condition === "REFURBISHED"
    ? "bg-blue-100 text-blue-700"
    : "bg-orange-100 text-orange-700";

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative block">
        <div className="relative h-40 sm:h-44 bg-gradient-to-br from-slate-100 to-sky-50 overflow-hidden">
          {product.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-slate-300" />
            </div>
          )}
        </div>
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${conditionColor}`}>
          {product.condition}
        </span>
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-slate-900 leading-snug hover:text-sky-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {rating && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-500">{rating} ({product.reviews.length})</span>
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div>
            <p className="font-bold text-sky-600 text-sm">{formatPrice(product.price)}</p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="text-xs text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all shrink-0 ${
              added ? "bg-green-500" : "bg-sky-500 hover:bg-sky-600"
            }`}
            aria-label="Add to cart"
          >
            {added
              ? <Check className="h-4 w-4 text-white" />
              : <ShoppingCart className="h-4 w-4 text-white" />
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MobileStoreClient({
  products, categories, total, pages, currentPage,
  currentSearch, currentCategory, currentCondition, currentSort,
}: Props) {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState(currentSearch);

  function buildUrl(params: Record<string, string>) {
    const p = new URLSearchParams();
    if (params.search ?? currentSearch) p.set("search", params.search ?? currentSearch);
    if (params.category ?? currentCategory) p.set("category", params.category ?? currentCategory);
    if (params.condition ?? currentCondition) p.set("condition", params.condition ?? currentCondition);
    if ((params.sort ?? currentSort) !== "newest") p.set("sort", params.sort ?? currentSort);
    p.delete("page");
    return `/store?${p.toString()}`;
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildUrl({ search }));
  }

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    if (currentCategory) params.set("category", currentCategory);
    if (currentCondition) params.set("condition", currentCondition);
    if (currentSort !== "newest") params.set("sort", currentSort);
    params.set("page", String(p));
    return `/store?${params.toString()}`;
  }

  return (
    <div>
      {/* Search + Filter bar */}
      <div className="flex gap-2 mb-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 bg-white"
          />
        </form>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-sky-400 transition-colors shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Active filters */}
      {(currentCategory || currentCondition) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {currentCategory && (
            <Link href={buildUrl({ category: "" })}
              className="flex items-center gap-1 bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1.5 rounded-full">
              {categories.find(c => c.slug === currentCategory)?.name ?? currentCategory}
              <X className="h-3 w-3" />
            </Link>
          )}
          {currentCondition && (
            <Link href={buildUrl({ condition: "" })}
              className="flex items-center gap-1 bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1.5 rounded-full">
              {currentCondition}
              <X className="h-3 w-3" />
            </Link>
          )}
        </div>
      )}

      {/* Desktop layout: sidebar + grid */}
      <div className="lg:flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-20 space-y-5">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Category</p>
              <ul className="space-y-1">
                <li>
                  <Link href={buildUrl({ category: "" })}
                    className={`block text-sm px-2 py-1.5 rounded-lg transition-colors ${
                      !currentCategory ? "bg-sky-500 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                    }`}>
                    All products
                  </Link>
                </li>
                {categories.map(c => (
                  <li key={c.id}>
                    <Link href={buildUrl({ category: c.slug })}
                      className={`flex justify-between items-center text-sm px-2 py-1.5 rounded-lg transition-colors ${
                        currentCategory === c.slug ? "bg-sky-500 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                      }`}>
                      <span>{c.name}</span>
                      <span className={`text-xs ${currentCategory === c.slug ? "text-sky-200" : "text-slate-400"}`}>{c.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Condition</p>
              <ul className="space-y-1">
                {CONDITIONS.map(c => (
                  <li key={c.value}>
                    <Link href={buildUrl({ condition: c.value })}
                      className={`block text-sm px-2 py-1.5 rounded-lg transition-colors ${
                        currentCondition === c.value ? "bg-sky-500 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                      }`}>
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Sort by</p>
              <select
                value={currentSort}
                onChange={(e) => router.push(buildUrl({ sort: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
              >
                {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="font-bold text-lg text-slate-700">No products found</p>
              <p className="text-slate-500 text-sm mt-2">Try a different search or filter.</p>
              <Link href="/store" className="inline-block mt-4 bg-sky-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
                Clear filters
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>

              {pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                  {currentPage > 1 && (
                    <Link href={pageUrl(currentPage - 1)}
                      className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white bg-white text-slate-600">
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  )}
                  {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                    <Link key={p} href={pageUrl(p)}
                      className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === currentPage ? "bg-sky-500 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                      }`}>
                      {p}
                    </Link>
                  ))}
                  {currentPage < pages && (
                    <Link href={pageUrl(currentPage + 1)}
                      className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white bg-white text-slate-600">
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <p className="font-bold text-slate-900">Filters</p>
              <button onClick={() => setFilterOpen(false)}>
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">Category</p>
                <ul className="space-y-1">
                  <li>
                    <Link href={buildUrl({ category: "" })} onClick={() => setFilterOpen(false)}
                      className={`block text-sm px-3 py-2 rounded-lg ${!currentCategory ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                      All products
                    </Link>
                  </li>
                  {categories.map(c => (
                    <li key={c.id}>
                      <Link href={buildUrl({ category: c.slug })} onClick={() => setFilterOpen(false)}
                        className={`flex justify-between text-sm px-3 py-2 rounded-lg ${currentCategory === c.slug ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                        <span>{c.name}</span>
                        <span className="text-xs opacity-60">{c.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">Condition</p>
                <ul className="space-y-1">
                  {CONDITIONS.map(c => (
                    <li key={c.value}>
                      <Link href={buildUrl({ condition: c.value })} onClick={() => setFilterOpen(false)}
                        className={`block text-sm px-3 py-2 rounded-lg ${currentCondition === c.value ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">Sort by</p>
                <div className="space-y-1">
                  {SORTS.map(s => (
                    <Link key={s.value} href={buildUrl({ sort: s.value })} onClick={() => setFilterOpen(false)}
                      className={`block text-sm px-3 py-2 rounded-lg ${currentSort === s.value ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
