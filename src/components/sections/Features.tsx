import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, MapPin, Users, Mountain, Eye, Star, Phone, Mail, Coffee } from "lucide-react";
import { useHotelData } from "../../lib/hotelDataManager";

// Define the experiences offered
const experiences = [
	{
		icon: <Mountain className="w-8 h-8" />,
		title: "Atlas Mountain Treks",
		description:
			"Guided hiking adventures through Berber villages and scenic mountain trails with breathtaking panoramic views.",
	},
	{
		icon: <Coffee className="w-8 h-8" />,
		title: "Traditional Cooking Classes",
		description:
			"Learn to prepare authentic tagines and couscous with local ingredients from our organic garden.",
	},
	{
		icon: <Eye className="w-8 h-8" />,
		title: "Cultural Immersion",
		description:
			"Visit local markets, traditional crafts workshops, and experience genuine Berber hospitality.",
	},
];

// Helper to resolve image paths
const getImageSrc = (src: string) => {
	// If using Create React App, use process.env.PUBLIC_URL
	// If using Vite, use import.meta.env.BASE_URL
	// Here, we use process.env.PUBLIC_URL for compatibility
	return `${process.env.PUBLIC_URL || ""}${src}`;
};

const Features = () => {
	// Use hotel data from the manager (reactive, auto-updates)
	const { rooms: adminRooms, gallery: adminGallery } = useHotelData();

	const [galleryOpen, setGalleryOpen] = useState(false);
	const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const roomsRef = useRef(null);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const openGallery = (images: string[], index = 0) => {
		setCurrentGalleryImages(images);
		setGalleryIndex(index);
		setGalleryOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeGallery = () => {
		setGalleryOpen(false);
		document.body.style.overflow = "unset";
	};

	const nextImage = () => {
		setGalleryIndex((prev) => (prev + 1) % currentGalleryImages.length);
	};

	const prevImage = () => {
		setGalleryIndex((prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length);
	};

	const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
	return (
		<div className="min-h-screen bg-white">
			{/* Enhanced Hero Section */}
			<section className="relative h-screen flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<img
						src={getImageSrc("/assets/img/view.jpg")}
						alt="Atlas Mountain View"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
				</div>

				<div className="relative z-10 text-center text-white px-6 max-w-5xl">
					<div className="animate-fadeInUp">
						<div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8 opacity-80" />
						<h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight mb-8 tracking-widest leading-tight">
							Atlas Mountain
							<span className="block text-4xl md:text-6xl lg:text-7xl mt-2 font-thin opacity-90">Retreat</span>
						</h1>
						<p className="text-lg md:text-xl lg:text-2xl font-light opacity-90 mb-16 max-w-3xl mx-auto leading-relaxed">
							Where ancient Berber traditions meet modern luxury in the heart of Morocco&#39;s majestic mountains
						</p>
						<div className="flex flex-col sm:flex-row gap-6 justify-center">
							{/* Removed Explore Rooms button */}
						</div>
					</div>
				</div>
			</section>

			{/* Enhanced Rooms Section */}
			<section ref={roomsRef} className="py-20 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-20">
						<div className="w-24 h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent mx-auto mb-8" />
						<h2 className="text-4xl lg:text-6xl font-extralight text-neutral-900 mb-8 tracking-wider">
							Luxury Accommodations
						</h2>
						<p className="text-xl text-neutral-600 leading-relaxed font-light max-w-3xl mx-auto">
							Each room is a sanctuary of comfort, meticulously designed to showcase the beauty of traditional Moroccan
							craftsmanship while providing modern amenities
						</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
						{(adminRooms || []).map((room, idx) => (
							<div
								key={idx}
								className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2
									sm:max-w-full sm:w-full sm:mx-auto
									"
								onMouseEnter={() => setHoveredRoom(idx)}
								onMouseLeave={() => setHoveredRoom(null)}
							>
								<div className="relative overflow-hidden">
									{/* Show all images as thumbnails */}
									<div className="flex gap-2 mb-2 overflow-x-auto">
										{room.images.map((img, i) => (
											<img
												key={i}
												src={getImageSrc(img)}
												alt={`${room.name} ${i + 1}`}
												className="w-20 h-16 object-cover rounded cursor-pointer border border-neutral-200
													sm:w-16 sm:h-12"
												onClick={() => openGallery(room.images, i)}
											/>
										))}
									</div>
									{/* Main image */}
									<img
										src={getImageSrc(room.images[0])}
										alt={room.name}
										className="w-full h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-1000
											sm:h-48"
										onClick={() => openGallery(room.images)}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm
										sm:top-2 sm:right-2 sm:px-2 sm:py-0.5 sm:text-xs">
										{room.images.length} photos
									</div>
									<button
										onClick={() => openGallery(room.images)}
										className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									>
										<div className="bg-white/90 backdrop-blur-sm text-neutral-900 px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500
											sm:px-3 sm:py-2 sm:text-sm">
											View Gallery
										</div>
									</button>
								</div>
								<div className="p-8 sm:p-4">
									<div className="flex justify-between items-start mb-4 sm:flex-col sm:gap-2">
										<h3 className="text-2xl lg:text-3xl font-light text-neutral-900 leading-tight sm:text-lg">{room.name}</h3>
										<div className="text-right sm:text-left">
											<div className="flex items-center space-x-1 mb-1">
												<Star className="w-4 h-4 fill-amber-400 text-amber-400" />
												<span className="text-sm font-medium text-neutral-700">{room.rating}</span>
												<span className="text-xs text-neutral-500">({room.reviews})</span>
											</div>
											<div className="text-sm text-neutral-600">{room.details}</div>
										</div>
									</div>
									<div className="flex items-center space-x-4 text-sm text-neutral-600 mb-2 sm:space-x-2 sm:text-xs">
										<div className="flex items-center space-x-1">
											<Users className="w-4 h-4" />
											<span>{room.capacity}</span>
										</div>
										<div className="flex items-center space-x-1">
											<MapPin className="w-4 h-4" />
											<span>{room.beds}</span>
										</div>
									</div>
									<div className="text-sm text-neutral-600 mb-2 sm:text-xs">
										<strong>Details:</strong> {room.details}
									</div>
									<div className="text-sm text-neutral-600 mb-2 sm:text-xs">
										<strong>Beds:</strong> {room.beds}
									</div>
									<div className="text-sm text-neutral-600 mb-2 sm:text-xs">
										<strong>Capacity:</strong> {room.capacity}
									</div>
									<div className="flex flex-wrap gap-2 mb-2">
										<strong className="text-sm text-neutral-600 sm:text-xs">Amenities:</strong>
										{room.amenities.map((amenity, i) => (
											<span
												key={i}
												className="text-xs px-3 py-2 bg-gradient-to-r from-neutral-100 to-neutral-50 text-neutral-700 font-medium tracking-wide rounded-full border border-neutral-200
													sm:px-2 sm:py-1"
											>
												{amenity}
											</span>
										))}
									</div>
									<div className="text-sm text-neutral-600 mb-2 sm:text-xs">
										<strong>Rating:</strong> {room.rating} ({room.reviews} reviews)
									</div>
									<div className="text-sm text-neutral-600 mb-2 sm:text-xs">
										<strong>Price:</strong> {room.price}
									</div>
									<div className="text-sm text-neutral-600 mb-2 sm:text-xs">
										<strong>Original Price:</strong> {room.originalPrice}
									</div>
									<div className="flex justify-between items-center pt-6 border-t border-neutral-100 sm:flex-col sm:pt-2 sm:gap-2">
										<div>
											<div className="text-sm text-neutral-500 line-through sm:text-xs">{room.originalPrice}</div>
											<div className="text-lg font-medium text-neutral-900 sm:text-base">{room.price}</div>
										</div>
										<button className="group bg-neutral-900 text-white px-8 py-3 font-medium hover:bg-neutral-800 transition-all duration-300 rounded-full overflow-hidden relative
											sm:px-4 sm:py-2 sm:text-sm">
											<span className="relative z-10">Reserve Now</span>
											<div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Enhanced Gallery Modal */}
			{galleryOpen && (
				<div className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 backdrop-blur-sm">
					{/* Add top padding to avoid floating navbar overlap */}
					<div className="relative w-full h-full flex items-center justify-center p-4 pt-24
						sm:p-1 sm:pt-16">
						{/* Move X button next to image card */}
						<div className="relative max-w-6xl max-h-full flex items-center
							sm:max-w-full sm:flex-col sm:items-center sm:justify-center">
							<img
								src={getImageSrc(currentGalleryImages[galleryIndex])}
								alt="Gallery"
								className="max-w-full max-h-[80vh] object-contain rounded-lg
									sm:max-h-[60vh] sm:w-full"
								// Optionally add box-shadow for separation
								style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
							/>
							<button
								className="ml-4 z-70 text-white hover:text-neutral-300 transition-colors duration-300 bg-black/50 backdrop-blur-sm rounded-full p-3 self-start
									sm:ml-0 sm:mt-2 sm:self-center"
								onClick={closeGallery}
								style={{ position: "static" }}
							>
								<X className="w-6 h-6" />
							</button>
							{/* Navigation buttons */}
							{currentGalleryImages.length > 1 && (
								<>
									<button
										className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-neutral-300 transition-colors duration-300 bg-black/50 backdrop-blur-sm rounded-full p-3
											sm:left-2 sm:top-1/2 sm:p-2"
										onClick={prevImage}
									>
										<ChevronLeft className="w-6 h-6 sm:w-5 sm:h-5" />
									</button>
									<button
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-neutral-300 transition-colors duration-300 bg-black/50 backdrop-blur-sm rounded-full p-3
											sm:right-2 sm:top-1/2 sm:p-2"
										onClick={nextImage}
									>
										<ChevronRight className="w-6 h-6 sm:w-5 sm:h-5" />
									</button>
								</>
							)}
						</div>
						<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full
							sm:bottom-2 sm:px-2 sm:py-1 sm:text-xs">
							{galleryIndex + 1} / {currentGalleryImages.length}
						</div>
					</div>
				</div>
			)}

			{/* Enhanced Gallery Section */}
			<section className="py-20 lg:py-32 bg-neutral-900">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8" />
						<h2 className="text-4xl lg:text-6xl font-extralight text-white mb-8 tracking-wider">
							Visual Journey
						</h2>
						<p className="text-xl text-neutral-300 leading-relaxed font-light max-w-3xl mx-auto">
							Experience the soul of our riad through these moments that capture the essence of Moroccan beauty and
							tranquility
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{(adminGallery || []).map((img, idx) => (
							<div
								key={idx}
								className={`group relative overflow-hidden cursor-pointer rounded-xl ${
									idx % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""
								}`}
								onClick={() => openGallery(adminGallery, idx)}
							>
								<img
									src={getImageSrc(img)}
									alt={`Gallery ${idx + 1}`}
									className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
										idx % 7 === 0 ? "h-80 lg:h-96" : "h-40 md:h-60 lg:h-80"
									}`}
								/>
								<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
								<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
									<Eye className="w-8 h-8 text-white" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Enhanced Experience Section */}
			<section className="py-20 lg:py-32 bg-gradient-to-b from-white to-neutral-50">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<div className="w-24 h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent mx-auto mb-8" />
						<h2 className="text-4xl lg:text-6xl font-extralight text-neutral-900 mb-8 tracking-wider">
							Authentic Experiences
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{experiences.map((exp, idx) => (
							<div
								key={idx}
								className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
							>
								<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
									{exp.icon}
								</div>
								<h3 className="text-2xl font-light text-neutral-900 mb-4">{exp.title}</h3>
								<p className="text-neutral-600 font-light leading-relaxed">{exp.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Enhanced CTA Section */}
			<section className="py-20 lg:py-32 relative overflow-hidden">
				<div className="absolute inset-0">
					<img
						src={getImageSrc("/assets/img/MOUNT.jpg")}
						alt="Mountains"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
				</div>

				<div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
					<div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8" />
					<h2 className="text-4xl lg:text-6xl font-extralight mb-8 tracking-wider">Begin Your Journey</h2>
					<p className="text-xl font-light leading-relaxed max-w-3xl mx-auto mb-12 opacity-90">
						Escape to a world where time slows down and every moment is crafted for your comfort. Let the Atlas
						Mountains embrace you with their timeless beauty.
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						{/* Removed Book Your Escape button */}
						{/* <button className="group relative bg-white text-neutral-900 px-12 py-5 text-lg font-medium hover:bg-neutral-100 transition-all duration-500 overflow-hidden rounded-full">
              <span className="relative z-10">Book Your Escape</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button> */}
						<button className="border-2 border-white/60 text-white px-12 py-5 text-lg font-light hover:bg-white/20 hover:border-white transition-all duration-500 backdrop-blur-sm rounded-full">
							<div className="flex items-center space-x-2">
								<Phone className="w-5 h-5" />
								<span>Call Us</span>
							</div>
						</button>
					</div>

					<div className="mt-12 flex justify-center space-x-8 text-sm">
						<div className="flex items-center space-x-2 opacity-80">
							<Mail className="w-4 h-4" />
							<span>info@atlasretreat.com</span>
						</div>
						<div className="flex items-center space-x-2 opacity-80">
							<Phone className="w-4 h-4" />
							<span>+212 524 123 456</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Features;