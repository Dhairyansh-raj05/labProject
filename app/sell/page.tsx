import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SellPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-display overflow-x-hidden">
      <Header />
      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-24 flex flex-col items-center justify-center text-center gap-6">
        <div className="p-4 rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-6xl">payments</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
          Sell Your Gear
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">
          Get the best value for your retro consoles and games. Our automated appraisal system is launching soon!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="px-8 py-3 bg-slate-200 dark:bg-white/10 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-white/20 transition-all">
            Contact Support
          </button>
          <a 
            href="/"
            className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all"
          >
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
