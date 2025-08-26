'use client'
import React from "react";

const BodyWithDir: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="bg-white text-black antialiased"
      style={{ fontFamily: 'Urbanist, Arial, Helvetica, sans-serif' }}
      dir="ltr"
      data-lang="en"
    >
      {children}
    </div>
  );
};

export default BodyWithDir;
