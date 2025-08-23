import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, CheckCircle, ExternalLink, Sparkles, Globe, Shield, Clock } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const IntegrationsSection = () => {
  const [visible, setVisible] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef<number>(0);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0, // Trigger as soon as any part is visible
      rootMargin: '300px 0px 0px 0px' // Start animation 300px before the element enters viewport
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate active integration
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIntegration((prev) => (prev + 1) % integrations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const integrations = [
    {
      name: language === 'ar' ? t("integrations_stripe_name") : "Stripe",
      category: t("integrations_category_payment"),
      description: t("integrations_stripe_desc"),
      color: "from-[#635BFF] to-[#4338CA]",
      icon: (
        <Image
          src="/assets/icons/stripe.png"
          alt="Stripe"
          width={40}
          height={40}
          style={{ width: 40, height: 40 }}
        />
      ),
      features: [t("integrations_stripe_feature1"), t("integrations_stripe_feature2"), t("integrations_stripe_feature3")],
      bgPattern: "radial-gradient(circle at 20% 80%, rgba(99, 91, 255, 0.1) 0%, transparent 50%)"
    },
    {
      name: language === 'ar' ? t("integrations_paypal_name") : "PayPal",
      category: t("integrations_category_gateway"),
      description: t("integrations_paypal_desc"),
      color: "from-[#0070BA] to-[#003087]",
      icon: (
        <Image
          src="/assets/icons/paypal.png"
          alt="PayPal"
          width={40}
          height={40}
          style={{ width: 40, height: 40 }}
        />
      ),
      features: [t("integrations_paypal_feature1"), t("integrations_paypal_feature2"), t("integrations_paypal_feature3")],
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(0, 112, 186, 0.1) 0%, transparent 50%)"
    },
    {
      name: language === 'ar' ? t("integrations_drive_name") : "Google Drive",
      category: t("integrations_category_storage"),
      description: t("integrations_drive_desc"),
      color: "from-[#4285F4] to-[#34A853]",
      icon: (
        <Image
          src="/assets/icons/drive.png"
          alt="Google Drive"
          width={40}
          height={40}
          style={{ width: 40, height: 40 }}
        />
      ),
      features: [t("integrations_drive_feature1"), t("integrations_drive_feature2"), t("integrations_drive_feature3")],
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)"
    },
    {
      name: language === 'ar' ? t("integrations_dropbox_name") : "Dropbox",
      category: t("integrations_category_sharing"),
      description: t("integrations_dropbox_desc"),
      color: "from-[#0061FF] to-[#0047B3]",
      icon: (
        <Image
          src="/assets/icons/dropbox.png"
          alt="Dropbox"
          width={40}
          height={40}
          style={{ width: 40, height: 40 }}
        />
      ),
      features: [t("integrations_dropbox_feature1"), t("integrations_dropbox_feature2"), t("integrations_dropbox_feature3")],
      bgPattern: "radial-gradient(circle at 30% 70%, rgba(0, 97, 255, 0.1) 0%, transparent 50%)"
    },
    {
      name: language === 'ar' ? t("integrations_slack_name") : "Slack",
      category: t("integrations_category_communication"),
      description: t("integrations_slack_desc"),
      color: "from-[#4A154B] to-[#36C5F0]",
      icon: (
        <Image
          src="/assets/icons/slack.png"
          alt="Slack"
          width={40}
          height={40}
          style={{ width: 40, height: 40 }}
        />
      ),
      features: [t("integrations_slack_feature1"), t("integrations_slack_feature2"), t("integrations_slack_feature3")],
      bgPattern: "radial-gradient(circle at 90% 10%, rgba(74, 21, 75, 0.1) 0%, transparent 50%)"
    }
  ];

  const benefits = [
    { icon: Globe, title: t("integrations_benefit1_title"), description: t("integrations_benefit1_desc"), color: "from-emerald-400 to-cyan-500" },
    { icon: Shield, title: t("integrations_benefit2_title"), description: t("integrations_benefit2_desc"), color: "from-violet-400 to-purple-500" },
    { icon: Clock, title: t("integrations_benefit3_title"), description: t("integrations_benefit3_desc"), color: "from-orange-400 to-red-500" },
    { icon: Zap, title: t("integrations_benefit4_title"), description: t("integrations_benefit4_desc"), color: "from-blue-400 to-indigo-500" }
  ];

  // Error handler
  const handleConsoleError = (err: Error) => {
    setError(err);
    console.error("IntegrationsSection error:", err);
  };

  // Wrap main content in error boundary
  try {
    if (error) {
      return (
        <section className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-2">{error.message}</p>
            <button
              className="bg-[#0357cb] text-white px-6 py-3 rounded-full font-semibold"
              onClick={() => setError(null)}
            >
              Retry
            </button>
          </div>
        </section>
      );
    }

    return (
      <section 
        ref={sectionRef}
        className="min-h-screen bg-white relative overflow-hidden py-12 sm:py-24"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {/* Badge */}
            <div className="flex items-center justify-center gap-3 bg-[#0357cb]/10 backdrop-blur-md border border-[#0357cb]/20 px-3 sm:px-4 py-2 rounded-full w-fit mx-auto mb-6 sm:mb-8">
              <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-[#0357cb]" />
              <span className="text-[#0357cb] font-semibold text-xs sm:text-sm">{t("integrations_badge")}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4 sm:mb-6 px-4">
              {t("integrations_title")}
            </h2>
            
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              {t("integrations_subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center px-4">
              <button className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center group relative shadow-lg">
                <span className="pr-3">{t("integrations_see_all")}</span>
                <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button className="w-full sm:w-auto bg-white/80 backdrop-blur-md text-gray-700 px-6 sm:px-8 py-4 sm:py-5 rounded-full font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                {t("integrations_view_docs")}
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Integration Grid - Left Side */}
            <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            } lg:col-span-1`}>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 lg:px-0">{t("integrations_popular")}</h3>
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 border-2 mx-2 lg:mx-0 ${
                    activeIntegration === index 
                      ? 'bg-white shadow-xl border-[#0357cb] scale-105' 
                      : 'bg-white/60 hover:bg-white/80 border-transparent hover:shadow-lg hover:scale-102'
                  }`}
                  onClick={() => setActiveIntegration(index)}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s ease-out`,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {integration.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{integration.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">{integration.category}</div>
                    </div>
                    {activeIntegration === index && (
                      <div className="w-2 h-2 bg-[#0357cb] rounded-full animate-pulse flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Integration Display + Benefits - Right Side */}
            <div className={`lg:col-span-2 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              <div className={`bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden min-h-[360px] sm:min-h-[420px] h-auto sm:h-[440px] w-full mx-2 lg:mx-0`}>
                {/* Dynamic background pattern */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{ background: integrations[activeIntegration].bgPattern }}
                ></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8">
                    <div className="w-full">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-shrink-0">
                          {integrations[activeIntegration].icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">{integrations[activeIntegration].name}</h3>
                          <p className="text-gray-600 font-medium text-sm sm:text-base">{integrations[activeIntegration].category}</p>
                        </div>
                        {/* Connected badge - moved to right on mobile */}
                        <div className="flex items-center gap-2 bg-green-100 px-2 sm:px-3 py-1 sm:py-2 rounded-full flex-shrink-0">
                          <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-600" />
                          <span className="text-green-700 font-medium text-xs sm:text-sm">
                            {t("integrations_connected")}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                        {integrations[activeIntegration].description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                    {integrations[activeIntegration].features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 bg-gray-50/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-gray-100"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'translateY(0)' : 'translateY(20px)',
                          transition: `all 0.5s ease-out`,
                          transitionDelay: `${index * 100}ms`
                        }}
                      >
                        <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Connection Animation */}
                  <div className="flex items-center justify-center py-3 sm:py-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Image
                        src="/assets/img/logo2-1.png"
                        alt="Riad Atlas 4 Seasons"
                        width={60}
                        height={60}
                        className="sm:w-20 sm:h-20"
                        style={{ objectFit: "contain" }}
                      />
                      {/* Animated connection line */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 sm:w-2 h-0.5 sm:h-1 bg-gradient-to-r from-[#0357cb] to-blue-400 rounded-full"
                            style={{
                              opacity: visible ? 1 : 0.3,
                              animation: visible ? `pulse 2s infinite ${i * 0.2}s` : 'none'
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex-shrink-0">
                        {integrations[activeIntegration].icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className={`transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } mt-6 sm:mt-8`}>
            <div className="relative overflow-hidden">
              <div className="text-center mb-12 sm:mb-16 pt-12 sm:pt-20">
                <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
                  {t("integrations_benefits_title")}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 px-2 lg:px-0">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="group relative"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(30px)',
                      transition: `all 0.7s ease-out`,
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="relative bg-white text-gray-900 p-4 sm:p-8 rounded-2xl sm:rounded-3xl overflow-hidden group-hover:bg-[#0357cb] group-hover:text-white transition-all duration-500 min-h-[160px] sm:min-h-[200px] flex flex-col justify-between">
                      {/* Animated background circles */}
                      <div className="absolute -top-6 sm:-top-10 -right-6 sm:-right-10 w-20 sm:w-32 h-20 sm:h-32 bg-gray-100/5 rounded-full group-hover:scale-150 group-hover:bg-white/10 transition-all duration-700"></div>
                      <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 w-12 sm:w-20 h-12 sm:h-20 bg-gray-100/5 rounded-full group-hover:scale-125 group-hover:bg-white/10 transition-all duration-700"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className="p-2 sm:p-4 bg-gray-100/10 rounded-xl sm:rounded-2xl group-hover:bg-white/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 flex-shrink-0">
                            <benefit.icon className="w-6 sm:w-8 h-6 sm:h-8 text-[#0357cb] group-hover:text-white transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                              {benefit.title}
                            </h4>
                            <p className="text-sm sm:text-base text-gray-600 group-hover:text-white leading-relaxed group-hover:translate-x-2 transition-all duration-300">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Hover arrow */}
                      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 text-[#0357cb] group-hover:text-white transition-colors duration-300" />
                      </div>

                      {/* Number badge */}
                      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-6 sm:w-8 h-6 sm:h-8 bg-[#0357cb]/10 rounded-full flex items-center justify-center text-[#0357cb] font-bold text-xs sm:text-sm group-hover:bg-white/30 group-hover:text-white transition-all duration-300">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          
          .hover\\:scale-102:hover {
            transform: scale(1.02);
          }
        `}</style>
      </section>
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      handleConsoleError(err);
    } else {
      handleConsoleError(new Error("An unknown error occurred"));
    }
    return null;
  }
};

export default IntegrationsSection;