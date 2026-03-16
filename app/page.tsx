import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import TrustSection from "../components/TrustSection";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import { prisma } from "@/lib/db";
import { Condition, Product } from "../types/types";
import Link from "next/link";

export default async function App() {
  const [dbProducts, dbGames] = await Promise.all([
    prisma.product.findMany({ 
      orderBy: { createdAt: "desc" },
      take: 4 // Limit items on home page
    }),
    prisma.game.findMany({ 
      orderBy: { createdAt: "desc" },
      take: 6 // Limit items on home page
    }),
  ]);

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

  const games = dbGames.map((g) => ({
    id: g.id,
    title: g.title,
    price: `₹${g.price.toLocaleString("en-IN")}`,
    image: g.image,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-display overflow-x-hidden">
      <Header />

      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-16 lg:gap-24">
        <Hero />

        <section id="consoles" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                Featured Gear
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                High-performance consoles, tested and ready.
              </p>
            </div>
            <Link
              className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all group"
              href="/consoles"
            >
              View all consoles
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="games" className="scroll-mt-32 pb-10">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                Collector&apos;s Vault
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                Iconic titles and rare physical releases.
              </p>
            </div>
            <Link
              className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all group"
              href="/games"
            >
              Explore games
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="group relative aspect-[3/4] bg-slate-100 dark:bg-white/5 rounded-xl overflow-hidden cursor-pointer border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all"
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-xs line-clamp-2">
                    {game.title}
                  </p>
                  <p className="text-primary text-sm font-black mt-1">
                    {game.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <TrustSection />
      <Footer />
      <ChatBot />
    </div>
  );
}
