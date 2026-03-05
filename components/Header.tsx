"use client"; // Add this line at the very top

import React, { useState } from "react";
import { NAV_ITEMS } from "../components/constants";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <img
              src={"/logo.png"}
              alt="ReGeno Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative group py-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 transition-colors hover:text-primary"
              >
                {item.label}
                {/* Animated Hover Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* Right Side: Search + Icons + Mobile Toggle */}
        <div className="flex flex-1 justify-end gap-3 md:gap-6 items-center">
          
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search retro hardware..."
                className="w-full bg-slate-200 dark:bg-white/5 border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary text-sm text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex gap-2 md:gap-3">
            <button className="p-2 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-primary/20 text-slate-700 dark:text-slate-200 transition-all">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-primary/20 text-slate-700 dark:text-slate-200 transition-all">
              <User className="w-5 h-5" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <div className="relative w-full md:hidden mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 dark:bg-white/5 rounded-lg pl-10 py-3 text-sm"
            />
          </div>
          
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-bold uppercase tracking-widest py-2 border-b border-slate-100 dark:border-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;