// app/store/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import MobileStoreClient from "@/components/store/MobileStoreClient";

type Props = {
  searchParams: {
    search?: string;
    category?: string;
    condition?: string;
    sort?: string;
    page?: string;
  };
};

export const metadata = {
  title: "Shop Computers & Accessories | Alphatech",
  description: "Buy new and refurbished laptops, desktops, accessories and computer parts.",
};

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function avgRating(reviews: { rating: number }[]) {
  if (!reviews.length) return null;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}

export default async function StorePage({ searchParams }: Props) {
  const search = searchParams.search ?? "";
  const category = searchParams.category ?? "";
  const condition = searchParams.condition ?? "";
  const sort = searchParams.sort ?? "newest";
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const limit = 12;

  const where: any = {
    AND: [
      search ? { name: { contains: search, mode: "insensitive" } } : {},
      category ? { category: { slug: category } } : {},
      condition ? { condition } : {},
    ],
  };

  const orderBy: any =
    sort === "price-asc" ? { price: "asc" }
    : sort === "price-desc" ? { price: "desc" }
    : { createdAt: "desc" };

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where, orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } },
    }),
  ]);

  const pages = Math.ceil(total / limit);

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (condition) params.set("condition", condition);
    if (sort !== "newest") params.set("sort", sort);
    params.set("page", String(p));
    return `/store?${params.toString()}`;
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0c1a2e] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-1">THE STORE</p>
          <h1 className="font-bold text-2xl lg:text-3xl text-white">
            Shop computers & accessories
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {total} product{total !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Pass data to client component for mobile-friendly rendering */}
        <Suspense fallback={<div className="text-center py-10 text-slate-400">Loading...</div>}>
          <MobileStoreClient
            products={products.map(p => ({
              id: p.id,
              slug: p.slug,
              name: p.name,
              price: p.price,
              compareAtPrice: p.compareAtPrice,
              condition: p.condition,
              images: p.images,
              reviews: p.reviews,
              category: p.category,
            }))}
            categories={categories.map(c => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              count: c._count.products,
            }))}
            total={total}
            pages={pages}
            currentPage={page}
            currentSearch={search}
            currentCategory={category}
            currentCondition={condition}
            currentSort={sort}
          />
        </Suspense>
      </div>
    </main>
  );
}
