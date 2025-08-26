import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQSection = () => {
  // Track open state for each individual item by index
  const [openItems, setOpenItems] = useState(new Set()); // All closed by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index); // Close if open
      } else {
        newSet.add(index); // Open if closed
      }
      return newSet;
    });
  };

  const faqData = [
    {
      question: "What type of breakfast does Riad Atlas 4 seasons serve?",
      answer: "Guests who have stayed at Riad Atlas 4 seasons have given a very good rating to its breakfast: 9.2. The property serves the following types of breakfast: Vegetarian, Halal, Takeaway breakfast."
    },
    {
      question: "What types of accommodation can I book at Riad Atlas 4 seasons?",
      answer: "Riad Atlas 4 seasons offers the following accommodation options: Twin/Double bed, Triple, Family, Suite, Quadruple, Double."
    },
    {
      question: "What are the check-in and check-out times at Riad Atlas 4 seasons?",
      answer: "Check-in at Riad Atlas 4 seasons is from 00:00 and check-out is until 11:00."
    },
    {
      question: "What is the price of a stay at Riad Atlas 4 seasons?",
      answer: "The prices set by Riad Atlas 4 seasons may vary depending on your stay (e.g. the dates you select, hotel conditions, etc.). Enter your dates to see prices."
    },
    {
      question: "Does Riad Atlas 4 seasons have a restaurant on site?",
      answer: "Riad Atlas 4 seasons offers 1 restaurant: Restaurant Talaoul."
    },
    {
      question: "What activities does Riad Atlas 4 seasons offer?",
      answer: "Riad Atlas 4 seasons offers the following activities and services (additional charges may apply): Sauna, Massages, Hammam, Cycling, Hiking, Skiing, Games room, Beauty services, Horse riding, Couples massage, Bike tours, Spa/relaxation area, Bicycle rental, Yoga classes, Walking tours, Spa, Local culture tour or class, Hand massage, Themed dinners, Back massage, Cooking classes, Head massage, Body treatments, Body massage, Spa/wellness packages, Steam bath, Neck massage."
    },
    {
      question: "Is Riad Atlas 4 seasons close to the center (Imlil)?",
      answer: "Riad Atlas 4 seasons is located 400 m from the center (Imlil)."
    },
    {
      question: "Is Riad Atlas 4 seasons popular with families?",
      answer: "Riad Atlas 4 seasons is highly rated for family stays."
    }
  ];

  return (
    <section className="min-h-screen bg-white relative overflow-hidden py-12">
      {/* Main Content with border and contained background like Hero */}
      <div className="relative z-40 w-full h-full md:border-[20px] border-white md:rounded-[3rem] overflow-hidden bg-white">

        {/* Content */}
        <div className="relative z-60 px-6 md:px-8 max-w-6xl mx-auto py-10 md:py-16">
          {/* Header matching Hero style */}
          <div className="text-center mb-16 md:mb-20">
            {/* Location indicator */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-6 py-2 text-stone-600 shadow-sm mb-8">
              <Plus className="w-4 h-4 text-emerald-600" /> {/* changed from MapPin to Plus */}
              <span className="text-sm font-medium tracking-wide">Frequently Asked Questions</span>
            </div>
            
            <h2 className="text-5xl font-extralight tracking-wide text-stone-800 mb-6 md:mb-8 leading-[0.9] tracking-tight">
              Everything You <span className="font-medium text-emerald-700">Need to Know</span>
            </h2>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
              Find answers to the most common questions about your stay, amenities, and experiences at our riad
            </p>
          </div>

          {/* FAQ Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/10 hover:bg-white/80 group"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 md:p-8 text-left flex items-start justify-between group"
                  aria-expanded={openItems.has(index)}
                >
                  <span className="text-sm md:text-base font-light text-stone-800 pr-4 leading-relaxed">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-stone-100/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-100/80 transition-all duration-300 mt-1">
                    {openItems.has(index) ? (
                      <Minus className="w-4 h-4 md:w-5 md:h-5 text-emerald-700" />
                    ) : (
                      <Plus className="w-4 h-4 md:w-5 md:h-5 text-emerald-700" />
                    )}
                  </div>
                </button>
                {openItems.has(index) && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="pt-2 border-t border-stone-200/30">
                      <p className="text-xs md:text-sm text-stone-600 leading-relaxed mt-4 font-light">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;