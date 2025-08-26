import React, { useState, useEffect } from "react";
import { Star, Users, MapPin, MessageCircle, Quote, Bed, BedSingle } from "lucide-react";

const stats = [
	{
		label: "Guest Rating",
		value: "9.5",
		icon: (
			 <img
                  src="/assets/img/Booking-Logo.png"
                  alt="Booking.com"
                  className="h-4 sm:h-5 w-auto"
                />),
	},
	{
		label: "Reviews",
		value: "674",
		icon: <MessageCircle className="w-4 h-4 text-emerald-700" />,
	},
	{
		label: "Rooms",
		value: "8",
		icon: <BedSingle className="w-4 h-4 text-emerald-700" />,
	},
];

const testimonials = [
	{
		name: "Laurent",
		country: "France",
		room: "Suite with Terrace",
		nights: 2,
		date: "August 21, 2025",
		type: "Family",
		rating: 10,
		comment:
			"A huge thank you to Rachid for this wonderful family stay! Everything was perfect: the kind welcome, the comfortable accommodation, and the view from the room and terrace... just magical, we never get tired of it! The dinner was a real treat, prepared with heart and authentic flavors that delighted us. And above all, Rachid was incredibly attentive: I forgot a sweater and he kindly sent it to me by courier to Marrakech so I could get it before the end of my vacation. What service! We leave with beautiful memories and much gratitude. I highly recommend this place, not only for its beauty but especially for Rachid's humanity and generosity.",
		reply: "Thank you very much for your review. We look forward to welcoming you again!",
	},
	{
		name: "Nicolas",
		country: "France",
		room: "Family Room with Private Bathroom",
		nights: 1,
		date: "August 10, 2025",
		type: "Family",
		rating: 10,
		comment:
			"Everything was superb: the meal, the sublime view from the room and restaurant, the very comfortable and beautiful room, and the staff's truly generous and kind welcome! The suggested walks nearby.",
		reply: "Thank you very much my brother Mehdi for your review.",
	},
	{
		name: "Karim",
		country: "Morocco",
		room: "Double or Twin Room",
		nights: 2,
		date: "August 6, 2025",
		type: "Solo Traveler",
		rating: 10,
		comment:
			"Exceptional stay at Riad 4 Seasons in Imlil! Everything was perfect from start to finish: the warm welcome from Brahim and his daughter Bouchra, always attentive, the quality of homemade meals, impeccable cleanliness, and the unique location overlooking the Atlas mountains with Toubkal in front. The rooms, tastefully decorated in an authentic style, highlight local craftsmanship and create a truly unique atmosphere. Highly recommended!",
		reply: "Thank you very much for your review.",
	},
	{
		name: "Amal",
		country: "France",
		room: "Deluxe Double Room with Balcony",
		nights: 1,
		date: "August 3, 2025",
		type: "Couple",
		rating: 10,
		comment:
			"The hotel is exceptional in terms of location. The scenery is breathtaking. A real change of scenery. Special thanks to Bouchra for her warm welcome.",
		reply: "Thank you very much for your review. Looking forward...",
	},
	{
		name: "Manon",
		country: "Belgium",
		room: "Suite with Terrace",
		nights: 1,
		date: "July 23, 2025",
		type: "Family",
		rating: 10,
		comment:
			"A gem you'd want to keep secret. The view and location are exceptional, Brahim and his family welcomed us with great generosity and kindness. And we enjoyed delicious meals in the evening and morning. Simply perfect. Thank you again.",
		reply: "Thank you very much for your review. Looking forward...",
	},
	{
		name: "Abdelaziz",
		country: "Morocco",
		room: "Family Room with Private Bathroom",
		nights: 3,
		date: "July 21, 2025",
		type: "Family",
		rating: 10,
		comment:
			"Very calm and clean place, excellent staff, keep up the good work...",
		reply: "Thank you very much for your review.",
	},
	{
		name: "Oumayma",
		country: "Morocco",
		room: "Double or Twin Room",
		nights: 1,
		date: "July 17, 2025",
		type: "Couple",
		rating: 10,
		comment: "They are just incredibly perfect.",
		reply: "Thank you very much for your review.",
	},
	{
		name: "Jérôme",
		country: "France",
		room: "Suite with Terrace",
		nights: 1,
		date: "July 13, 2025",
		type: "Family",
		rating: 9,
		comment: "Very welcoming and friendly staff.",
		reply: "Thank you very much for your review.",
	},
	{
		name: "Fatima",
		country: "Morocco",
		room: "Deluxe Double Room",
		nights: 2,
		date: "September 2, 2025",
		type: "Couple",
		rating: 10,
		comment:
			"Wonderful stay! The staff was very friendly and the food was delicious. The view from our room was breathtaking. Highly recommended for a relaxing getaway.",
		reply: "Thank you Fatima for your kind words. Hope to see you again soon!",
	},
];

const LOCAL_KEY = "testimonials_user_submitted";

type Testimonial = {
	name: string;
	country: string;
	room: string;
	nights: number;
	date: string;
	type: string;
	rating: number;
	comment: string;
	reply?: string;
};

type TestimonialCardProps = {
	testimonial: Testimonial;
	className?: string;
};

const TestimonialCard = ({ testimonial, className = "" }: TestimonialCardProps) => {
	return (
		<div className={`break-inside-avoid mb-6 bg-white border border-stone-200/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between ${className}`}>
			{/* Subtle gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-stone-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
			{/* Quote icon */}
			<div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
				<Quote className="w-8 h-8 text-emerald-600" />
			</div>
			<div className="relative z-10 flex flex-col h-full">
				{/* Rating */}
				<div className="flex items-center gap-3 mb-4 md:mb-6">
					<div className="flex items-center gap-1">
						{[...Array(5)].map((_, i) => (
							<Star 
								key={i} 
								className={`w-4 h-4 ${
									i < Math.floor(testimonial.rating / 2) 
										? "text-amber-400 fill-amber-400" 
										: "text-stone-200 fill-stone-200"
								}`} 
							/>
						))}
					</div>
					<span className="text-lg font-semibold text-stone-800 tracking-tight">
						{testimonial.rating}/10
					</span>
				</div>

				{/* Comment - always full */}
				<div className="mb-4 md:mb-6 flex-grow">
					<p className="text-stone-700 leading-relaxed text-sm md:text-base font-light">
						&lt;{testimonial.comment}&gt;
					</p>
				</div>

				{/* Guest Info - always at bottom */}
				<div className="mt-auto relative">
					<div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
						<div className="flex items-center gap-2 text-stone-600">
							<div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-gradient-to-br from-emerald-100 to-stone-100 flex items-center justify-center">
								<span className="text-xs font-semibold text-emerald-700">
									{testimonial.name.charAt(0)}
								</span>
							</div>
							<div>
								<div className="flex items-center gap-1 text-sm font-medium text-stone-800">
									{testimonial.name}
									<span className="text-stone-400">•</span>
									<span className="text-stone-500">{testimonial.country}</span>
								</div>
							</div>
						</div>
						
						<div className="flex items-center gap-4 text-xs text-stone-500">
							<div className="flex items-center gap-1">
								<Users className="w-3 h-3" />
								<span className="truncate">{testimonial.room}</span>
							</div>
							<div className="flex items-center gap-1">
								<MapPin className="w-3 h-3" />
								<span>{testimonial.nights} night{testimonial.nights > 1 ? "s" : ""}</span>
							</div>
						</div>
						
						<div className="text-xs text-stone-400 font-medium tracking-wide">
							{testimonial.date}
						</div>
					</div>
					{/* Type badge in bottom right */}
					<div className="absolute bottom-0 right-0">
						<span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 shadow">
							{testimonial.type}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const Testimonials = () => {
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState({
		name: "",
		country: "",
		room: "",
		nights: 1,
		date: "",
		type: "",
		rating: 10,
		comment: "",
	});
	const [submitted, setSubmitted] = useState(false);
	
	type UserTestimonial = {
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
	
	const [userTestimonials, setUserTestimonials] = useState<UserTestimonial[]>([]);
	
	useEffect(() => {
		// Only show approved testimonials
		const stored: UserTestimonial[] = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
		setUserTestimonials(stored.filter((t: UserTestimonial) => t.status === "approved"));
	}, []);

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		const newTestimony = { ...form, status: "pending" };
		const stored = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
		localStorage.setItem(LOCAL_KEY, JSON.stringify([...stored, newTestimony]));
		setSubmitted(true);
		setShowForm(false);
		setForm({
			name: "",
			country: "",
			room: "",
			nights: 1,
			date: "",
			type: "",
			rating: 10,
			comment: "",
		});
	};

	const allTestimonials = [...testimonials, ...userTestimonials];

	return (
		<section
			className="min-h-screen bg-gradient-to-br  relative overflow-hidden py-12 pb-2" // reduced bottom padding
			id="testimonials"
		>
			<div className="relative z-40 w-full h-full md:border-[20px] border-white md:rounded-[3rem] overflow-hidden bg-white backdrop-blur-xl">
				<div className="relative z-60 px-6 md:px-8 max-w-7xl mx-auto py-12 md:py-16 pb-4"> {/* reduced bottom padding */}
					{/* Header */}
					<div className="text-center mb-16 md:mb-20">
						<div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-stone-200/50 rounded-full px-6 py-2 text-stone-600 shadow-sm mb-8">
							<Star className="w-4 h-4 text-emerald-600" />
							<span className="text-sm font-medium tracking-wide">
								Guest Reviews
							</span>
						</div>
						<h2 className="text-5xl font-extralight tracking-wide text-stone-800 mb-6 md:mb-8 leading-[0.9] tracking-tight">
							What our{" "}
							<span className="font-medium text-emerald-700">guests say</span>
						</h2>
						<p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
							Discover authentic experiences from our visitors at Riad Atlas 4
							Seasons.
						</p>
					</div>

					{/* Stats */}
					<div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 md:mb-16">
						{stats.map((stat, idx) => (
							<div key={idx} className="text-center group">
								<div className="flex items-center justify-center gap-2 mb-2 group-hover:scale-105 transition-transform duration-200">
									<span className="text-3xl font-light text-stone-800 tracking-tight">
										{stat.value}
									</span>
									{stat.icon}
								</div>
								<p className="text-sm text-stone-500 tracking-wide font-medium">
									{stat.label}
								</p>
							</div>
						))}
					</div>

					{/* Masonry layout with aligned first row */}
					<div 
						className="columns-1 md:columns-2 gap-6"
						style={{
							columnFill: 'balance'
						}}
					>
						{allTestimonials.map((testimonial, index) => (
							<TestimonialCard 
								testimonial={testimonial} 
								key={index} 
								className={index < 2 ? "mt-0" : ""}
							/>
						))}
					</div>

					{/* Write a Review CTA */}
					<div className="mt-12 md:mt-16 text-center px-2 sm:px-0">
						<button
							className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-12 py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-emerald-900/25 transition-all duration-500 mx-auto text-lg hover:scale-105"
							onClick={() => setShowForm(true)}
						>
							<MessageCircle className="w-5 h-5" />
							<span>Write a review</span>
						</button>
						<div className="text-xs text-stone-400 mt-4 font-medium tracking-wide">
							Our goal: 100% authentic reviews
						</div>
						{submitted && (
							<div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200">
								<div className="w-2 h-2 rounded-full bg-emerald-500" />
								Thank you! Your review will be published after validation.
							</div>
						)}
					</div>

					{/* Form Modal - keeping the original design */}
					{showForm && (
						<div
							className="fixed inset-0 bg-gradient-to-br from-black/40 via-stone-900/30 to-emerald-900/20 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
							onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
						>
							<div className="relative bg-white/95 backdrop-blur-md rounded-t-2xl sm:rounded-3xl shadow-2xl w-full h-full sm:w-full sm:max-w-2xl sm:h-auto sm:max-h-[90vh] overflow-y-auto border border-stone-200/50 flex flex-col">
								{/* Modal Header */}
								<div className="bg-gradient-to-r from-emerald-50 to-stone-50 px-4 sm:px-8 py-4 sm:py-6 border-b border-stone-200/50">
									<div className="flex items-center justify-between">
										<div>
											<h2 className="text-2xl font-light text-stone-800 mb-1">
												Share your experience
											</h2>
											<p className="text-sm text-stone-600">
												Your feedback helps us improve our services
											</p>
										</div>
										<button
											onClick={() => setShowForm(false)}
											className="w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-stone-200/50 flex items-center justify-center text-stone-400 hover:text-stone-600 transition-all duration-200"
										>
											×
										</button>
									</div>
								</div>

								{/* Modal Body */}
								<div className="flex-1 overflow-y-auto">
									<div className="p-4 sm:p-8 space-y-6">
										{/* Personal Info Section */}
										<div className="space-y-4">
											<h3 className="text-lg font-medium text-stone-700 flex items-center gap-2">
												<Users className="w-5 h-5 text-emerald-600" />
												Personal Information
											</h3>
											<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
												<div className="relative group">
													<input
														type="text"
														required
														placeholder="Your name"
														value={form.name}
														onChange={(e) =>
															setForm({ ...form, name: e.target.value })
														}
														className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder:text-stone-400"
													/>
												</div>
												<div className="relative group">
													<input
														type="text"
														required
														placeholder="Country"
														value={form.country}
														onChange={(e) =>
															setForm({ ...form, country: e.target.value })
														}
														className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder:text-stone-400"
													/>
												</div>
											</div>
										</div>

										{/* Stay Details Section */}
										<div className="space-y-4">
											<h3 className="text-lg font-medium text-stone-700 flex items-center gap-2">
												<MapPin className="w-5 h-5 text-emerald-600" />
												Stay Details
											</h3>
											<div className="space-y-4">
												<input
													type="text"
													required
													placeholder="Room type"
													value={form.room}
													onChange={(e) =>
														setForm({ ...form, room: e.target.value })
													}
													className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder:text-stone-400"
												/>
												<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
													<input
														type="number"
														min={1}
														required
														placeholder="Number of nights"
														value={form.nights}
														onChange={(e) =>
															setForm({
																...form,
																nights: Number(e.target.value),
															})
														}
														className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder:text-stone-400"
													/>
													<input
														type="text"
														required
														placeholder="Date (e.g. August 21, 2025)"
														value={form.date}
														onChange={(e) =>
															setForm({ ...form, date: e.target.value })
														}
														className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder:text-stone-400"
													/>
													<select
														required
														value={form.type}
														onChange={(e) =>
															setForm({ ...form, type: e.target.value })
														}
														className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-stone-600"
													>
														<option value="">Type of stay</option>
														<option value="Family">Family</option>
														<option value="Couple">Couple</option>
														<option value="Solo Traveler">
															Solo Traveler
														</option>
														<option value="With friends">With friends</option>
														<option value="Business trip">Business trip</option>
													</select>
												</div>
											</div>
										</div>

										{/* Rating Section */}
										<div className="space-y-4">
											<h3 className="text-lg font-medium text-stone-700 flex items-center gap-2">
												<Star className="w-5 h-5 text-emerald-600" />
												Rating
											</h3>
											<div className="flex flex-wrap items-center gap-2 sm:gap-4">
												<div className="flex items-center gap-1">
													{[...Array(10)].map((_, i) => (
														<button
															key={i}
															type="button"
															onClick={() =>
																setForm({ ...form, rating: i + 1 })
															}
															className={`w-8 h-8 rounded-full transition-all duration-200 ${
																i + 1 <= form.rating
																	? "bg-emerald-500 text-white shadow-sm"
																	: "bg-stone-100 text-stone-400 hover:bg-stone-200"
															}`}
														>
															{i + 1}
														</button>
													))}
												</div>
												<span className="text-lg font-medium text-emerald-600">
													{form.rating}/10
												</span>
											</div>
										</div>

										{/* Comment Section */}
										<div className="space-y-4">
											<h3 className="text-lg font-medium text-stone-700 flex items-center gap-2">
												<MessageCircle className="w-5 h-5 text-emerald-600" />
												Your review
											</h3>
											<textarea
												required
												placeholder="Share your experience at Riad Atlas 4 Seasons..."
												value={form.comment}
												onChange={(e) =>
													setForm({ ...form, comment: e.target.value })
												}
												className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder:text-stone-400 min-h-[100px] sm:min-h-[120px] resize-none text-base"
												rows={4}
											/>
											<p className="text-xs text-stone-500">
												Your review will be published after validation by our
												team.
											</p>
										</div>

										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end pt-4 sm:pt-6 border-t border-stone-200/50">
											<button
												type="button"
												onClick={() => setShowForm(false)}
												className="px-8 py-3 text-stone-600 hover:bg-stone-50 rounded-2xl transition-all duration-300 font-medium order-2 sm:order-1"
											>
												Cancel
											</button>
											<button
												onClick={handleSubmit}
												className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-2xl shadow-lg hover:shadow-emerald-900/25 transition-all duration-300 font-medium order-1 sm:order-2 flex items-center justify-center gap-2"
											>
												<MessageCircle className="w-4 h-4" />
												Publish my review
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;