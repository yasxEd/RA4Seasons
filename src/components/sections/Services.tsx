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

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-16 sm:py-24 bg-emerald-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 sm:w-24 h-px bg-emerald-600 mx-auto mb-6 sm:mb-8" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 mb-6 sm:mb-8 tracking-tight">
            Our Services
          </h1>
          <p className="text-base sm:text-xl text-stone-600 mb-6 sm:mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            Discover the comfort, cuisine, and care that make Riad Atlas 4 Seasons unique.
          </p>
        </div>
      </section>

      {/* Room Amenities Section - Flowing List Design */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 sm:mb-16">
            <div className="w-12 sm:w-16 h-px bg-emerald-600 mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-stone-900 mb-4 sm:mb-6">Room Amenities</h2>
            <p className="text-base sm:text-lg text-stone-600 font-light mb-8 sm:mb-12 max-w-2xl mx-auto">
              Enjoy a restful stay with modern comforts and authentic Moroccan touches.
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {roomAmenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-2 sm:gap-3 bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 px-4 sm:px-6 py-2 sm:py-4 rounded-full transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="transform transition-transform group-hover:scale-110">
                    {lucideIconMap[amenity]}
                  </div>
                  <span className="text-stone-800 font-light text-sm sm:text-base">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Talaoul Section - Split Layout */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-stone-50/60 to-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
            {/* Left Column - Main Info */}
            <div>
              <div className="w-12 sm:w-16 h-px bg-emerald-600 mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-stone-900 mb-4 sm:mb-6">Restaurant Talaoul</h2>
              <p className="text-base sm:text-lg text-stone-600 font-light mb-6 sm:mb-8">
                Authentic Moroccan cuisine, open for breakfast, brunch, lunch, dinner, and afternoon snacks.
              </p>
              
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Ambiance</h4>
                    <p className="text-stone-600 font-light text-sm sm:text-base">Family • Traditional • Romantic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Dietary Options</h4>
                    <p className="text-stone-600 font-light text-sm sm:text-base">Halal • Vegetarian • Vegan • Dairy-free</p>
                  </div>
                </div>
              </div>

              {/* Features as flowing tags */}
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {restaurantFeatures.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-light text-stone-700 border border-emerald-100 hover:border-emerald-300 transition-colors"
                  >
                    <Utensils size={12} className="sm:hidden text-emerald-600" />
                    <Utensils size={14} className="hidden sm:inline text-emerald-600" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Location Info */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-emerald-100 mt-8 lg:mt-0">
              <h3 className="text-xl sm:text-2xl font-light text-emerald-900 mb-4 sm:mb-6">Surroundings</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 px-2 sm:px-3 py-1 rounded-full mb-2 sm:mb-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    <span className="text-xs sm:text-sm font-medium text-emerald-800">Excellent location</span>
                  </div>
                  <p className="text-stone-600 font-light text-xs sm:text-sm">
                    Guests loved walking around the neighborhood!
                  </p>
                </div>

                <div className="border-t border-emerald-100 pt-4 sm:pt-6">
                  <h4 className="font-medium text-stone-900 mb-2 sm:mb-3">Restaurants & Cafés</h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700">Restaurant Chez Momo 2</span>
                      <span className="text-emerald-700 font-light">31 km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700">Café Foum El Ghar</span>
                      <span className="text-emerald-700 font-light">46 km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700">Al Maqam</span>
                      <span className="text-emerald-700 font-light">32 km</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-emerald-100 pt-4 sm:pt-6">
                  <h4 className="font-medium text-stone-900 mb-2 sm:mb-3">Nearest Airport</h4>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-stone-700">Marrakech-Ménara</span>
                    <span className="text-emerald-700 font-light">63 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Establishment Features - Timeline Design */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <div className="w-12 sm:w-16 h-px bg-emerald-600 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-stone-900 mb-4 sm:mb-6">Facilities & Highlights</h2>
            <p className="text-base sm:text-lg text-stone-600 font-light max-w-2xl mx-auto">
              Excellent facilities for an ideal stay at Riad Atlas 4 Seasons.
            </p>
          </div>

          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-200" />
            
            <div className="space-y-6 sm:space-y-8">
              {establishmentFeatures.map((feature, idx) => (
                <div key={idx} className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-8 ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className={`w-full sm:w-auto flex-1 ${idx % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'} mb-2 sm:mb-0`}>
                    <div className="inline-flex items-center gap-2 sm:gap-3 bg-emerald-50/50 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-md">
                      {lucideIconMap[feature] || <TreeDeciduous size={20} className="text-emerald-700" />}
                      <span className="font-light text-stone-800 text-sm sm:text-base">{feature}</span>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="relative z-10">
                    <div className="w-3 sm:w-4 h-3 sm:h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg" />
                  </div>
                  
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section - Minimal Profile Cards */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-emerald-50/30 to-stone-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <div className="w-12 sm:w-16 h-px bg-emerald-600 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-stone-900 mb-4 sm:mb-6">Meet Our Staff</h2>
            <p className="text-base sm:text-lg text-stone-600 font-light max-w-2xl mx-auto">
              Our dedicated team is here to make your stay unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {staffMembers.map((person, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Users size={28} className="sm:hidden text-emerald-700" />
                    <Users size={32} className="hidden sm:inline text-emerald-700" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-px bg-emerald-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-emerald-900 mb-1 sm:mb-2">{person.name}</h3>
                <div className="text-emerald-700 font-medium mb-2 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide">{person.role}</div>
                <p className="text-stone-600 font-light leading-relaxed text-sm sm:text-base">{person.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;