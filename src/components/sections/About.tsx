import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Mountain, Heart, Users, Coffee, Camera, ArrowDown } from 'lucide-react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({});
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    // Reset refs to avoid duplicate elements after removing a section
    sectionsRef.current = sectionsRef.current.filter(Boolean);
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsVisible(prev => ({
              ...prev,
              [index]: entry.isIntersecting
            }));
          },
          { threshold: 0.3 }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el) {
      // Find first empty slot or push
      const idx = sectionsRef.current.findIndex(ref => ref === null);
      if (idx !== -1) {
        sectionsRef.current[idx] = el;
      } else if (!sectionsRef.current.includes(el)) {
        sectionsRef.current.push(el);
      }
    }
  };

  // Assign indices for each section
  const SECTION_STORY = 0;
  const SECTION_MAP = 1;

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Our Story - Asymmetric Split Layout */}
      <section 
        ref={addToRefs}
        className="min-h-screen flex flex-col lg:flex-row items-center bg-white relative overflow-hidden"
      >
        {/* Subtle background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/30 rounded-full blur-3xl -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-100/40 rounded-full blur-2xl translate-y-32 -translate-x-32" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-center relative">

          <div className={`col-span-1 lg:col-span-3 transition-all duration-1000 ${
            isVisible[SECTION_STORY] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Location indicator badge above title */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm">
                <Users size={18} strokeWidth={1.5} className="text-emerald-600" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">Our Story</span>
              </div>
            </div>
            <div className="mb-8">
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extralight text-stone-900 leading-tight mb-4 sm:mb-6">
                A Vision Born in the{' '}
                <span className="font-light text-emerald-700 italic">Atlas Mountains</span>
              </h1>
              <p className="text-base sm:text-xl text-stone-600 leading-relaxed max-w-full sm:max-w-2xl">
                Nestled in the breathtaking village of Imlil, our riad stands as a testament 
                to the timeless beauty of Berber architecture and the warmth of Moroccan hospitality.
              </p>
            </div>

            {/* Elegant paragraph layout */}
            <div className="space-y-4 sm:space-y-6 text-stone-600 leading-relaxed mb-8 sm:mb-12 max-w-full sm:max-w-2xl">
              <p>
                Every corner tells a story of careful craftsmanship, from our hand-carved 
                wooden ceilings to the panoramic terraces that frame the majestic peaks of Toubkal.
              </p>
              <p>
                Our location at the gateway to Toubkal National Park makes us more than just 
                accommodation - we&apos;re your base camp for adventure, your refuge for rest.
              </p>
            </div>

            {/* Minimalist stats row */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
              {[
                { icon: Star, value: "9.5", label: "Guest Rating" },
                { icon: Heart, value: "675", label: "Happy Guests" },
                { icon: Mountain, value: "1,740m", label: "Elevation" }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className={`transition-all duration-700 ${
                    isVisible[SECTION_STORY] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <stat.icon className="w-5 h-5 text-emerald-600" />
                    <span className="text-2xl sm:text-3xl font-extralight text-stone-900">{stat.value}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image - Takes 2/5 */}
          <div className={`col-span-1 lg:col-span-2 transition-all duration-1000 ${
            isVisible[SECTION_STORY] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="relative flex justify-center">
              <div className="aspect-[4/3] sm:aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-stone-100 w-full max-w-xs sm:max-w-none mx-auto">
                <img 
                  src="/assets/img/riad1.jpg" 
                  alt="Riad Atlas 4 Seasons"
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;