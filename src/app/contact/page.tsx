'use client';

import React, { useState } from "react";
import { ArrowRight, MessageCircle, MapPin, Star, Phone, Mail, Clock } from "lucide-react";
import Navbar from "@/components/sections/Navigation";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "", // default guest is empty
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    message: string;
  }

  interface InputChangeEvent {
    target: {
      name: keyof ContactFormData;
      value: string;
    };
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value
    }));
  };

  interface SubmitEvent {
    preventDefault: () => void;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | SubmitEvent): Promise<void> => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    
    console.log('Booking inquiry submitted:', formData);
    alert("Thank you for your inquiry! We'll contact you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "", // reset guest to empty
      message: ""
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Add top empty space */}
        <div className="h-10 sm:h-16"></div>
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Left Side */}
            <div className="flex-1">
              {/* Badge - styled like FAQ */}
              <div className="flex items-center gap-2 md:gap-3 bg-white border border-stone-200/50 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 w-fit text-stone-600 shadow-sm">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Booking & Inquiry</span>
              </div>
              {/* Heading - responsive text sizes */}
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-2 md:mb-3 leading-tight`}
              >
                Riad atlas 4 seasons
              </h3>
              {/* Add bottom empty space below heading */}
              <div className="h-6 sm:h-10"></div>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-medium text-stone-900 mb-2">Send us a message</h2>
                  <p className="text-stone-600">We&#39;ll get back to you within 24 hours</p>
                </div>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        inputMode="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="text"
                        inputMode="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      inputMode="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 transition-all duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Stay Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Check-in Date
                      </label>
                      <input
                        type="text"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 transition-all duration-200"
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Check-out Date
                      </label>
                      <input
                        type="text"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 transition-all duration-200"
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Guests
                      </label>
                      <input
                        type="text"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 transition-all duration-200"
                        placeholder="Number of guests"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 transition-all duration-200 resize-none"
                      placeholder="Tell us about your stay preferences, special requests, or any questions you have..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 group"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      {!isSubmitting && (
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5">
              <div className="space-y-8">
                
                {/* Riad Info Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium text-stone-600">Imlil Valley, High Atlas</span>
                  </div>
                  
                  <h3 className="text-2xl font-light text-stone-900 mb-2">
                    Riad <span className="font-medium text-emerald-700">Atlas 4 Seasons</span>
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    A sanctuary in the Atlas Mountains where traditional Berber hospitality meets modern comfort.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                        <span className="text-2xl font-light text-stone-900">9.5</span>
                      </div>
                      <p className="text-sm text-stone-500">Guest Rating</p>
                      <p className="text-xs text-stone-400">675 reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light text-stone-900 mb-2">1,740m</div>
                      <p className="text-sm text-stone-500">Elevation</p>
                      <p className="text-xs text-stone-400">Above sea level</p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-gradient-to-br from-emerald-50 to-stone-50 rounded-2xl border border-emerald-100 p-8">
                  <h4 className="text-lg font-medium text-stone-900 mb-4">Planning Your Stay</h4>
                  <div className="space-y-3">
                    <a href="#rooms" className="block text-stone-600 hover:text-emerald-700 transition-colors text-sm">
                      → View Our Rooms & Suites
                    </a>
                    <a href="#experiences" className="block text-stone-600 hover:text-emerald-700 transition-colors text-sm">
                      → Mountain Experiences
                    </a>
                    <a href="#dining" className="block text-stone-600 hover:text-emerald-700 transition-colors text-sm">
                      → Traditional Dining
                    </a>
                    <a href="#location" className="block text-stone-600 hover:text-emerald-700 transition-colors text-sm">
                      → Location & Transport
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;