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
          {/* Content - Takes 3/5 */}
          <div className={`col-span-1 lg:col-span-3 transition-all duration-1000 ${
            isVisible[SECTION_STORY] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-8">
              <div className="w-12 sm:w-16 h-0.5 bg-emerald-600 mb-6 sm:mb-8" />
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-stone-900 leading-tight mb-4 sm:mb-6">
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


      {/* Section 2: Elegant Location & Journey */}
      <section 
        ref={addToRefs}
        className="py-16 sm:py-32 bg-white relative overflow-hidden"
      >
        {/* Subtle background elements */}
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-50/40 rounded-full blur-2xl sm:blur-3xl -translate-y-24 sm:-translate-y-48 -translate-x-24 sm:-translate-x-48" />
        <div className="absolute bottom-0 right-0 w-52 sm:w-80 h-52 sm:h-80 bg-stone-100/50 rounded-full blur-xl sm:blur-2xl translate-y-16 sm:translate-y-32 translate-x-16 sm:translate-x-32" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Elegant Header */}
          <div className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
            isVisible[SECTION_MAP] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="w-12 sm:w-16 h-0.5 bg-emerald-600 mx-auto mb-6 sm:mb-8" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-stone-900 mb-4 sm:mb-6">
              Finding <span className="font-light text-emerald-700 italic">Your Way</span>
            </h2>
            <p className="text-base sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Journey through the High Atlas to reach our mountain sanctuary in Imlil village.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-start transition-all duration-1000 ${
            isVisible[SECTION_MAP] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Left: Journey Information - 2/5 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Location Details */}
              <div className="bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="p-3 bg-emerald-100 rounded-2xl">
                    <MapPin className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-stone-900">Riad Atlas 4 Seasons</h3>
                    <p className="text-stone-600">Imlil Village, High Atlas</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="flex items-center justify-between py-3 border-b border-stone-200">
                    <span className="text-stone-600">Coordinates</span>
                    <span className="font-light text-stone-900">31.14°N, 7.92°W</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-stone-200">
                    <span className="text-stone-600">Elevation</span>
                    <span className="font-light text-stone-900">1,740 meters</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-stone-600">From Marrakech</span>
                    <span className="font-light text-stone-900">64 kilometers</span>
                  </div>
                </div>
              </div>

              {/* Journey Steps */}
              <div className="space-y-6">
                <h4 className="text-2xl font-light text-stone-900 mb-6">Your Journey</h4>
                {[
                  { 
                    step: '01',
                    from: 'Marrakech Airport', 
                    distance: '80 km', 
                    time: '1h 45min',
                    description: 'Scenic drive through traditional Berber villages and olive groves'
                  },
                  { 
                    step: '02',
                    from: 'Asni Market Town', 
                    distance: '17 km', 
                    time: '30 min',
                    description: 'Winding mountain roads with breathtaking Atlas views'
                  },
                  { 
                    step: '03',
                    from: 'Imlil Village Center', 
                    distance: '400m', 
                    time: '5 min',
                    description: 'Pleasant walk through cobblestone streets to our riad'
                  }
                ].map((step, index) => (
                  <div 
                    key={index}
                    className={`bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-500 ${
                      isVisible[SECTION_MAP] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-emerald-700">{step.step}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-lg font-medium text-stone-900">{step.from}</h5>
                          <div className="text-right">
                            <div className="text-emerald-700 font-medium text-sm">{step.distance}</div>
                            <div className="text-stone-500 text-xs">{step.time}</div>
                          </div>
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Premium Map Design - 3/5 */}
            <div className={`lg:col-span-3 transition-all duration-1000 ${
              isVisible[SECTION_MAP] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="relative">
                {/* Premium Map Container */}
                <div className="bg-gradient-to-br from-white via-white to-stone-50/30 border border-stone-200/30 rounded-[2rem] p-1 shadow-[0_20px_80px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_100px_rgba(0,0,0,0.12)] transition-all duration-500">
                  <div className="relative h-[650px] rounded-[1.75rem] overflow-hidden bg-stone-50">
                    {/* Map iframe with enhanced styling */}
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3414.8969539965315!2d-7.924046!3d31.140376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA4JzI1LjQiTiA3wrA1NScxOS4yIlc!5e1!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s"
                      className="w-full h-full filter contrast-110 saturate-105"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location of Riad Atlas 4 Seasons in Imlil"
                    />
                    
                 
                    
                    

                   

                    
                  </div>
                </div>

                {/* Premium Action Buttons */}
                <div className="absolute -bottom-6 -right-6 flex gap-3">
                  {[
                    { 
                      icon: <MapPin className="w-5 h-5" />, 
                      title: '', // Removed "Get Directions"
                      description: '', // Removed "Open in Maps"
                      gradient: 'from-emerald-600 to-emerald-700',
                      hover: 'hover:from-emerald-700 hover:to-emerald-800'
                    },
                    { 
                      icon: <Users className="w-5 h-5" />, 
                      title: '', // Removed "Share Location"
                      description: '', // Removed "Send to friends"
                      gradient: 'from-stone-700 to-stone-800',
                      hover: 'hover:from-stone-800 hover:to-stone-900'
                    }
                  ].map((action, index) => (
                    <div 
                      key={index}
                      className={`group bg-gradient-to-br ${action.gradient} ${action.hover} text-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden ${
                        isVisible[SECTION_MAP] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${800 + index * 150}ms` }}
                    >
                      
                    </div>
                  ))}
                </div>

                {/* Subtle background accent */}
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-50/30 via-transparent to-stone-50/20 rounded-[3rem] -z-10 blur-xl opacity-60" />
              </div>
            </div>
          </div>

          {/* Bottom Information */}
          <div className={`text-center mt-16 sm:mt-24 transition-all duration-1000 ${
            isVisible[SECTION_MAP] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-stone-600 leading-relaxed mb-6 sm:mb-8">
                We recommend arriving during daylight hours to fully appreciate the stunning mountain scenery along your journey. 
                Our team can arrange private transportation from Marrakech upon request.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  <span>Welcome refreshments upon arrival</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4" />
                  <span>Guided mountain excursions available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Local Berber cultural experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;