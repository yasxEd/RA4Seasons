import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
          {/* Left Side */}
          <div className="flex-1">
            {/* Badge - styled like FAQ */}
            <div className="flex items-center gap-2 md:gap-3 bg-white border border-stone-200/50 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 w-fit text-stone-600 shadow-sm">
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Booking & Inquiry</span>
            </div>
            {/* Heading - responsive text sizes */}
            <h3
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-4 md:mb-6 leading-tight
                ${language === "ar" ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" : ""}
              `}
            >
              riad atlas 4 seasons
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-lg">
              Send us a message to inquire about availability, pricing, or any questions about your stay at riad atlas 4 seasons. We look forward to welcoming you!
            </p>
          </div>

          {/* Right Side - Contact Button */}
          <div className="flex-shrink-0">
            <Link 
              href="/contact"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-5 rounded-full font-semibold transition-all duration-200 flex items-center justify-between group relative"
              style={{ minWidth: 220 }}>
              <span 
                className="pr-8 w-full text-center text-lg"
                style={{ fontSize: "1rem", textAlign: "center", width: "100%" }}
              >
                Request Booking / Inquiry
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2">
                <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                  <ArrowRight className="w-5 h-5 text-emerald-700" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* Empty bottom space */}
      <div className="mt-16 pb-10" />
    </section>
  );
};

export default ContactSection;