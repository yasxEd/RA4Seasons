import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Add this import

export const NAVBAR_HEIGHT = 80;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const router = useRouter(); // Add this

  const navItems = [
    { name: 'About', href: '/#about' },
    { name: 'Rooms', href: '/#rooms' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Services', href: '/#services' },
    { name: 'Activities', href: '/activities' },
  ];

  // Updated nav click handler
  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.name === "Rooms" && item.href === "/#rooms") {
      e.preventDefault();
      if (window.location.pathname !== "/") {
        router.push("/#rooms");
        setTimeout(() => {
          const section = document.getElementById("rooms");
          if (section) section.scrollIntoView({ behavior: "smooth" });
        }, 100); // slight delay for navigation
      } else {
        const section = document.getElementById("rooms");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    } else if (!item.href.startsWith('/#')) {
      // For page routes, scroll to top after navigation
      e.preventDefault();
      router.push(item.href);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      }, 100);
      setMobileMenuOpen(false);
    }
    // For hash links, default behavior is fine
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section links
      const sectionNavs = navItems.filter(item => item.href.startsWith('/#'));
      let foundActive = false;
      for (const item of sectionNavs) {
        const id = item.href.split('#')[1];
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Section is at the top and visible
          if (rect.top <= NAVBAR_HEIGHT && rect.bottom > NAVBAR_HEIGHT) {
            setActiveNav(item.name);
            foundActive = true;
            break;
          }
        }
      }
      if (!foundActive) {
        // Check for page routes
        const path = window.location.pathname;
        const pageNav = navItems.find(item => !item.href.startsWith('/#') && item.href === path);
        if (pageNav) {
          setActiveNav(pageNav.name);
        } else {
          setActiveNav(null);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Detect current route for activeNav on page routes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const pageNav = navItems.find(item => item.href === path);
      if (pageNav) setActiveNav(pageNav.name);
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out
          ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-transparent'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="flex flex-col">
                  <span className="text-xl font-light text-gray-900 leading-tight">
                    Riad <span className="font-semibold text-emerald-700">Atlas</span>
                  </span>
                  <span className="text-xs text-emerald-600 font-medium tracking-wide">
                    4 SEASONS
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  scroll={item.href.startsWith('/#')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-gray-100
                    ${activeNav === item.name
                      ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                      : 'text-gray-700 hover:text-gray-900'
                    }`}
                  onClick={(e) => handleNavClick(item, e)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Contact Us Button - Desktop */}
              <div className="hidden sm:block">
                <Link href="/contact">
                  <button className="group relative bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25 overflow-hidden">
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Contact Us</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                  <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[99] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}></div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-[76px] left-4 right-4 bg-white rounded-2xl shadow-2xl z-[101] transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="p-6">
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                scroll={item.href.startsWith('/#')}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                  ${activeNav === item.name
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                onClick={(e) => handleNavClick(item, e)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Contact Us Button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link href="/contact">
              <button 
                className="w-full bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Contact Us</span>
                <svg
                  className="w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;