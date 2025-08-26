import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, Star, MapPin, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [hasBeenExpanded, setHasBeenExpanded] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Smooth scroll to a section by id
  const smoothScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // On mount, check if we're at the top of the page (Hero section)
    if (window.scrollY < 50) {
      setDashboardVisible(false);
      setHasBeenExpanded(false);
    } else {
      setDashboardVisible(true);
      setHasBeenExpanded(true);
    }

    // Intersection observer for dashboard image
    const handleDashboardIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          // Dashboard is visible in viewport, expand and remember
          setDashboardVisible(true);
          setHasBeenExpanded(true);
        } else if (entry.isIntersecting && entry.intersectionRatio < 0.3) {
          // Dashboard is partially visible, minimize only if not already expanded
          if (!hasBeenExpanded) setDashboardVisible(false);
        }
      });
    };

    const dashboardObserver = new window.IntersectionObserver(handleDashboardIntersection, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '0px 0px -10% 0px'
    });

    if (dashboardRef.current) {
      dashboardObserver.observe(dashboardRef.current);
    }

    // Listen for scroll to expand dashboard if scrolled past
    const handleScroll = () => {
      if (window.scrollY > (dashboardRef.current?.offsetTop ?? 0) - 200) {
        setDashboardVisible(true);
        setHasBeenExpanded(true);
      }
      // Minimize only if at top of Hero section
      if (window.scrollY < 50) {
        setDashboardVisible(false);
        setHasBeenExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      dashboardObserver.disconnect();
    };
  }, [hasBeenExpanded]);

  return (
    <section ref={heroRef} className="min-h-screen bg-white relative overflow-hidden pt-0">
      {/* Main Hero Content with border and contained background */}
      <div className="relative z-40 w-full h-full pb-32 pt-20 sm:pb-40 sm:pt-32 md:border-[20px] border-white md:rounded-[3rem] overflow-hidden">
        {/* Clean gradient background with nature colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100 md:rounded-2xl"></div>
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 via-transparent to-stone-900/10 md:rounded-2xl"></div>
        {/* Minimal geometric accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none md:rounded-2xl">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `
              linear-gradient(to right, rgb(0,0,0) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(0,0,0) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}></div>
          {/* Floating elements - very subtle */}
          <div className="absolute top-20 right-20 w-2 h-2 bg-emerald-400/20 rounded-full"></div>
          <div className="absolute top-40 left-16 w-1.5 h-1.5 bg-stone-400/20 rounded-full"></div>
          <div className="absolute bottom-60 right-32 w-3 h-3 bg-emerald-300/15 rounded-full"></div>
        </div>
        {/* Content */}
        <div className="relative z-60 px-4 sm:px-6 md:px-8 max-w-full sm:max-w-6xl mx-auto">
          {/* Location indicator */}
          <div className="text-center -mt-12 sm:-mt-20 mb-0">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-xs sm:text-sm font-medium tracking-wide">Imlil Valley, High Atlas</span>
            </div>
          </div>
          {/* Main Headline */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 mt-6 sm:mt-8 md:mt-10">
            <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-light text-stone-800 mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight">
              Riad <span className="font-medium text-emerald-700">Atlas 4 Seasons</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-600 max-w-xs sm:max-w-2xl mx-auto leading-relaxed font-light">
              A sanctuary in the Atlas Mountains where traditional Berber architecture meets modern comfort
            </p>
          </div>
          {/* Stats - Clean minimal cards */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-xl sm:text-2xl font-light text-stone-800">9.5</span>
                <img
                  src="/assets/img/Booking-Logo.png"
                  alt="Booking.com"
                  className="h-4 sm:h-5 w-auto"
                />
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                
                                <span className="text-xs sm:text-sm text-stone-800 font-medium">675</span>

                <span className="text-xs sm:text-sm text-stone-500">reviews</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-stone-800 mb-1">1,740m</div>
              <p className="text-xs sm:text-sm text-stone-500 tracking-wide">Elevation</p>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-stone-800 mb-1">8</div>
              <p className="text-xs sm:text-sm text-stone-500 tracking-wide">Rooms</p>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Buttons - Positioned absolutely above the mountain image */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-44 sm:bottom-48 md:bottom-40 lg:bottom-36 z-[60] flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
        <Link
          href="/#pricing"
          className="group bg-emerald-700 hover:bg-emerald-800 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium flex items-center justify-center gap-2 sm:gap-3 hover:shadow-lg hover:shadow-emerald-900/25 transition-all duration-300 text-sm sm:text-base w-full max-w-[200px] mx-auto sm:w-auto sm:max-w-none"
        >
          <span>Reserve Your Stay</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <button className="group flex items-center justify-center gap-2 sm:gap-3 text-stone-700 hover:text-emerald-700 transition-colors text-sm sm:text-base bg-white/60 hover:bg-white/80 backdrop-blur-md border border-stone-200/50 px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium w-full max-w-[200px] mx-auto sm:w-auto sm:max-w-none">
          <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Experience Tour</span>
        </button>
      </div>
      {/* Mountain Image */}
      <div
        ref={dashboardRef}
        className="hidden sm:block sm:absolute sm:left-0 sm:-bottom-32 sm:w-full sm:z-50"
      >
        <img
          src="/assets/img/toubk.png"
          alt="Atlas Mountains from Riad Imlil"
          className="w-full h-auto object-cover rounded-none shadow-none bg-transparent"
        />
      </div>
      {/* Enhanced Scroll Indicator with artisan styling */}
      <div className="block md:hidden z-[60]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          onClick={() => smoothScroll("features")}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center group-hover:border-white transition-colors bg-white/50 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="w-1 h-3 bg-white rounded-full mt-2 group-hover:bg-[#804F2A] transition-colors"
              />
            </div>
            <ChevronDown className="w-5 h-5 text-white mt-2 group-hover:text-white transition-colors" />
            <span className="text-xs text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {t('hero_scroll')}
            </span>
          </motion.div>
        </motion.div>
      </div>
      {/* Desktop scroll indicator unchanged */}
      <div className="hidden md:block z-[60]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          onClick={() => smoothScroll("features")}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center group-hover:border-white transition-colors bg-white/50 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="w-1 h-3 bg-white rounded-full mt-2 group-hover:bg-[#804F2A] transition-colors"
              />
            </div>
            <ChevronDown className="w-5 h-5 text-white mt-2 group-hover:text-white transition-colors" />
            <span className="text-xs text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {t('hero_scroll')}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;