import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Users, MapPin, Mountain, Coffee, Eye, Wifi, Bath, Bed, ArrowRight, School } from "lucide-react";

// Define types for better type safety
interface Room {
  name: string;
  images: string[];
  rating: number;
  reviews: number;
  details: string;
  capacity: string;
  beds: string;
  amenities: string[];
  price: string;
  originalPrice: string;
  size: string;
  description: string;
}

interface Experience {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Helper to resolve image paths
const getImageSrc = (src: string) => {
  return `${process.env.PUBLIC_URL || ""}${src}`;
};

// Define room amenities array
const roomAmenities: string[] = [
  "Mountain view",
  "WiFi",
  "Breakfast Included",
  "Balcony",
  "Terrace",
  "Panoramic view",
  "Hammam",
  "Yoga",
  "Traditional crafts"
];

// Map amenity names to Lucide icons
const lucideIconMap: { [key: string]: React.ReactNode } = {
  "Mountain view": <Mountain className="w-6 h-6 text-emerald-600" />,
  "WiFi": <Wifi className="w-6 h-6 text-emerald-600" />,
  "Breakfast Included": <Coffee className="w-6 h-6 text-emerald-600" />,
  "Balcony": <MapPin className="w-6 h-6 text-emerald-600" />,
  "Terrace": <MapPin className="w-6 h-6 text-emerald-600" />,
  "Panoramic view": <Eye className="w-6 h-6 text-emerald-600" />,
  "Hammam": <Bath className="w-6 h-6 text-emerald-600" />,
  "Yoga": <Star className="w-6 h-6 text-emerald-600" />,
  "Traditional crafts": <Users className="w-6 h-6 text-emerald-600" />,
};

// Define experiences array
const experiences: Experience[] = [
  {
    title: "Mountain Trekking",
    description: "Explore ancient Berber trails through the majestic Atlas Mountains with experienced local guides.",
    icon: <Mountain className="w-8 h-8 text-neutral-600" />
  },
  {
    title: "Cultural Immersion",
    description: "Experience authentic Moroccan traditions, crafts, and cuisine in nearby Berber villages.",
    icon: <Coffee className="w-8 h-8 text-neutral-600" />
  },
  {
    title: "Wellness Retreat",
    description: "Rejuvenate your body and soul with traditional hammam treatments and mountain yoga sessions.",
    icon: <Star className="w-8 h-8 text-neutral-600" />
  }
];

const defaultRooms: Room[] = [
  {
    name: "Double or Twin Room",
    images: [
      "/assets/img/Double or Twin Room/322452796.jpg",
      "/assets/img/Double or Twin Room/322453151.jpg",
      "/assets/img/Double or Twin Room/ecf447e2dc0671292426555caf829393.jpeg",
    ],
    price: "", 
    originalPrice: "$120",
    details: "20 m² • 215 ft²",
    beds: "1 queen bed",
    capacity: "2 guests",
    amenities: ["Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.8,
    reviews: 127,
    size: "20 m²",
    description: "A cozy room with a queen bed, mountain views, and modern amenities. Perfect for couples or friends."
  },
  {
    name: "Quadruple Room with Balcony",
    images: [
      "/assets/img/Quadruple Room with Balcony/406812739.jpg",
      "/assets/img/Quadruple Room with Balcony/406815624.jpg",
      "/assets/img/Quadruple Room with Balcony/405211130.jpg",
      "/assets/img/Quadruple Room with Balcony/406812481.jpg",
    ],
    price: "", 
    originalPrice: "$180",
    details: "35 m² • 377 ft²",
    beds: "4 single beds or 2 queen beds",
    capacity: "4 guests",
    amenities: ["Balcony", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.9,
    reviews: 89,
    size: "35 m²",
    description: "Spacious room with a private balcony, mountain views, and flexible bedding options for families or groups."
  },
  {
    name: "Double or Twin Room with Balcony",
    images: [
      "/assets/img/Double or Twin Room with Balcony/208185855.jpg",
      "/assets/img/Double or Twin Room with Balcony/326350657.jpg",
      "/assets/img/Double or Twin Room with Balcony/326351053.jpg",
      "/assets/img/Double or Twin Room with Balcony/view.jpg",
    ],
    price: "", 
    originalPrice: "$140",
    details: "25 m² • 269 ft²",
    beds: "1 queen bed or 2 single beds",
    capacity: "2 guests",
    amenities: ["Balcony", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.7,
    reviews: 156,
    size: "25 m²",
    description: "Enjoy a comfortable stay with a private balcony, mountain views, and flexible bedding options for couples or friends."
  },
  {
    name: "Suite with Terrace",
    images: [
      "/assets/img/Suite with Terrace/406817443.jpg",
      "/assets/img/Suite with Terrace/406818119.jpg",
      "/assets/img/Suite with Terrace/406818386.jpg",
      "/assets/img/Suite with Terrace/406818950.jpg",
      "/assets/img/Suite with Terrace/326352599.jpg",
    ],
    price: "", 
    originalPrice: "$250",
    details: "55 m² • 592 ft²",
    beds: "2 sofa beds and 1 single bed",
    capacity: "5 guests",
    amenities: ["Terrace", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.9,
    reviews: 73,
    size: "55 m²",
    description: "Luxurious suite with a spacious terrace, stunning mountain views, and comfortable bedding for families or groups."
  },
  {
    name: "Panoramic Triple Room",
    images: [
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/4dffea56322e51a641690e669941ad4c.jpeg",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/5fd1da25c3cbad7b8272a9f6695b9922.webp",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/399a644d21e81bf5e683d02d961208b8.jpeg",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/b1a16832f3d6e3a9c065f317b7e222e1.webp",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/d6253a547be3ff4f7dd291c93b29adc6.jpeg",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/ecf447e2dc0671292426555caf829393.webp",
    ],
    price: "", 
    originalPrice: "$160",
    details: "25 m² • 269 ft²",
    beds: "3 single beds",
    capacity: "3 guests",
    amenities: ["Panoramic view", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.8,
    reviews: 94,
    size: "25 m²",
    description: "Enjoy breathtaking panoramic mountain views in this spacious triple room, perfect for friends or small families."
  },
  {
    name: "Deluxe Double Room with Balcony",
    images: [
      "/assets/img/Deluxe Double Room with Balcony/406810306.jpg",
      "/assets/img/Deluxe Double Room with Balcony/406810671.jpg",
      "/assets/img/Deluxe Double Room with Balcony/406811189.jpg",
      "/assets/img/Deluxe Double Room with Balcony/406811374.jpg",
    ],
    price: "",  
    originalPrice: "$150",
    details: "20 m² • 215 ft²",
    beds: "1 queen bed or 2 single beds",
    capacity: "2 guests",
    amenities: ["Balcony", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.6,
    reviews: 203,
    size: "20 m²",
    description: "Deluxe double room with a private balcony, mountain views, and flexible bedding options for a comfortable stay."
  },
];

const Room = () => {
  // Enhanced state management
  const [slideIndexes, setSlideIndexes] = useState<number[]>(defaultRooms.map(() => 0));
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Carousel state for rooms
  const [roomIndex, setRoomIndex] = useState(0);

  // Ref for hero section
  const heroRef = React.useRef<HTMLElement>(null);

  // Auto-advance slideshow for images
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndexes(prev => prev.map((idx, roomIdx) => 
        (idx + 1) % defaultRooms[roomIdx].images.length
      ));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manual slideshow navigation for images
  const showSlide = (roomIdx: number, slideIdx: number) => {
    setSlideIndexes(prev => {
      const updated = [...prev];
      updated[roomIdx] = slideIdx;
      return updated;
    });
  };

  // Carousel navigation for rooms
  const prevRoom = () => setRoomIndex(i => (i === 0 ? defaultRooms.length - 1 : i - 1));
  const nextRoom = () => setRoomIndex(i => (i === defaultRooms.length - 1 ? 0 : i + 1));
  const goToRoom = (idx: number) => setRoomIndex(idx);

  return (
    <>
      {/* Premium Room Cards Section as Carousel */}
      <section className="py-32 bg-gradient-to-b from-white to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full opacity-30 blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-white rounded-full opacity-20 blur-3xl" />
        </div>

        <section ref={heroRef} className="min-h-screen bg-white relative overflow-hidden pt-0">
        {/* Main Hero Content with border and contained background */}
        <div className="relative z-40 w-full h-full md:border-[20px] border-white md:rounded-[3rem] overflow-hidden">
          {/* Set solid white background */}
          <div className="absolute inset-0 bg-white md:rounded-2xl"></div>
          {/* Remove gradient overlays */}
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
          
          {/* Enhanced Hero Section */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                <img
                  src={getImageSrc("/assets/img/views.jpg")}
                  alt="Atlas Mountain View"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Remove gradient overlays */}
            </div>

            <div className="relative z-10 text-center text-white px-6 max-w-5xl">
              <div className="animate-fadeInUp">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8 opacity-80" />
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight mb-8 tracking-widest leading-tight">
                  Atlas Mountain
                  <span className="block text-4xl md:text-6xl lg:text-7xl mt-2 font-thin opacity-90">Retreat</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-light opacity-90 mb-16 max-w-3xl mx-auto leading-relaxed">
                  Where ancient Berber traditions meet modern luxury in the heart of Morocco&apos;s majestic mountains
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  {/* Removed Explore Rooms button */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

        <div className="max-w-6xl mx-auto px-6 relative z-10 mt-24">
          
          {/* "Our Rooms" heading and separation line above carousel */}
          <div className="text-center mb-20">
            {/* Location indicator badge above title */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm">
                <Bed size={18} strokeWidth={1.5} className="text-emerald-600" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">Our Rooms</span>
              </div>
            </div>
            <h2 className="text-5xl font-extralight tracking-wide text-neutral-800 mb-4">
              Discover Your Perfect Stay
            </h2>
           
          </div>

          {/* Carousel Container */}
          <div className="relative flex flex-col items-center">
            {/* Carousel arrows */}
            <button
              className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-20 hover:bg-neutral-100 transition"
              onClick={prevRoom}
              aria-label="Previous Room"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            <button
              className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-20 hover:bg-neutral-100 transition"
              onClick={nextRoom}
              aria-label="Next Room"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>

            {/* Fixed size card container - CRITICAL CHANGES HERE */}
            <div
              className="w-full max-w-4xl mx-auto transition-all duration-700"
              onMouseEnter={() => setHoveredRoom(roomIndex)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              <div 
                className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 transform hover:scale-105 h-[500px]" // FIXED HEIGHT
                style={{ 
                  boxShadow: hoveredRoom === roomIndex 
                    ? '0 40px 80px -20px rgba(0, 0, 0, 0.25)' 
                    : '0 20px 40px -10px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="grid lg:grid-cols-5 h-full"> {/* FULL HEIGHT GRID */}
                  {/* Left Content - 2 columns - FIXED DIMENSIONS */}
                  <div className="lg:col-span-2 p-6 flex flex-col h-full"> {/* FULL HEIGHT WITH FLEX COLUMN */}
                    {/* Header - FIXED SPACE */}
                    <div className="flex-none">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-px bg-neutral-300" />
                          <span className="text-xs tracking-wider text-neutral-500 uppercase">
                            Room {String(roomIndex + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-full">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-medium">{defaultRooms[roomIndex].rating}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-light text-neutral-800 mb-3 leading-tight">
                        {defaultRooms[roomIndex].name}
                      </h3>
                    </div>

                    {/* Scrollable content area - FLEXIBLE SPACE */}
                    <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                      {/* Description - FIXED HEIGHT WITH OVERFLOW */}
                      <div className="h-16 mb-4"> {/* FIXED HEIGHT */}
                        <p className="text-neutral-600 leading-relaxed line-clamp-3 overflow-hidden text-sm">
                          {defaultRooms[roomIndex].description}
                        </p>
                      </div>

                      {/* Room specs - FIXED LAYOUT */}
                      <div className="grid grid-cols-2 gap-3 mb-4 flex-none">
                        <div>
                          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Size</p>
                          <p className="text-neutral-700 font-medium text-xs">{defaultRooms[roomIndex].size}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Capacity</p>
                          <p className="text-neutral-700 font-medium text-xs">{defaultRooms[roomIndex].capacity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Bed Type</p>
                          <p className="text-neutral-700 font-medium text-xs">{defaultRooms[roomIndex].beds}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Reviews</p>
                          <p className="text-neutral-700 font-medium text-xs">{defaultRooms[roomIndex].reviews}</p>
                        </div>
                      </div>

                      {/* Amenities - FIXED HEIGHT WITH SCROLLABLE CONTENT */}
                      <div className="flex-1 min-h-0">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Amenities</p>
                        <div className="flex flex-wrap gap-1 h-14 overflow-y-auto"> {/* FIXED HEIGHT WITH SCROLL */}
                          {defaultRooms[roomIndex].amenities.map((amenity, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-neutral-50 text-neutral-600 rounded-full text-xs border border-neutral-200 h-fit"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer - FIXED SPACE */}
                    <div className="flex-none mt-6 pt-6 border-t border-neutral-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-2xl font-light text-neutral-800">{defaultRooms[roomIndex].price}</span>
                            <span className="text-lg text-neutral-400 line-through">{defaultRooms[roomIndex].originalPrice}</span>
                          </div>
                          <p className="text-xs text-neutral-500">per night</p>
                        </div>
                        <button className="group bg-neutral-800 text-white px-6 py-3 rounded-full hover:bg-neutral-900 transition-all duration-300 flex items-center gap-2">
                          <span className="font-medium text-sm">Reserve</span>
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-2.5 h-2.5 text-neutral-800" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Image Gallery - 3 columns - FIXED DIMENSIONS */}
                  <div className="lg:col-span-3 relative h-full"> {/* FULL HEIGHT */}
                    {/* Image slideshow */}
                    <div className="absolute inset-0 overflow-hidden rounded-r-3xl">
                      {defaultRooms[roomIndex].images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className={`absolute inset-0 transition-all duration-1000 ${
                            slideIndexes[roomIndex] === imgIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${defaultRooms[roomIndex].name} ${imgIdx + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ))}
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Image navigation dots */}
                    <div className="absolute top-8 right-8 z-20">
                      <div className="flex space-x-2">
                        {defaultRooms[roomIndex].images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => showSlide(roomIndex, dotIdx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              slideIndexes[roomIndex] === dotIdx 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* View indicator */}
                    <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white z-20">
                      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">{defaultRooms[roomIndex].details}</span>
                      </div>
                      <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm">{slideIndexes[roomIndex] + 1}/{defaultRooms[roomIndex].images.length}</span>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div 
                      className={`absolute inset-0 bg-neutral-900/10 transition-opacity duration-300 ${
                        hoveredRoom === roomIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel dots for rooms */}
            <div className="flex justify-center mt-8 gap-3">
              {defaultRooms.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    roomIndex === idx ? 'bg-neutral-800 scale-125' : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  onClick={() => goToRoom(idx)}
                  aria-label={`Go to room ${idx + 1}`}
                />
              ))}
            </div>
          </div>
           {/* Clean Amenities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Left-aligned header */}
          <div className="mb-16">
            <div className="w-16 h-px bg-emerald-600 mb-6" />
            <h2 className="text-4xl font-light text-stone-900 mb-4">Amenities</h2>
            <p className="text-stone-600 font-light max-w-lg">
              Everything you need for the perfect mountain retreat
            </p>
          </div>

          {/* Amenities in one row, no wrap, no scroll */}
          <div className="flex flex-nowrap gap-4 items-center">
            {roomAmenities.map((amenity, idx) => (
              <div
                key={idx}
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ 
                  animationDelay: `${idx * 150}ms` 
                }}
              >
                <div className="bg-stone-50 hover:bg-emerald-50 border border-stone-100 hover:border-emerald-200 rounded-2xl p-4 h-full transition-all duration-300 group-hover:shadow-lg">
                  {/* Icon */}
                  <div className="mb-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {lucideIconMap[amenity]}
                    </div>
                  </div>
                  {/* Text */}
                  <h3 className="text-stone-800 font-medium text-sm leading-tight">
                    {amenity}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          {/* Slight text below amenities */}
          <div className="mt-3 text-sm text-neutral-400 text-right">
            +45 more
          </div>
        </div>
      </section>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Room;