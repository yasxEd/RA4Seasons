import React, { useState } from "react";
import { Mail, ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  // Removed newsletter email state
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const { t, language } = useLanguage(); // changed from lang to language

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
      alert(t('contact_form_alert_required') || 'Please fill in all required fields.');
      return;
    }
    console.log('Form submitted:', formData);
    alert(t('contact_form_alert_success') || 'Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: "",
      email: "",
      company: "",
      message: ""
    });
    setShowContactForm(false);
  };

  return (
    <section className="py-20 bg-white">
      {/* Removed newsletter section */}
      {/* Removed top empty space */}
      {/* <div className="pb-16 md:pb-26"></div> */}

      {/* Bottom Section - mobile responsive, solid white, soft border */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
          {/* Left Side */}
          <div className="flex-1">
            {/* Badge - styled like FAQ */}
            <div className="flex items-center gap-2 md:gap-3 bg-white/80 border border-stone-200/50 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 w-fit">
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">{t("contact_badge")}</span>
            </div>
            {/* Heading - responsive text sizes */}
            <h3
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-4 md:mb-6 leading-tight
                ${language === "ar" ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" : ""}
              `}
            >
              {t("contact_title")}
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-lg">
              {t("contact_subtitle")}
            </p>
          </div>

          {/* Right Side - Contact Button - mobile responsive */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => setShowContactForm(!showContactForm)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-5 rounded-full font-semibold transition-all duration-200 flex items-center justify-between group relative"
              style={{ minWidth: 220 }}>
              <span 
                className="pr-8 w-full text-center text-lg"
                style={{ fontSize: "1rem", textAlign: "center", width: "100%" }}
              >
                {t("contact_cta")}
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2">
                <span className={`w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-200 ${showContactForm ? 'rotate-45' : ''}`}>
                  <ArrowRight className="w-5 h-5 text-emerald-700" />
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Animated Contact Form Dropdown - mobile responsive */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${showContactForm ? 'max-h-[800px] opacity-100 mt-8 md:mt-12' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="relative">
            {/* Form Container with white background - soft border, shadow */}
            <div className="relative md:border-[20px] border-white md:rounded-[3rem] overflow-hidden bg-white mx-2 md:mx-0">
              {/* Form Content - responsive padding */}
              <div className="relative z-10 p-6 md:p-8 lg:p-12">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-3 md:mb-4">{t("contact_form_title")}</h3>
                    <p className="text-base md:text-lg text-stone-600">{t("contact_form_subtitle")}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Name Input */}
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t("contact_form_name")}
                          className="w-full px-4 md:px-6 py-3 md:py-4 bg-white border border-stone-200/50 rounded-xl md:rounded-2xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-200 transition-all duration-200 text-sm md:text-base"
                        />
                      </div>
                      {/* Company Input */}
                      <div className="relative">
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder={t("contact_form_company")}
                          className="w-full px-4 md:px-6 py-3 md:py-4 bg-white border border-stone-200/50 rounded-xl md:rounded-2xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-200 transition-all duration-200 text-sm md:text-base"
                        />
                      </div>
                    </div>
                    {/* Email Input */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("contact_form_email")}
                        className="w-full px-4 md:px-6 py-3 md:py-4 bg-white border border-stone-200/50 rounded-xl md:rounded-2xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-200 transition-all duration-200 text-sm md:text-base"
                      />
                    </div>
                    {/* Message Textarea */}
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t("contact_form_message")}
                        rows={4}
                        className="w-full px-4 md:px-6 py-3 md:py-4 bg-white border border-stone-200/50 rounded-xl md:rounded-2xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-200 transition-all duration-200 resize-none text-sm md:text-base"
                      ></textarea>
                    </div>
                    {/* Submit Button - mobile responsive */}
                    <div className="flex justify-center pt-2 md:pt-4">
                      <button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 md:gap-3 group text-sm md:text-base w-full sm:w-auto justify-center"
                      >
                        <span>{t("contact_form_send")}</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </form>
                  {/* Close Button */}
                  <div className="flex justify-center mt-6 md:mt-8">
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="text-stone-400 hover:text-stone-600 text-xs md:text-sm underline transition-colors duration-200"
                    >
                      {t("contact_form_close")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;