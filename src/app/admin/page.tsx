'use client';

import React, { useState, useEffect } from "react";
import { X, Plus, Edit2, Trash2, ArrowLeft, Home, Image, Eye, EyeOff, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const ROOMS_KEY = "hotelRoomsData";
const GALLERY_KEY = "hotelGalleryData";
const DATA_INITIALIZED_KEY = "hotelDataInitialized";
const TESTIMONIALS_KEY = "testimonials_user_submitted";

// Remove export from rooms and galleryImages
const rooms = [
  {
    name: "Double or Twin Room",
    images: [
      "/assets/img/Double or Twin Room/322452796.jpg",
      "/assets/img/Double or Twin Room/322453151.jpg",
      "/assets/img/Double or Twin Room/ecf447e2dc0671292426555caf829393.jpeg",
    ],
    price: "Enter dates to see prices",
    originalPrice: "$120",
    details: "20 m² • 215 ft²",
    beds: "1 queen bed",
    capacity: "2 guests",
    amenities: ["Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.8,
    reviews: 127
  },
  {
    name: "Quadruple Room with Balcony",
    images: [
      "/assets/img/Quadruple Room with Balcony/406812739.jpg",
      "/assets/img/Quadruple Room with Balcony/406815624.jpg",
      "/assets/img/Quadruple Room with Balcony/405211130.jpg",
      "/assets/img/Quadruple Room with Balcony/406812481.jpg",
    ],
    price: "Enter dates to see prices",
    originalPrice: "$180",
    details: "35 m² • 377 ft²",
    beds: "4 single beds or 2 queen beds",
    capacity: "4 guests",
    amenities: ["Balcony", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.9,
    reviews: 89
  },
  {
    name: "Double or Twin Room with Balcony",
    images: [
      "/assets/img/Double or Twin Room with Balcony/208185855.jpg",
      "/assets/img/Double or Twin Room with Balcony/326350657.jpg",
      "/assets/img/Double or Twin Room with Balcony/326351053.jpg",
      "/assets/img/Double or Twin Room with Balcony/view.jpg",
    ],
    price: "Enter dates to see prices",
    originalPrice: "$140",
    details: "25 m² • 269 ft²",
    beds: "1 queen bed or 2 single beds",
    capacity: "2 guests",
    amenities: ["Balcony", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.7,
    reviews: 156
  },
  {
    name: "Suite with Terrace",
    images: [
      "/assets/img/Suite with Terrace/406817443.jpg",
      "/assets/img/Suite with Terrace/406818119.jpg",
      "/assets/img/Suite with Terrace/406818386.jpg",
      "/assets/img/Suite with Terrace/406818950.jpg",
      "/assets/img/Suite with Terrace/326352599.jpg",
    ],
    price: "Enter dates to see prices",
    originalPrice: "$250",
    details: "55 m² • 592 ft²",
    beds: "2 sofa beds and 1 single bed",
    capacity: "5 guests",
    amenities: ["Terrace", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.9,
    reviews: 73
  },
  {
    name: "Panoramic Triple Room",
    images: [
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/4dffea56322e51a641690e669941ad4c.jpeg",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/5fd1da25c3cbad7b8272a9f6695b9922.webp",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/399a644d21e81bf5e683d02d961208b8.jpeg",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/b1a16832f3d6e3a9c065f317b7e222e1.webp",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/d6253a547be3ff4f7dd291c93b29adc6.jpeg",
      "/assets/img/Panoramic Triple Room, 3 Twin Beds, Mountain View/ecf447e2dc0671292426555caf829393.webp",
    ],
    price: "Enter dates to see prices",
    originalPrice: "$160",
    details: "25 m² • 269 ft²",
    beds: "3 single beds",
    capacity: "3 guests",
    amenities: ["Panoramic view", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.8,
    reviews: 94
  },
  {
    name: "Deluxe Double Room with Balcony",
    images: [
      "/assets/img/Deluxe Double Room with Balcony/406810306.jpg",
      "/assets/img/Deluxe Double Room with Balcony/406810671.jpg",
      "/assets/img/Deluxe Double Room with Balcony/406811189.jpg",
      "/assets/img/Deluxe Double Room with Balcony/406811374.jpg",
    ],
    price: "Enter dates to see prices",
    originalPrice: "$150",
    details: "20 m² • 215 ft²",
    beds: "1 queen bed or 2 single beds",
    capacity: "2 guests",
    amenities: ["Balcony", "Mountain view", "WiFi", "Breakfast Included"],
    rating: 4.6,
    reviews: 203
  },
];

const galleryImages = [
  "/assets/img/gallery/20190629-153146-largejpg.jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (1).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (2).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (3).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (4).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (5).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (6).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (7).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (8).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (9).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (10).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (11).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (12).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (13).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (14).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons (15).jpg",
  "/assets/img/gallery/riad-atlas-4-seasons.jpg",
];

// Global data access functions - use these in your main app
const getHotelRooms = () => {
  if (typeof window === 'undefined') return rooms; // Server-side fallback
  return getFromLocalStorage(ROOMS_KEY, rooms);
};

const getHotelGallery = () => {
  if (typeof window === 'undefined') return galleryImages; // Server-side fallback
  return getFromLocalStorage(GALLERY_KEY, galleryImages);
};

// Force data sync function
const forceDataSync = () => {
  // Create a custom event to notify other components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('hotelDataUpdated', {
      detail: {
        rooms: getFromLocalStorage(ROOMS_KEY, rooms),
        gallery: getFromLocalStorage(GALLERY_KEY, galleryImages)
      }
    }));
  }
};

// Helper functions for localStorage operations
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`✅ Saved ${key} to localStorage:`, data.length, 'items');
    // Force sync after saving
    forceDataSync();
  } catch (error) {
    console.error(`❌ Error saving ${key} to localStorage:`, error);
  }
};

const getFromLocalStorage = (key, defaultValue = []) => {
  try {
    const stored = localStorage.getItem(key);
    if (stored && stored !== "null" && stored !== "undefined") {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        console.log(`✅ Loaded ${key} from localStorage:`, parsed.length, 'items');
        return parsed;
      }
    }
    console.log(`ℹ️ No valid data found for ${key}, using default`);
    return defaultValue;
  } catch (error) {
    console.error(`❌ Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const initializeData = () => {
  const isInitialized = localStorage.getItem(DATA_INITIALIZED_KEY);
  
  if (!isInitialized) {
    // First time initialization
    console.log('🚀 Initializing hotel data for the first time');
    saveToLocalStorage(ROOMS_KEY, rooms);
    saveToLocalStorage(GALLERY_KEY, galleryImages);
    localStorage.setItem(DATA_INITIALIZED_KEY, 'true');
    return { rooms: rooms, gallery: galleryImages };
  } else {
    // Load existing data
    console.log('📂 Loading existing hotel data from localStorage');
    const storedRooms = getFromLocalStorage(ROOMS_KEY, rooms);
    const storedGallery = getFromLocalStorage(GALLERY_KEY, galleryImages);
    
    // Always return stored data, even if empty (user might have deleted everything)
    return { rooms: storedRooms, gallery: storedGallery };
  }
};

// Room type for state
type Room = {
  name: string;
  images: string[];
  price: string;
  originalPrice: string;
  details: string;
  beds: string;
  capacity: string;
  amenities: string[] | string;
  rating: number;
  reviews: number;
  id?: number;
};

export default function AdminPage() {
  const router = useRouter();
  // Explicitly type state to fix type error
  const [adminRooms, setAdminRooms] = useState<Room[]>([]);
  const [adminGallery, setAdminGallery] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  // Room states
  const [editingRoomIdx, setEditingRoomIdx] = useState<number | null>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    images: [],
    price: "Enter dates to see prices",
    originalPrice: "",
    details: "",
    beds: "",
    capacity: "",
    amenities: "",
    rating: 0,
    reviews: 0,
  });

  // Gallery states
  const [editingGalleryIdx, setEditingGalleryIdx] = useState<number | null>(null);
  const [showAddImage, setShowAddImage] = useState(false);
  const [newGalleryImage, setNewGalleryImage] = useState("");
  const [editGalleryUrl, setEditGalleryUrl] = useState("");

  // Testimonial type
  type Testimonial = {
    name: string;
    country: string;
    room: string;
    nights: number;
    date: string;
    type: string;
    rating: number;
    comment: string;
    status: string;
  };

  // Testimonial states
  const [pendingTestimonials, setPendingTestimonials] = useState<Testimonial[]>([]);

  // Initialize data on component mount
  useEffect(() => {
    console.log('🔄 Component mounted, initializing data...');
    const { rooms: initialRooms, gallery: initialGallery } = initializeData();
    setAdminRooms(initialRooms);
    setAdminGallery(initialGallery);
    setIsDataLoaded(true);
    
    // Load testimonials
    const storedTestimonials = getFromLocalStorage(TESTIMONIALS_KEY, []);
    setPendingTestimonials(storedTestimonials.filter((t) => t.status === "pending"));
  }, []);

  // Save rooms to localStorage whenever adminRooms changes
  useEffect(() => {
    if (isDataLoaded && adminRooms.length > 0) {
      console.log('💾 Saving rooms to localStorage...');
      saveToLocalStorage(ROOMS_KEY, adminRooms);
    }
  }, [adminRooms, isDataLoaded]);

  // Save gallery to localStorage whenever adminGallery changes
  useEffect(() => {
    if (isDataLoaded && adminGallery.length > 0) {
      console.log('💾 Saving gallery to localStorage...');
      saveToLocalStorage(GALLERY_KEY, adminGallery);
    }
  }, [adminGallery, isDataLoaded]);

  // Reload testimonials when view changes
  useEffect(() => {
    if (currentView === 'dashboard') {
      const storedTestimonials = getFromLocalStorage(TESTIMONIALS_KEY, []);
      setPendingTestimonials(storedTestimonials.filter((t) => t.status === "pending"));
    }
  }, [currentView]);

  const handleAuthSubmit = () => {
    if (inputPassword === "0000" && inputCode === "0000") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid credentials");
    }
  };

  // Image upload handler
  const handleImageUpload = (e, type = 'room') => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        if (type === 'room') {
          setNewRoom(prev => ({
            ...prev,
            images: [...prev.images, imageUrl]
          }));
        } else if (type === 'gallery') {
          setAdminGallery(prev => {
            const updated = [...prev, imageUrl];
            console.log('📸 Added new gallery image, total:', updated.length);
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveRoomImage = (imageIndex) => {
    setNewRoom(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== imageIndex)
    }));
  };

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.images.length > 0) {
      const roomToAdd = {
        ...newRoom,
        amenities: newRoom.amenities.split(',').map(a => a.trim()).filter(a => a),
        id: Date.now() // Add unique ID for better tracking
      };
      
      setAdminRooms(prev => {
        const updated = [...prev, roomToAdd];
        console.log('🏨 Added new room:', roomToAdd.name, 'Total rooms:', updated.length);
        return updated;
      });
      
      // Reset form
      setNewRoom({
        name: "", images: [], price: "Enter dates to see prices", originalPrice: "",
        details: "", beds: "", capacity: "", amenities: "", rating: 0, reviews: 0,
      });
      setShowAddRoom(false);
    }
  };

  const handleRemoveRoom = (idx) => {
    setAdminRooms(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      console.log('🗑️ Removed room at index:', idx, 'Remaining rooms:', updated.length);
      return updated;
    });
  };

  const handleAddGalleryImage = () => {
    if (newGalleryImage.trim()) {
      setAdminGallery(prev => {
        const updated = [...prev, newGalleryImage.trim()];
        console.log('🖼️ Added gallery image via URL, total:', updated.length);
        return updated;
      });
      setNewGalleryImage("");
      setShowAddImage(false);
    }
  };

  const handleRemoveGalleryImage = (idx) => {
    setAdminGallery(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      console.log('🗑️ Removed gallery image at index:', idx, 'Remaining images:', updated.length);
      return updated;
    });
  };

  const handleApproveTestimonial = (idx) => {
    const storedTestimonials = getFromLocalStorage(TESTIMONIALS_KEY, []);
    if (storedTestimonials[idx]) {
      storedTestimonials[idx].status = "approved";
      saveToLocalStorage(TESTIMONIALS_KEY, storedTestimonials);
      setPendingTestimonials(storedTestimonials.filter((t) => t.status === "pending"));
      console.log('✅ Approved testimonial at index:', idx);
    }
  };

  const handleRejectTestimonial = (idx) => {
    const storedTestimonials = getFromLocalStorage(TESTIMONIALS_KEY, []);
    storedTestimonials.splice(idx, 1);
    saveToLocalStorage(TESTIMONIALS_KEY, storedTestimonials);
    setPendingTestimonials(storedTestimonials.filter((t) => t.status === "pending"));
    console.log('❌ Rejected testimonial at index:', idx);
  };

  // Debug info
  // const handleDebugInfo = () => {
  //   console.log('🔍 DEBUG INFO:');
  //   console.log('Rooms in state:', adminRooms.length);
  //   console.log('Gallery in state:', adminGallery.length);
  //   console.log('Rooms in localStorage:', getFromLocalStorage(ROOMS_KEY, []).length);
  //   console.log('Gallery in localStorage:', getFromLocalStorage(GALLERY_KEY, []).length);
  //   console.log('Is data loaded:', isDataLoaded);
  //   console.log('Full rooms data:', adminRooms);
  //   console.log('Full gallery data:', adminGallery);
  // };

  const handleEditRoomField = (field: string, value: string | number) => {
    setAdminRooms(prev => {
      const updated = [...prev];
      updated[editingRoomIdx] = {
        ...updated[editingRoomIdx],
        [field]: value
      };
      return updated;
    });
  };

  const handleEditRoomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setAdminRooms(prev => {
          const updated = [...prev];
          updated[editingRoomIdx] = {
            ...updated[editingRoomIdx],
            images: [...updated[editingRoomIdx].images, imageUrl]
          };
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditRoomRemoveImage = (imgIdx) => {
    setAdminRooms(prev => {
      const updated = [...prev];
      updated[editingRoomIdx].images = updated[editingRoomIdx].images.filter((_, i) => i !== imgIdx);
      return updated;
    });
  };

  const handleSaveRoomEdit = () => {
    // Ensure amenities is array
    setAdminRooms(prev => {
      const updated = [...prev];
      updated[editingRoomIdx].amenities = Array.isArray(updated[editingRoomIdx].amenities)
        ? updated[editingRoomIdx].amenities
        : updated[editingRoomIdx].amenities.split(',').map(a => a.trim()).filter(a => a);
      return updated;
    });
    setEditingRoomIdx(null);
  };

  const handleRemoveGalleryImageDebug = (idx) => {
    setAdminGallery(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      console.log('🗑️ Removed gallery image at index:', idx, 'Remaining images:', updated.length);
      return updated;
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Access</h1>
            <p className="text-slate-600 text-sm">Enter your credentials to continue</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={inputPassword}
                  onChange={e => setInputPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-black"
                  placeholder="Enter password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Access Code</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-black"
                  placeholder="Enter access code"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {authError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100">
                {authError}
              </div>
            )}
            
            <button
              type="button"
              onClick={handleAuthSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25"
            >
              Access Admin Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while data is being loaded
  if (!isDataLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              {currentView !== 'dashboard' && (
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              )}
              <div>
                <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
                <p className="text-sm text-slate-600 capitalize">{currentView} Management</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 md:flex-row md:w-auto md:gap-2">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone!')) {
                    localStorage.removeItem(ROOMS_KEY);
                    localStorage.removeItem(GALLERY_KEY);
                    localStorage.removeItem(DATA_INITIALIZED_KEY);
                    console.log('🔄 Reset all data to defaults');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors"
              >
                Reset Data
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back!</h2>
              <p className="text-slate-600">Manage your hotel rooms and gallery images</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setCurrentView('rooms')}
                className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">{adminRooms.length}</div>
                    <div className="text-sm text-slate-600">Total Rooms</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Room Management</h3>
                <p className="text-slate-600 text-sm">Add, edit, and manage hotel rooms</p>
              </button>

              <button
                onClick={() => setCurrentView('gallery')}
                className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Image className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">{adminGallery.length}</div>
                    <div className="text-sm text-slate-600">Gallery Images</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Gallery Management</h3>
                <p className="text-slate-600 text-sm">Manage hotel gallery images</p>
              </button>
            </div>

            {/* Pending Testimonials Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mt-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Commentaires en attente</h2>
              {pendingTestimonials.length === 0 ? (
                <div className="text-slate-600">Aucun commentaire en attente.</div>
              ) : (
                <div className="space-y-4">
                  {pendingTestimonials.map((t, idx) => (
                    <div key={idx} className="border rounded-xl p-4 bg-white flex flex-col gap-2">
                      <div className="font-semibold text-emerald-700">{t.name} ({t.country})</div>
                      <div className="text-sm text-slate-600">{t.room} · {t.nights} nuit{t.nights > 1 ? "s" : ""} · {t.date}</div>
                      <div className="text-sm text-slate-600">{t.type} · Note: {t.rating}/10</div>
                      <div className="text-base text-slate-800 font-light">&quot;{t.comment}&quot;</div>
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => handleApproveTestimonial(idx)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
                        >
                          Approuver
                        </button>
                        <button
                          onClick={() => handleRejectTestimonial(idx)}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                        >
                          Rejeter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'rooms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Room Management</h2>
              <button
                onClick={() => setShowAddRoom(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Room
              </button>
            </div>

            {showAddRoom && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New Room</h3>
                
                {/* Room Images Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Room Images</label>
                  <div className="flex items-center gap-3 mb-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Upload Images
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'room')}
                        className="hidden"
                      />
                    </label>
                    <span className="text-sm text-slate-600">
                      {newRoom.images.length} image(s) selected
                    </span>
                  </div>
                  
                  {/* Preview uploaded images */}
                  {newRoom.images.length > 0 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                      {newRoom.images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img} alt={`Preview ${i + 1}`} className="w-full h-16 object-cover rounded-lg" />
                          <button
                            onClick={() => handleRemoveRoomImage(i)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Room Name"
                    value={newRoom.name}
                    onChange={e => setNewRoom({...newRoom, name: e.target.value})}
                    className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Original Price (e.g., $120)"
                    value={newRoom.originalPrice}
                    onChange={e => setNewRoom({...newRoom, originalPrice: e.target.value})}
                    className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Details (e.g., 20 m² • 215 ft²)"
                    value={newRoom.details}
                    onChange={e => setNewRoom({...newRoom, details: e.target.value})}
                    className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Beds (e.g., 1 queen bed)"
                    value={newRoom.beds}
                    onChange={e => setNewRoom({...newRoom, beds: e.target.value})}
                    className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Capacity (e.g., 2 guests)"
                    value={newRoom.capacity}
                    onChange={e => setNewRoom({...newRoom, capacity: e.target.value})}
                    className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Rating (0-5)"
                      step="0.1"
                      value={newRoom.rating}
                      onChange={e => setNewRoom({...newRoom, rating: parseFloat(e.target.value) || 0})}
                      className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                    />
                    <input
                      type="number"
                      placeholder="Reviews count"
                      value={newRoom.reviews}
                      onChange={e => setNewRoom({...newRoom, reviews: parseInt(e.target.value) || 0})}
                      className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Amenities (comma separated)"
                  value={newRoom.amenities}
                  onChange={e => setNewRoom({...newRoom, amenities: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 mb-4 text-black"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAddRoom}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Add Room
                  </button>
                  <button
                    onClick={() => {
                      setShowAddRoom(false);
                      setNewRoom({
                        name: "", images: [], price: "Enter dates to see prices", originalPrice: "",
                        details: "", beds: "", capacity: "", amenities: "", rating: 0, reviews: 0,
                      });
                    }}
                    className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-6">
              {adminRooms.map((room, idx) => (
                <div key={room.id || idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{room.name}</h3>
                      <p className="text-slate-600 text-sm">{room.details}</p>
                      <p className="text-emerald-600 font-semibold">{room.originalPrice}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingRoomIdx(editingRoomIdx === idx ? null : idx)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveRoom(idx)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Editable Room UI */}
                  {editingRoomIdx === idx ? (
                    <div className="mb-4">
                      {/* Images */}
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Room Images</label>
                        <div className="flex items-center gap-3 mb-3">
                          <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Upload Images
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleEditRoomImageUpload}
                              className="hidden"
                            />
                          </label>
                          <span className="text-sm text-slate-600">
                            {room.images.length} image(s)
                          </span>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-2">
                          {room.images.map((img, i) => (
                            <div key={i} className="relative group">
                              <img src={img} alt={`Preview ${i + 1}`} className="w-full h-16 object-cover rounded-lg" />
                              <button
                                onClick={() => handleEditRoomRemoveImage(i)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Editable fields */}
                      <div className="grid md:grid-cols-2 gap-4 mb-2">
                        <input
                          type="text"
                          placeholder="Room Name"
                          value={room.name}
                          onChange={e => handleEditRoomField("name", e.target.value)}
                          className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                        />
                        <input
                          type="text"
                          placeholder="Original Price (e.g., $120)"
                          value={room.originalPrice}
                          onChange={e => handleEditRoomField("originalPrice", e.target.value)}
                          className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                        />
                        <input
                          type="text"
                          placeholder="Details (e.g., 20 m² • 215 ft²)"
                          value={room.details}
                          onChange={e => handleEditRoomField("details", e.target.value)}
                          className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                        />
                        <input
                          type="text"
                          placeholder="Beds (e.g., 1 queen bed)"
                          value={room.beds}
                          onChange={e => handleEditRoomField("beds", e.target.value)}
                          className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                        />
                        <input
                          type="text"
                          placeholder="Capacity (e.g., 2 guests)"
                          value={room.capacity}
                          onChange={e => handleEditRoomField("capacity", e.target.value)}
                          className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="Rating (0-5)"
                            step="0.1"
                            value={room.rating}
                            onChange={e => handleEditRoomField("rating", parseFloat(e.target.value) || 0)}
                            className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                          />
                          <input
                            type="number"
                            placeholder="Reviews count"
                            value={room.reviews}
                            onChange={e => handleEditRoomField("reviews", parseInt(e.target.value) || 0)}
                            className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Amenities (comma separated)"
                        value={Array.isArray(room.amenities) ? room.amenities.join(", ") : room.amenities}
                        onChange={e => handleEditRoomField("amenities", e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 mb-2 text-black"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={handleSaveRoomEdit}
                          className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingRoomIdx(null)}
                          className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                        {room.images.map((img, i) => (
                          <img key={i} src={img} alt={`${room.name} ${i + 1}`} className="w-24 h-20 object-cover rounded-lg flex-shrink-0 border-2 border-white shadow-sm" />
                        ))}
                      </div>
                      <div className="grid md:grid-cols-4 gap-4 text-sm text-slate-600 mb-3">
                        <div><strong>Beds:</strong> {room.beds}</div>
                        <div><strong>Capacity:</strong> {room.capacity}</div>
                        <div><strong>Rating:</strong> {room.rating} ⭐ ({room.reviews})</div>
                        <div><strong>Price:</strong> {room.originalPrice}</div>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity, i) => (
                            <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Gallery Management</h2>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'gallery')}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={() => setShowAddImage(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add URL
                </button>
              </div>
            </div>

            {showAddImage && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Add Image by URL</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newGalleryImage}
                    onChange={e => setNewGalleryImage(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-black"
                  />
                  <button
                    onClick={handleAddGalleryImage}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddImage(false)}
                    className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {adminGallery.map((img, idx) => (
                <div key={idx} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-lg hover:shadow-xl transition-all">
                  <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-32 object-cover rounded-xl" />
                  <div className="absolute inset-2 bg-black/0 group-hover:bg-black/40 rounded-xl transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}