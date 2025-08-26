import React, { useState, useEffect } from "react";
import { Activity, ChevronLeft, ChevronRight, X, Eye, Phone, Mail, Coffee, Mountain, Star, GalleryHorizontalEnd } from "lucide-react";

// Helper to resolve image paths
const getImageSrc = (src: string) => {
  return `${process.env.PUBLIC_URL || ""}${src}`;
};

interface GalleryProps {
  galleryImages: string[];
  experiences: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  galleryImagesChosen?: string[]; // new optional prop
}

export const GallerySections: React.FC<GalleryProps> = ({
  galleryImages,
  experiences,
  galleryImagesChosen,
}) => {
  // --- Add mobile detection state ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // --- End mobile detection state ---

  const imagesToShow = [
    "/assets/img/gallery/1.jpg",
    "/assets/img/gallery/2.jpg",
    "/assets/img/gallery/3.jpg",
    "/assets/img/gallery/4.jpg",
    "/assets/img/gallery/5.jpg",
    "/assets/img/gallery/6.jpg",
    "/assets/img/gallery/7.jpg",
    "/assets/img/gallery/8.jpg",
  ];

  const imageCount = imagesToShow.length;
  const [heroIdx, setHeroIdx] = useState<number>(Math.floor(imageCount / 2));

  // Auto-rotate through images (infinite loop) - slower for smoother effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx(prev => (prev + 1) % imageCount);
    }, 4000); // Increased from 3000 to 4000ms for smoother transitions
    return () => clearInterval(interval);
  }, [imageCount]);

  // Helper to get visible images (2 before, hero, 2 after)
  const getVisibleImages = () => {
    const result = [];
    for (let offset = -2; offset <= 2; offset++) {
      const idx = (heroIdx + offset + imageCount) % imageCount;
      result.push({ img: imagesToShow[idx], idx, pos: offset + 2 });
    }
    return result;
  };

  const visibleImages = getVisibleImages();

  // Handle hover/click to set hero
  const handleSetHero = (idx: number) => setHeroIdx(idx);

  // Map pos to scale/z-index/overlay with smoother scaling
  const posStyles = {
    0: { scale: 0.85, zIndex: 1, overlay: "rgba(0,0,0,0.7)", blur: 2 },
    1: { scale: 1.2, zIndex: 5, overlay: "rgba(0,0,0,0.3)", blur: 1 },
    2: { scale: 1.6, zIndex: 10, overlay: "transparent", blur: 0 },
    3: { scale: 1.2, zIndex: 5, overlay: "rgba(0,0,0,0.3)", blur: 1 },
    4: { scale: 0.85, zIndex: 1, overlay: "rgba(0,0,0,0.7)", blur: 2 },
  };

  return (
    <>
      {/* Enhanced Gallery Modal */}
      {/* Modal removed */}
      {/* Enhanced Gallery Section */}
      <section className="py-20 lg:py-32 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            {/* Location indicator badge above title */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm">
                <GalleryHorizontalEnd size={18} strokeWidth={1.5} className="text-emerald-600" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">Gallery</span>
              </div>
            </div>
            <h2 className="text-5xl font-extralight tracking-wide text-white mb-8 tracking-wider">
              Visual Journey
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed font-light max-w-3xl mx-auto">
              Experience the soul of our riad through these moments that capture the essence of Moroccan beauty and tranquility
            </p>
          </div>
          <ul
            className="gallery relative mx-auto"
            style={{
              width: "min(1000px,90vw)",
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr",
              height: "22rem",
              placeItems: "center",
            }}
          >
            {visibleImages.map(({img, idx, pos}, i) => {
              const style = posStyles[pos as keyof typeof posStyles];
              const isHero = pos === 2;
              return (
                <li
                  key={i}
                  data-pos={pos}
                  // Removed hover/click handlers
                  style={{
                    position: "absolute",
                    gridColumn: 1,
                    gridRow: 1,
                    width: "180px",
                    aspectRatio: "1",
                    cursor: "default",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    boxShadow: isHero
                      ? "0 20px 60px rgba(0,0,0,0.4)"
                      : "0 10px 30px rgba(0,0,0,0.25)",
                    filter: `blur(${style.blur}px) brightness(${isHero ? 1 : 0.8})`,
                    transform: `
                      translateX(${(i - 2) * 200}px)
                      scale(${style.scale})
                      translateZ(0)
                    `,
                    zIndex: style.zIndex,
                    // Much smoother transitions with better easing
                    transition:
                      "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), " +
                      "filter 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), " +
                      "box-shadow 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    overflow: "hidden",
                    borderRadius: "16px",
                    // Enable GPU acceleration
                    willChange: "transform, filter",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={getImageSrc(img)}
                    alt={`Gallery ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      pointerEvents: "none",
                      borderRadius: "16px",
                      // Prevent image flickering
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: style.overlay,
                      transition: "background-color 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      // GPU acceleration for overlay
                      transform: "translateZ(0)",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* --- BEGIN: Experiences Gallery Section --- */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
             {/* Location indicator badge above title */}
            <div className="mb-4">
              <div
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm"
                style={{
                  // Mobile: reduce padding and gap
                  padding: isMobile ? "8px 16px" : undefined,
                  gap: isMobile ? "6px" : undefined,
                  fontSize: isMobile ? "0.85rem" : undefined,
                }}
              >
                <Activity size={isMobile ? 16 : 18} strokeWidth={1.5} className="text-emerald-600" />
                <span
                  className="text-xs sm:text-sm font-medium tracking-wide"
                  style={{
                    fontSize: isMobile ? "0.85rem" : undefined,
                  }}
                >
                  Our Activities
                </span>
              </div>
            </div>
            <h2
              className="text-5xl font-extralight tracking-wide text-neutral-900 mb-10 tracking-[0.1em]"
              style={{
                fontSize: isMobile ? "2rem" : undefined,
                marginBottom: isMobile ? "1.5rem" : undefined,
                lineHeight: isMobile ? "2.4rem" : undefined,
              }}
            >
              Authentic Experiences
            </h2>
            <p
              className="text-xl text-neutral-600 leading-relaxed font-light max-w-4xl mx-auto"
              style={{
                fontSize: isMobile ? "1rem" : undefined,
                paddingLeft: isMobile ? "0.5rem" : undefined,
                paddingRight: isMobile ? "0.5rem" : undefined,
                marginBottom: isMobile ? "1.5rem" : undefined,
              }}
            >
              Discover the beauty of Morocco with our curated tours, exploring local culture, history, and breathtaking landscapes that define the soul of this magnificent land.
            </p>
          </div>
          <div
            className="gallery flex rounded-2xl overflow-hidden"
            style={{
              flexDirection: isMobile ? "column" : "row",
              height: isMobile ? "440px" : "80vh",
              boxShadow: isMobile
                ? "0 8px 32px rgba(0,0,0,0.10)"
                : "0 25px 80px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
              background: "white",
              borderRadius: isMobile ? "18px" : "1rem",
              gap: isMobile ? "18px" : "0",
              padding: isMobile ? "12px" : "0",
            }}
          >
            {[
              {
                url: "/assets/img/gallery/3.jpg",
                artist: "Atlas Tours",
                subtitle: "Mountain Adventure",
                date: "STARTED",
              },
              {
                url: "/assets/img/mtbs.jpg",
                artist: "MTB Tours",
                subtitle: "Cultural Journey", 
                date: "START SOON",
              },
            ].map((img, idx) => (
              <GalleryFlexImage
                key={idx}
                url={getImageSrc(img.url)}
                artist={img.artist}
                date={img.date}
                last={idx === 1}
                mobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>
      {/* --- END: Experiences Gallery Section --- */}
    </>
  );
};

// Update GalleryFlexImage to accept mobile prop and enhance mobile layout
const GalleryFlexImage: React.FC<{url: string; artist: string; date: string; last?: boolean; mobile?: boolean}> = ({
  url, artist, date, last, mobile
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="imgWrap"
      style={{
        cursor: "pointer",
        flexGrow: mobile ? 1 : (hover ? 2.25 : 0.8),
        flex: 1,
        minWidth: last ? "1px" : "0",
        height: mobile ? "200px" : "100%",
        overflow: "hidden",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        transition: mobile
          ? "box-shadow 0.5s, border-radius 0.5s"
          : "flex-grow 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transformOrigin: "center center",
        backgroundImage: `url(${url})`,
        willChange: mobile ? "box-shadow, border-radius" : "flex-grow",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        borderRadius: mobile ? "14px" : "0",
        boxShadow: mobile ? "0 4px 16px rgba(0,0,0,0.10)" : undefined,
        marginBottom: mobile && !last ? "12px" : "0",
      }}
      onMouseEnter={() => !mobile && setHover(true)}
      onMouseLeave={() => !mobile && setHover(false)}
    >
      <div
        className="caption"
        style={{
          position: "absolute",
          left: 0,
          bottom: mobile ? "0" : (hover ? 0 : "-100%"),
          background: mobile
            ? "linear-gradient(135deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.60) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 100%)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          padding: mobile ? "18px 14px" : "32px 24px",
          color: "#fff",
          width: "100%",
          transition: mobile
            ? "none"
            : "bottom 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          zIndex: 2,
          transform: "translateZ(0)",
          willChange: mobile ? undefined : "bottom",
          borderRadius: mobile ? "0 0 14px 14px" : "0",
        }}
      >
        <div
          className="w-16 h-px bg-gradient-to-r from-emerald-700 to-transparent mb-4"
          style={{
            marginBottom: mobile ? "8px" : "16px",
          }}
        />
        <h3 style={{
          fontSize: mobile ? "1.1rem" : "clamp(1.25rem, 2vw, 1.5rem)",
          fontWeight: "400",
          letterSpacing: "0.08em",
          marginBottom: mobile ? "4px" : "8px",
          color: "#fff",
        }}>{artist}</h3>
        <div style={{
          fontSize: mobile ? "0.95rem" : "0.875rem",
          color: "rgba(255,255,255,0.8)",
          fontWeight: "300",
          letterSpacing: "0.05em"
        }}>{date}</div>
      </div>
    </div>
  );
};

// Simple PremiumExperienceCard implementation
const PremiumExperienceCard: React.FC<{
  url: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  last?: boolean;
}> = ({ url, title, subtitle, description, date, last }) => (
  <div
    className={`flex-1 relative overflow-hidden ${last ? "rounded-r-2xl" : "rounded-l-2xl"}`}
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      minWidth: 0,
      height: "100%",
      position: "relative",
    }}
  >
    <div
      style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.2) 100%)",
        color: "#fff",
        padding: "2rem",
        position: "relative",
        zIndex: 2,
      }}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="text-lg font-light mb-2">{subtitle}</div>
      <div className="text-base mb-4">{description}</div>
      <div className="text-xs opacity-80">{date}</div>
    </div>
  </div>
);

export default GallerySections;