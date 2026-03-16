import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { prisma } from "@/lib/db";

export default async function GamesPage() {
  const dbGames = await prisma.game.findMany({ 
    orderBy: { createdAt: "desc" } 
  });

  const games = dbGames.map((g) => ({
    id: g.id,
    title: g.title,
    price: `₹${g.price.toLocaleString("en-IN")}`,
    image: g.image,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-display overflow-x-hidden">
      <Header />
      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-12">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Collector&apos;s Vault
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
            Rare finds and legendary titles for your collection. Discover hidden gems from gaming history.
          </p>
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
      </main>
      <Footer />
    </div>
  );
}
