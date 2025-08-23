'use client'

import React, { useState } from 'react'
import Navigation, { NAVBAR_HEIGHT } from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Features from '@/components/sections/Features'
import Contact from '@/components/sections/Contact'
import Integrations from '@/components/sections/Integrations'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'
import Pricing from '@/components/sections/Pricing'
import Services from '@/components/sections/Services'
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { Minimize2 } from 'lucide-react'


export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black" style={{ paddingTop: NAVBAR_HEIGHT }}>
      <Navigation />
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="features"><Features /></section>
      <section id="services"><Services /></section>
      <section id="testimonials"><Testimonials /></section>
      <section id="pricing"><Pricing /></section>
      <section id="faq"><FAQ /></section>
      <section id="contact"><Contact /></section>
      <Footer />
        {/* WhatsApp Sticky Button */}
      <a
        href="https://wa.me/yourwhatsappphonenumber"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95 hover:shadow-2xl"
        aria-label="Chat on WhatsApp"
        style={{
          // Glassmorphism effect
          background: 'rgba(255,255,255,0.25)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Official WhatsApp Logo SVG */}
        <svg
          width={56}
          height={56}
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,0.35)" />
          <path d="M39.043 16.957A13.997 13.997 0 0 0 28 13c-7.732 0-14 6.268-14 14 0 2.485.654 4.91 1.895 7.043L13 43l9.13-2.382A13.96 13.96 0 0 0 28 41c7.732 0 14-6.268 14-14 0-3.732-1.455-7.238-4.043-9.957zm-11.043 21.04c-1.37 0-2.72-.18-4.02-.535l-.287-.08-5.42 1.414 1.45-5.28-.094-.16A11.98 11.98 0 0 1 16 27c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12zm6.38-8.36c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.89 1.14-1.09 1.37-.2.23-.4.26-.75.09-.35-.18-1.48-.55-2.82-1.75-1.04-.93-1.74-2.08-1.95-2.43-.2-.35-.02-.54.15-.71.16-.16.35-.41.53-.62.18-.21.23-.36.35-.6.12-.23.06-.44-.03-.62-.09-.18-.78-1.89-1.07-2.59-.28-.68-.57-.59-.78-.6-.2-.01-.44-.01-.68-.01-.23 0-.6.09-.91.44-.31.35-1.2 1.17-1.2 2.85 0 1.68 1.23 3.31 1.4 3.54.17.23 2.42 3.71 6.01 5.06.84.29 1.5.46 2.01.59.84.21 1.6.18 2.2.11.67-.08 2.07-.85 2.36-1.67.29-.82.29-1.53.2-1.67-.09-.14-.32-.23-.67-.41z" fill="#059669"/>
        </svg>
      </a>
    </main>
  )
}