'use client'
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const BodyWithDir: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const dir = language === "ar" ? "rtl" : "ltr";
  return (
    <body
      className="bg-white text-black antialiased"
      style={{ fontFamily: 'Urbanist, Arial, Helvetica, sans-serif' }}
      dir={dir}
      data-lang={language}
    >
      {children}
    </body>
  );
};

export default BodyWithDir;
