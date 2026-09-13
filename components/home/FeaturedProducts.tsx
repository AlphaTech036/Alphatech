// components/home/FeaturedProducts.tsx
"use client";

import Link from "next/link";
import { ChevronRight, ShoppingCart, Star, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/store/cart";

type Product = {
  id: string; slug: string; name: string; price: number;
  compareAtPrice: number | null; condition: string;
  images: string[]; reviews: { rating: number }[];
};

type Props = { products: Product[] };

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function avgRating(reviews: { rating: number }[]) {
  if (!reviews.length) return null;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const rating = avgRating(product.reviews);

  const conditionColor = product.condition === "NEW"
    ? "bg-green-100 text-green-700"
    : product.condition === "REFURBISHED"
    ? "bg-blue-100 text-blue-700"
    : "bg-orange-100 text-orange-700";

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id: product.id, slug: product.slug, name: product.name,
      price: product.price, image: product.images[0] ?? "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <Link href={`/product/${product.slug}`} className="relative block">
        <div className="h-44 bg-gradient-to-br from-slate-100 to-sky-50 overflow-hidden relative">
          {product.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-slate-300" />
            </div>
          )}
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${conditionColor}`}>
            {product.condition}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              SALE
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-slate-900 text-sm leading-snug hover:text-sky-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {rating && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-500">{rating} ({product.reviews.length})</span>
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            <p className="font-bold text-sky-600">{formatPrice(product.price)}</p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="text-xs text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
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

export default function FeaturedProducts({ products }: Props) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sky-500 text-xs font-bold tracking-widest uppercase mb-1">THE STORE</p>
            <h2 className="font-bold text-2xl lg:text-3xl text-slate-900">Featured products</h2>
          </div>
          <Link href="/store" className="hidden sm:flex items-center gap-1 text-sky-500 font-semibold text-sm hover:text-sky-700">
            Shop all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href="/store" className="text-sky-500 font-semibold text-sm">
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
