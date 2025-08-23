import React from "react";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-white pt-16 pb-8 overflow-hidden md:rounded-b-[3rem]">
      {/* Top separation line */}
      <div className="absolute top-0 left-0 w-full h-px bg-stone-200" />

      {/* Removed gradient and overlay for solid white background */}
      {/* Geometric accents (optional, can remove if you want pure white) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none md:rounded-b-2xl">
        <div className="absolute bottom-10 left-20 w-2 h-2 bg-emerald-400/20 rounded-full"></div>
        <div className="absolute top-10 right-16 w-1.5 h-1.5 bg-stone-400/20 rounded-full"></div>
        <div className="absolute bottom-20 right-32 w-3 h-3 bg-emerald-300/15 rounded-full"></div>
      </div>

      <div className="relative z-10 px-6 md:px-8 max-w-6xl mx-auto text-center">
        {/* Location & Brand */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-6 py-2 text-stone-600 shadow-sm mb-6">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium tracking-wide">Imlil Valley, High Atlas</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-light text-stone-800 mb-2">Riad <span className="font-medium text-emerald-700">Atlas 4 Seasons</span></h2>
        <p className="text-base md:text-lg text-stone-500 mb-8">A sanctuary in the Atlas Mountains where tradition meets comfort.</p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span className="text-xl font-light text-stone-800">9.5</span>
            </div>
            <p className="text-sm text-stone-500 tracking-wide">675 Guest Rating</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-light text-stone-800 mb-1">1,740m</div>
            <p className="text-sm text-stone-500 tracking-wide">Elevation</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-light text-stone-800 mb-1">10</div>
            <p className="text-sm text-stone-500 tracking-wide">Rooms</p>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link href="/#features" className="text-stone-600 hover:text-emerald-700 transition-colors text-sm font-medium">Features</Link>
          <Link href="/#pricing" className="text-stone-600 hover:text-emerald-700 transition-colors text-sm font-medium">Pricing</Link>
          <Link href="/#contact" className="text-stone-600 hover:text-emerald-700 transition-colors text-sm font-medium">Contact</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-stone-400 mt-4">&copy; {new Date().getFullYear()} Riad Atlas 4 Seasons. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;

