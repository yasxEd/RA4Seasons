'use client';

import React, { useState } from "react";
import Navigation, { NAVBAR_HEIGHT } from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { GalleryHorizontalEnd } from "lucide-react";
import Image from 'next/image';

const images = [
  "/assets/img/gallery/1.jpg",
  "/assets/img/gallery/2.jpg",
  "/assets/img/gallery/3.jpg",
  "/assets/img/gallery/4.jpg",
  "/assets/img/gallery/5.jpg",
  "/assets/img/gallery/6.jpg",
  "/assets/img/gallery/7.jpg",
  "/assets/img/gallery/8.jpg",
  "/assets/img/gallery/9.jpg",
  "/assets/img/gallery/mtb.jpeg",
  "/assets/img/gallery/riad-atlas-4-seasons (1).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (3).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (4).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (5).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (6).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (9).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (11).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (12).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (15).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons.jpg",
];

export default function GalleryPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Only update activeIdx, do not swap order
  const handleClick = (idx: number) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
  };

  return (
    <main className="min-h-screen bg-white text-black" style={{ paddingTop: NAVBAR_HEIGHT }}>
      <Navigation />
      {/* Title Section - left aligned */}
      <section className="max-w-[1200px] mx-auto px-4 pt-8 pb-2 text-left">
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm">
            <GalleryHorizontalEnd size={18} strokeWidth={1.5} className="text-emerald-600" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">Gallery</span>
          </div>
        </div>
        <h2
          id="visual-journey"
          className="text-5xl font-extralight tracking-wide text-black mb-8 tracking-wider text-left"
        >
          Visual Journey
        </h2>
        <p className="text-xl text-neutral-700 leading-relaxed font-light max-w-3xl text-left">
          Experience the soul of our riad through these moments that capture the essence of Moroccan beauty and tranquility
        </p>
      </section>
      <section className="flex justify-center py-8">
        <div
          className="
            grid gap-2
            max-w-[1200px]
            w-full
            grid-cols-2 sm:grid-cols-5
            auto-rows-[120px] sm:auto-rows-[200px]
          "
        >
          {images.map((src, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={src}
                className={`item relative cursor-pointer transition-all duration-300
                  ${isActive ? "col-span-2 row-span-2 z-10" : ""}
                `}
                data-active={isActive ? "true" : undefined}
                onClick={() => handleClick(i)}
                style={{
                  gridColumn: isActive ? "span 2" : undefined,
                  gridRow: isActive ? "span 2" : undefined,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={isActive ? "(min-width: 640px) 60vw, 100vw" : "200px"}
                  className="object-cover rounded-lg"
                  draggable={false}
                  loading={isActive ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="/assets/img/blur-placeholder.jpg"
                  style={{ position: "absolute" }}
                />
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}

