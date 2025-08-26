import React from "react";
import Link from "next/link";
import {
  Wifi,
  Mountain,
  Bath,
  Snowflake,
  Coffee,
  Bed,
  Shield,
  Ban,
  Users,
  Car,
  Utensils,
  Flame,
  Bike,
  ChefHat,
  Globe,
  Calendar,
  Footprints,
  Puzzle,
  Baby,
  Shirt,
  Briefcase,
  Dumbbell,
  Hand,
  ArrowRight,
  Mail,
  TreeDeciduous,
  Heart,
  MapPin,
} from "lucide-react";

// Lucide icon mapping for amenities/features
const lucideIconMap: { [key: string]: React.ReactNode } = {
  "Free WiFi": <Wifi size={20} className="text-emerald-700" />,
  "Mountain View": <Mountain size={20} className="text-emerald-700" />,
  "Private Bathroom": <Bath size={20} className="text-emerald-700" />,
  "Air Conditioning": <Snowflake size={20} className="text-emerald-700" />,
  "Breakfast Included": <Coffee size={20} className="text-emerald-700" />,
  "Balcony or Terrace": <Bed size={20} className="text-emerald-700" />,
  "Room Service": <Utensils size={20} className="text-emerald-700" />,
  "Daily Housekeeping": <Shield size={20} className="text-emerald-700" />,
  "Comfortable Bedding": <Bed size={20} className="text-emerald-700" />,
  "Safe Deposit Box": <Shield size={20} className="text-emerald-700" />,
  "Non-smoking Rooms": <Ban size={20} className="text-emerald-700" />,
  "Family Rooms": <Users size={20} className="text-emerald-700" />,
  "Tea/Coffee Facilities": <Coffee size={20} className="text-emerald-700" />,
  "Airport Shuttle": <Car size={20} className="text-emerald-700" />,
  "Free Parking": <Car size={20} className="text-emerald-700" />,
  "Restaurant": <Utensils size={20} className="text-emerald-700" />,
  "Picnic Area": <TreeDeciduous size={20} className="text-emerald-700" />,
  "Terrace & Garden": <TreeDeciduous size={20} className="text-emerald-700" />,
  "Outdoor Fireplace": <Flame size={20} className="text-emerald-700" />,
  "BBQ Facilities": <Flame size={20} className="text-emerald-700" />,
  "Bicycle Rental": <Bike size={20} className="text-emerald-700" />,
  "Cooking Classes": <ChefHat size={20} className="text-emerald-700" />,
  "Cultural Tours": <Globe size={20} className="text-emerald-700" />,
  "Theme Dinners": <Calendar size={20} className="text-emerald-700" />,
  "Walking & Cycling Tours": <Footprints size={20} className="text-emerald-700" />,
  "Horse Riding": <Bike size={20} className="text-emerald-700" />,
  "Hiking": <Mountain size={20} className="text-emerald-700" />,
  "Games & Puzzles": <Puzzle size={20} className="text-emerald-700" />,
  "Babysitting (extra)": <Baby size={20} className="text-emerald-700" />,
  "Laundry & Ironing (extra)": <Shirt size={20} className="text-emerald-700" />,
  "Meeting Facilities (extra)": <Briefcase size={20} className="text-emerald-700" />,
  "Spa & Wellness (extra)": <Dumbbell size={20} className="text-emerald-700" />,
  "Yoga Classes": <Dumbbell size={20} className="text-emerald-700" />,
  "Massage (extra)": <Hand size={20} className="text-emerald-700" />,
};

const roomAmenities = [
  "Free WiFi",
  "Mountain View",
  "Private Bathroom",
  "Air Conditioning",
  "Breakfast Included",
  "Balcony or Terrace",
  "Room Service",
  "Daily Housekeeping",
  "Comfortable Bedding",
  "Safe Deposit Box",
  "Non-smoking Rooms",
  "Family Rooms",
  "Tea/Coffee Facilities",
  "Airport Shuttle",
  "Free Parking",
];

const restaurantFeatures = [
  "Traditional Moroccan Cuisine",
  "Fresh Local Ingredients",
  "Vegetarian & Vegan Options",
  "Panoramic Dining Terrace",
  "Breakfast, Lunch & Dinner",
  "Tagines, Couscous, Mint Tea",
  "Special Dietary Requests",
  "Cozy Indoor Seating",
  "Halal Options",
  "Dairy-Free Options",
  "Buffet with Children's Options",
  "Family, Traditional & Romantic Ambiance",
];

const establishmentFeatures = [
  "Non-smoking Rooms",
  "Airport Shuttle",
  "Free WiFi",
  "Free Parking",
  "Restaurant",
  "Room Service",
  "Family Rooms",
  "Tea/Coffee Facilities in All Rooms",
  "Fabulous Breakfast",
  "Private Bathroom",
  "Picnic Area",
  "Terrace & Garden",
  "Mountain View",
  "Outdoor Fireplace",
  "BBQ Facilities",
  "Bicycle Rental",
  "Cooking Classes",
  "Cultural Tours",
  "Theme Dinners",
  "Walking & Cycling Tours",
  "Horse Riding",
  "Hiking",
  "Games & Puzzles",
  "Babysitting (extra)",
  "Daily Housekeeping",
  "Laundry & Ironing (extra)",
  "Meeting Facilities (extra)",
  "Spa & Wellness (extra)",
  "Yoga Classes",
  "Massage (extra)",
  "Languages: Arabic, Berber, English, French",
];

const staffMembers = [
  {
    name: "Brahim",
    role: "Host & Owner",
    description: "Welcoming guests with decades of hospitality experience and local mountain knowledge.",
  },
  {
    name: "Bouchra",
    role: "Guest Relations",
    description: "Ensures every guest feels at home, fluent in several languages, and attentive to every detail.",
  },
  {
    name: "Our Team",
    role: "Local Artisans & Staff",
    description: "From skilled cooks to mountain guides, every team member shares the beauty of our homeland.",
  },
];

const SECTION_MAP = "map"; // Add this line to define SECTION_MAP

import { useState, useEffect } from "react";

const Services = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Show all sections after mount (can be customized for scroll/animation)
    setIsVisible({ [SECTION_MAP]: true });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Restaurant Talaoul Section - Immersive White Hero Design */}
      <section className="relative py-20 sm:py-32 bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 w-96 h-96 bg-stone-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-300 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Content Side */}
            <div className="relative z-10">
{/* Location indicator badge above title */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm">
                <Utensils size={18} strokeWidth={1.5} className="text-emerald-600" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">Our Food</span>
              </div>
            </div>
                          
              <h2 className="text-5xl font-extralight tracking-wide mb-8 leading-tight text-stone-900">
                Restaurant <span className="text-emerald-600 italic">Talaoul</span>
              </h2>
              
              <p className="text-xl sm:text-2xl font-light mb-12 leading-relaxed text-stone-600 max-w-lg">
                Authentic Moroccan cuisine, open for breakfast, brunch, lunch, dinner, and afternoon snacks
              </p>

              {/* Restaurant Features in elegant grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-emerald-50 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-200/50">
                      <Coffee size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900">All Day Dining</h3>
                      <p className="text-sm text-stone-600">Breakfast • Lunch • Dinner</p>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-emerald-50 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-200/50">
                      <Utensils size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900">Ambiance</h3>
                      <p className="text-sm text-stone-600">Family • Traditional • Romantic</p>
                    </div>
                  </div>
                </div>
                
                {/* Dietary Options card now third */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-emerald-50 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-200/50">
                      <Globe size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900">Dietary Options</h3>
                      <p className="text-sm text-stone-600">Halal • Vegetarian • Vegan</p>
                    </div>
                  </div>
                </div>
                
                {/* Specialties card now fourth */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-emerald-50 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-200/50">
                      <ChefHat size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900">Specialties</h3>
                      <p className="text-sm text-stone-600">Tagines • Couscous • Mint Tea</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Restaurant Features as elegant flowing tags */}
              

              {/* Location Information - Inline */}
              <div className="space-y-6 pt-8 border-t border-emerald-100/50">
                <div>
                  <h4 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                    <Utensils size={16} className="text-emerald-600" />
                    Nearby Restaurants & Cafés
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700">Restaurant Chez Momo 2</span>
                      <span className="text-emerald-600 font-medium">31 km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700">Café Foum El Ghar</span>
                      <span className="text-emerald-600 font-medium">46 km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700">Al Maqam</span>
                      <span className="text-emerald-600 font-medium">32 km</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                    <Car size={16} className="text-emerald-600" />
                    Airport Access
                  </h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-700">Marrakech-Ménara Airport</span>
                    <span className="text-emerald-600 font-medium">63 km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              {/* Floating Image Container */}
              <div className="relative mt-20">
                {/* ↑ Added mt-16 to move image more bottom */}
                <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100/40 via-stone-100/30 to-emerald-50/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src="/assets/img/rest.jpg"
                      alt="Restaurant Talaoul"
                      className="object-cover w-full h-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Staff Section - Minimal Profile Cards */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-emerald-50/30 to-stone-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-stone-900 mb-4 sm:mb-6">Meet Our Staff</h2>
            <p className="text-base sm:text-lg text-stone-600 font-light max-w-2xl mx-auto">
              Our dedicated team is here to make your stay unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {staffMembers.map((person, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative mb-4 sm:mb-6">
                  
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-emerald-900 mb-1 sm:mb-2">{person.name}</h3>
                <div className="text-emerald-700 font-medium mb-2 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide">{person.role}</div>
                <p className="text-stone-600 font-light leading-relaxed text-sm sm:text-base">{person.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Elegant Location & Journey */}
      <section 
        className="py-16 sm:py-24 bg-white relative overflow-hidden" // reduced sm:py-32 to sm:py-24
      >
        {/* Subtle background elements */}
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-50/40 rounded-full blur-2xl sm:blur-3xl -translate-y-24 sm:-translate-y-48 -translate-x-24 sm:-translate-x-48" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Elegant Header */}
          <div className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
            isVisible[SECTION_MAP] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Location indicator badge above title */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm">
                <MapPin size={18} strokeWidth={1.5} className="text-emerald-600" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">Location</span>
              </div>
            </div>
                                       
            <h2 className="text-5xl font-extralight tracking-wide text-stone-900 mb-4 sm:mb-6">
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
            {/* Right: Premium Map Design - 3/5 */}
            <div className={`lg:col-span-5 transition-all duration-1000 ${
              isVisible[SECTION_MAP] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="relative mt-10 flex flex-col items-center">
                {/* Minimalistic Map Container */}
                <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-white">
                  <iframe 
                    src="https://www.google.com/maps?&q=Riad+Atlas+4+Seasons+Imlil&output=embed"
                    className="w-full h-[400px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location of Riad Atlas 4 Seasons in Imlil"
                  />
                </div>
              </div>

              {/* Journey Cards moved below the map */}
              <div className="mt-12 space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
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
                      className={`bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-500 flex-1 ${
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
            </div>
            {/* Removed left journey cards column */}
            {/* <div className="lg:col-span-2 space-y-8"> ... </div> */}
          </div>

          {/* Bottom Information */}
          <div className={`text-center mt-12 sm:mt-16 transition-all duration-1000 ${
            isVisible[SECTION_MAP] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}> {/* reduced mt-16 sm:mt-24 to mt-12 sm:mt-16 */}
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

export default Services;