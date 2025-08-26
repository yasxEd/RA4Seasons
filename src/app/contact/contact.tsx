import React, { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { t, language } = useLanguage();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in your name, email, and inquiry.");
      return;
    }
    console.log('Booking inquiry submitted:', formData);
    alert("Thank you for your inquiry! We'll contact you soon about your stay.");
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <section className="min-h-screen bg-white relative overflow-hidden pt-0">
      {/* Hero-inspired background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 via-transparent to-stone-900/10"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(0,0,0) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(0,0,0) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-emerald-400/20 rounded-full"></div>
        <div className="absolute top-40 left-16 w-1.5 h-1.5 bg-stone-400/20 rounded-full"></div>
        <div className="absolute bottom-60 right-32 w-3 h-3 bg-emerald-300/15 rounded-full"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 w-full h-full pb-20 pt-20 md:border-[20px] border-white md:rounded-[3rem] overflow-hidden max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 text-stone-600 shadow-sm mb-4">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium tracking-wide">Booking & Inquiry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-stone-800 mb-4 leading-tight tracking-tight">
            Contact Riad Atlas 4 Seasons
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 max-w-xl mx-auto leading-relaxed font-light">
            Send us a message to inquire about availability, pricing, or any questions about your stay. We look forward to welcoming you!
          </p>
        </div>
        {/* Contact Form */}
        <div className="bg-white/90 border border-stone-200/50 rounded-2xl shadow-lg p-6 md:p-10 mx-2">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-white border border-stone-200/50 rounded-xl md:rounded-2xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-200 transition-all duration-200 text-sm md:text-base"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-white border border-stone-200/50 rounded-xl md:rounded-2xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-200 transition-all duration-200 text-sm md:text-base"
                />
              </div>
            </div>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message (dates, number of guests, questions...)"
                rows={4}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-white border border-stone-200/50 rounded-xl md:rounded-2xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-200 transition-all duration-200 resize-none text-sm md:text-base"
              ></textarea>
            </div>
            <div className="flex justify-center pt-2 md:pt-4">
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 md:gap-3 group text-sm md:text-base w-full sm:w-auto justify-center"
              >
                <span>Send Inquiry</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
