import React from "react";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import { prisma } from "@/lib/db";
import { Condition, Product } from "../../types/types";

export default async function ConsolesPage() {
  const dbProducts = await prisma.product.findMany({ 
    orderBy: { createdAt: "desc" } 
  });

  const products: Product[] = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    currentPrice: p.currentPrice,
    originalPrice: p.originalPrice,
    condition: p.condition as Condition,
    imageUrl: p.imageUrl,
    statusText: p.statusText,
    statusIcon: p.statusIcon,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-display overflow-x-hidden">
      <Header />
      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-12">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Consoles
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
            Recently certified and ready for battle in your setup. Explore our selection of high-performance gaming hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
