import React from "react";

const ROOMS_KEY = "hotelRoomsData";
const GALLERY_KEY = "hotelGalleryData";

// Default data (same as in admin)
export const defaultRooms = [
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
		reviews: 127,
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
		reviews: 89,
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
		reviews: 156,
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
		reviews: 73,
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
		reviews: 94,
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
		reviews: 203,
	},
];

export const defaultGalleryImages = [
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

// Safe localStorage access with fallbacks
export interface HotelRoom {
	name: string;
	images: string[];
	price: string;
	originalPrice: string;
	details: string;
	beds: string;
	capacity: string;
	amenities: string[];
	rating: number;
	reviews: number;
}

export interface SafeGetFromStorage {
	<T>(key: string, fallback: T): T;
}

const safeGetFromStorage: SafeGetFromStorage = <T>(key: string, fallback: T): T => {
	if (typeof window === "undefined") return fallback;

	try {
		const stored = localStorage.getItem(key);
		if (stored && stored !== "null" && stored !== "undefined") {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				return parsed as T;
			}
		}
	} catch (error) {
		console.warn(`Error reading ${key} from localStorage:`, error);
	}

	return fallback;
};

// Main functions to use in your app - REPLACE your current data imports with these
export const getRooms = () => {
	return safeGetFromStorage(ROOMS_KEY, defaultRooms);
};

export const getGalleryImages = () => {
	return safeGetFromStorage(GALLERY_KEY, defaultGalleryImages);
};

// React hook for reactive data (optional)
export const useHotelData = () => {
	const [rooms, setRooms] = React.useState(getRooms());
	const [gallery, setGallery] = React.useState(getGalleryImages());

	React.useEffect(() => {
		interface HotelDataUpdateEvent extends CustomEvent {
			detail: {
				rooms: HotelRoom[];
				gallery: string[];
			};
		}

		const handleDataUpdate = (event: Event) => {
			const customEvent = event as CustomEvent<{ rooms: HotelRoom[]; gallery: string[] }>;
			setRooms(customEvent.detail.rooms);
			setGallery(customEvent.detail.gallery);
		};

		window.addEventListener("hotelDataUpdated", handleDataUpdate);

		// Also listen for storage events from other tabs
		interface StorageEventWithKey extends StorageEvent {
			key: string | null;
		}

		const handleStorageChange = (event: StorageEventWithKey) => {
			if (event.key === ROOMS_KEY) {
				setRooms(getRooms());
			} else if (event.key === GALLERY_KEY) {
				setGallery(getGalleryImages());
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("hotelDataUpdated", handleDataUpdate);
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	return { rooms, gallery };
};

// Utility functions
export const getApprovedTestimonials = () => {
	if (typeof window === "undefined") return [];

	try {
		const testimonials = JSON.parse(
			localStorage.getItem("testimonials_user_submitted") || "[]"
		);
		return testimonials.filter((t: { status: string }) => t.status === "approved");
	} catch (error) {
		console.warn("Error reading testimonials:", error);
		return [];
	}
};

// For debugging - call this in your app to check what data is being used
export const debugHotelData = () => {
	console.log("🔍 HOTEL DATA DEBUG:");
	console.log("Current rooms:", getRooms().length);
	console.log("Current gallery:", getGalleryImages().length);
	console.log("Approved testimonials:", getApprovedTestimonials().length);
	console.log("Rooms data:", getRooms());
	console.log("Gallery data:", getGalleryImages());
};