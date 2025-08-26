'use client';

import React, { useState, useEffect } from "react";
import Navigation, { NAVBAR_HEIGHT } from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { Mountain, Globe, Star, Bike, ChefHat, Activity, Clock, Users, MapPin, Camera, Compass, TreePine, Zap, Award, Target, Landmark, Tent, MountainSnow, Map, Calendar, Trophy, Route, Footprints, Building2, Trees, Flag, Sun } from "lucide-react";

// Custom icon components for camel, beach, and desert
const CamelIcon = () => (
	<img src="/assets/icons/camel.png" alt="Camel" className="w-10 h-10 object-contain" />
);
const BeachIcon = () => (
	<img src="/assets/icons/bachh.png" alt="Beach" className="w-10 h-10 object-contain" />
);
const DesertIcon = () => (
	<img src="/assets/icons/desert.png" alt="Desert" className="w-10 h-10 object-contain" />
);

const tours = [
	{
		id: 1,
		icon: CamelIcon,
		title: "Atlas Camel Trek",
		short: "Juniper & pine forest trek with views of Mount Toubkal.",
		overview: `Our camel trek follows a route through juniper and pine forest, passing many villages near Asni, with fine views of Mount Toubkal (4,167m), the highest peak in North Africa.
You will be picked up from your Hotel or Riad in Marrakech in the morning. The drive takes 45 minutes from Marrakech. You will meet your camel and be given basic instructions before starting the trek from Moulay Brahim.
The camel ride will last for 3 hours before we have lunch at a Berber house. After lunch, we meet our driver, who will take you back to Marrakech.`,
		duration: "1 Day",
		price: "Ask",
		itinerary: null
	},
	{
		id: 2,
		icon: Mountain,
		title: "Day Excursion to Imlil Valley",
		short: "Explore waterfalls & Berber villages in the Atlas Mountains.",
		overview: `Your day excursion to Imlil Valley starts at 9:00 am from Marrakech (1h30 drive). You will face the great Atlas Mountains, especially Mount Toubkal (4167m).
With your guide, you’ll explore waterfalls and Berber villages, and share a cup of tea with a Berber family. You’ll learn about their traditions and lifestyle.
The walking time depends on your ability (1–3 hours). You also have the option of riding mules. A delicious lunch will be served in a Berber house.
After lunch, your guide will walk you down to Imlil where your driver takes you back to Marrakech.`,
		duration: "1 Day",
		price: "Ask",
		itinerary: null
	},
	{
		id: 3,
		icon: Route,
		title: "One Week Trek to Toubkal",
		short: "Circle Jebel Toubkal via valleys, villages & high passes.",
		overview: `This trek circles Jebel Toubkal through varied landscapes: lush valleys, Berber villages, and high mountain passes. It is a demanding trek recommended for summer, passing by Ifni Lake, the highest and most beautiful in Morocco.`,
		duration: "7 Days",
		price: "Ask",
		itinerary: `Day 1: Marrakech → Imlil (1740m) → Tizi N’Tamatert (2279m) → Tachdirte (2400m)
1h drive + 4h walk
Day 2: Tachdirte → Tizi n’Likemt (3550m) → Aazib N’Likmet (2250m)
6h walk
Day 3: Aazib N’Likmet → Tizi Oarai (3109m) → Amsouzarte (1740m)
5h walk
Day 4: Amsouzarte → villages → Lake Ifni (2295m)
5h walk
Day 5: Lake Ifni → Tizi Ouanoums (3670m) → Neltner Refuge (3207m)
6h walk
Day 6: Refuge → Summit of Toubkal (4167m) → Imlil → Marrakech
8h walk`
	},
	{
		id: 4,
		icon: Footprints,
		title: "Toubkal Ascent via Aguelzim Pass",
		short: "3-day trek via Aguelzim Pass with stunning Atlas views.",
		overview: `Aguelzim Mountain (3,560m) above Azzaden Valley offers stunning views of the Atlas summit. The trek is tough but very rewarding.`,
		duration: "3 Days",
		price: "Ask",
		itinerary: `Day 1: Marrakech → Imlil (1780m) → Tizi n’Mzik (2450m) → Tamsoult Refuge (3000m)
6h trek
Day 2: Tamsoult → Aguelzim Pass (3560m) → Toubkal Refuge (3207m)
6–7h trek
Day 3: Refuge → Summit of Toubkal (4167m) → Sidi Chamharouch → Imlil → Marrakech
8–9h trek`
	},
	{
		id: 5,
		icon: DesertIcon,
		title: "3 Days Desert Tour: Marrakech → Merzouga (Sahara)",
		short: "High Atlas, gorges, kasbahs, camel trek & desert camping.",
		overview: `A 3-day desert tour through the High Atlas, Dades & Todra Gorges, valleys, kasbahs, and Erg Chebbi dunes. Includes camel trek, desert camping, and Berber culture.`,
		duration: "3 Days",
		price: "Ask",
		itinerary: `Day 1: Marrakech → Telouat → Ait Ben Haddou → Skoura → Rose Valley → Dades Gorge. Overnight in hotel.
Day 2: Dades Gorge → Todra Gorge → Erfoud → Merzouga. Camel trek at sunset, sandboarding, Berber tents, drum music.
Day 3: Merzouga → Ouarzazate → Marrakech.`
	},
	{
		id: 6,
		icon: Trees,
		title: "2 Days Trek: Imlil → Tizi Oussem → Marrakech",
		short: "Trek via waterfalls & Berber villages, overnight in guest house.",
		overview: "",
		duration: "2 Days",
		price: "Ask",
		itinerary: `Day 1: Marrakech → Imlil (1740m) → Tizi Mzik (2684m) → Tamsoulte Waterfalls → Tizi Oussem (1850m). Overnight in Berber guest house.
Day 2: Tizi Oussem → Id Issa → Tizi Oudid (2000m) → Matat → Agersioual → Marrakech.`
	},
	{
		id: 7,
		icon: BeachIcon,
		title: "Essaouira Beach Day Excursion",
		short: "Argan cooperative, UNESCO medina, beach walk & seafood.",
		overview: `Pick-up 07:30am from Marrakech. Stops include a women’s Argan cooperative and Essaouira’s UNESCO medina. Visit Skala du Fort, the Jewish quarter, handicraft markets, beach walk, and enjoy fresh seafood. Return to Marrakech.`,
		duration: "1 Day",
		price: "Ask",
		itinerary: null
	},
	{
		id: 8,
		icon: Building2,
		title: "Imperial Cities Tour",
		short: "7-day tour of Casablanca, Rabat, Meknes, Fes, Marrakech.",
		overview: `Explore Morocco’s four imperial cities (Casablanca, Rabat, Meknes, Fes, Marrakech) with Roman ruins, souks, palaces, mosques, and Atlas landscapes.`,
		duration: "7 Days",
		price: "Ask",
		itinerary: `Day 1: Casablanca city tour
Day 2: Casablanca → Rabat (Royal Palace, Mausoleum, Hassan Tower, Kasbahs)
Day 3: Rabat → Moulay Idriss → Volubilis → Meknes → Fes
Day 4: Explore Fes (spiritual & cultural heart)
Day 5: Fes → Middle Atlas (Azrou, Ifrane) → Beni Mellal → Marrakech
Day 6: Marrakech monuments, souks, Jemaa el-Fna
Day 7: Atlas Mountains (Toubkal Massif villages) → Marrakech or Casablanca`
	},
	{
		id: 9,
		icon: Sun,
		title: "Marrakech → Zagora Desert (2 Days)",
		short: "Sunset camel trek, desert camp, Atlas & kasbahs.",
		overview: "",
		duration: "2 Days",
		price: "Ask",
		itinerary: `Day 1: Marrakech → Tizi n’Tichka → Ait Ben Haddou → Ouarzazate → Agdez → Zagora. Sunset camel trek + camp in desert tents.
Day 2: Zagora → Ouarzazate → Atlas Mountains → Marrakech.`
	},
	{
		id: 10,
		icon: Map,
		title: "3 Days Trek: Imlil → Ourika Valley",
		short: "Trek across valleys, Berber villages, rivers & waterfalls.",
		overview: `Trek across Imlil, Imnane, and Ourika Valleys, passing Berber villages, rivers, and waterfalls.`,
		duration: "3 Days",
		price: "Ask",
		itinerary: `Day 1: Marrakech → Imlil → Tizi n’Tamatert (2279m) → Tachdirte (2300m). Camp.
Day 2: Tachdirte → Tizi n’Tachdirte → Ibbassen → Timichi. Guest house.
Day 3: Timichi → Tiourdiou → Setti Fadma → Marrakech.`
	},
	{
		id: 11,
		icon: MountainSnow,
		title: "Mount Toubkal Climb (2 Days)",
		short: "Climb North Africa's highest peak (4167m).",
		overview: `Climb the highest peak in North Africa (4167m). No technical mountaineering required.`,
		duration: "2 Days",
		price: "Ask",
		itinerary: `Day 1: Marrakech → Imlil (1740m) → Sidi Chamharouch (2500m) → Toubkal Refuge (3207m). Overnight in refuge or tent.
Day 2: Refuge → Summit of Toubkal (4167m) → Imlil → Marrakech.`
	}
];

const mtbTours = [
	{
		id: 1,
		icon: Bike,
		title: "4 Days MTB Atlas Mountains",
		short: "March–November. 4 days of singletrack, valleys, and villages.",
		overview: `Period: March – November
Duration: 4 Days / 3 Nights`,
		itinerary: `Day 1: Marrakech → Imlil → Imi Oughelad
Transfer from Marrakech to Imlil. Start riding with a climb to a mountain pass (tea & biscuits stop). Flowing singletrack through Tacheddirt, Tamguist, and Amssakrou villages. Lunch by the riverbed. Afternoon climb + descent. Overnight in Gite at Imi Oughelad.

Day 2: Imi Oughelad → Id Aissa
Breakfast, then ride up dirt roads with views over Ait Mizan and nearby valleys. Cross Tacht Pass, descend into Azzaden Valley via villages to Tizi Oussem. Optional extension possible. Overnight in guest house.

Day 3: Id Aissa → Ouirgane → Ait Zitoune
Full day of singletrack! Traverse villages with climbs (300–400m) and fast descents. Lunch in riverbed. Cross dam → enter spectacular gorge with breathtaking scenery. Gentle ride to gite at Ait Zitoune (near Amizmiz).

Day 4: Amizmiz → Kik Plateau → Asni → Marrakech
Climb to Kik Plateau, ride singletracks through villages and farmland, meet locals, and admire snow-capped Atlas views. Lunch near Asni. Transfer back to Marrakech.`
	},
	{
		id: 2,
		icon: Bike,
		title: "6 Days MTB Atlas Mountains",
		short: "March–November. Hard grade. Epic singletrack and technical climbs.",
		overview: `Period: March – November
Grade: Hard`,
		itinerary: `Day 1: Marrakech → Imlil → Imsker → Imi Oughelad
Transfer to Imlil. Start with climb to 2300m pass (tea & biscuits). Flowing singletrack via Tacheddirt, Tamguist, Amssakrou. Lunch in riverbed. Afternoon climb + descent to Imi Oughelad. Overnight stay.

Day 2: Imi Oughelad → Id Aissa (Azzaden Valley)
Challenging climb to a mountain pass (uplift option available). Descend via singletrack, shop stop (coke & cake). Short but technical descent before reaching Gite at Id Aissa.

Day 3: Id Aissa → Ouirgane → Amizmiz Valley (Ait Zitoune)
Singletrack traverse through villages. Steep climbs, fast descents. Lunch in riverbed. Cross dam into gorge with world-class singletrack. End at Ait Zitoune (near Amizmiz). Optional hammam in the evening.

Day 4: Amizmiz Valley → Ait Hamed
Tough climbing + singletrack challenges. Traverse + descent into riverbed, then technical ascent. Afternoon traverse through villages to Ait Ahmad. Overnight in village Gite.

Day 5: Ait Hamed → Ijoukak
Final ride day — traverse + climb to high pass (short hike-a-bike). Epic singletrack descent: fast at first, more technical lower down. Includes dry riverbed section. Finish with rickety bridge to van & late lunch. Optional extra 18km ride to Gite in Ijoukak.

Day 6: Ijoukak → Ouirgane → Marrakech
Breakfast, then ride up mountain and descend singletrack to Ouirgane. Lunch, then transfer back to Marrakech.`
	},
	{
		id: 3,
		icon: Bike,
		title: "5 Days MTB Atlas Mountains",
		short: "March–November. 5 days of climbs, singletrack, and olive groves.",
		overview: `Period: March – November
Duration: 5 Days / 4 Nights`,
		itinerary: `Day 1: Marrakech → Imlil → Imi Oughelad
Transfer to Imlil. Climb to pass (tea & biscuits), then singletrack via Tacheddirt, Tamguist, Amssakrou. Lunch in riverbed. Afternoon climb + descent. Overnight in Gite at Imi Oughelad.

Day 2: Imi Oughelad → Id Aissa
Ride dirt roads with valley views. Cross Tacht Pass, descend into Azzaden Valley, passing villages before reaching Tizi Oussem. Overnight in guest house at 1850m.

Day 3: Id Aissa → Ouirgane
Return along valley, then traverse to Tinzert village at the top of Ouirgane Park. Easy singletrack down to Ouirgane. Overnight stay.

Day 4: Ouirgane → Amizmiz (Ait Zitoune)
Ride through olive groves and across Tizi Ouzla. Enter Amizmiz Valley, passing villages and fields. Smooth singletracks lead to Ait Zitoune village. Optional hammam. Overnight stay.

Day 5: Amizmiz → Kik Plateau → Asni → Marrakech
Climb to Kik Plateau, ride singletracks through farmland and villages with Atlas views. Descend to Asni. Lunch, then transfer back to Marrakech.`
	}
];

const getDifficultyStyle = (difficulty: string) => {
	const styles: { [key: string]: string } = {
		'Epic': 'bg-gradient-to-r from-purple-200 to-pink-200 text-purple-900',
		'Mystical': 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-900',
		'Transcendent': 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-900',
		'Delicious': 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-900',
		'Artistic': 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-900',
		'Insane': 'bg-gradient-to-r from-red-200 to-orange-200 text-red-900',
		'Thrilling': 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-900',
		'Legendary': 'bg-gradient-to-r from-amber-100 to-red-100 text-amber-900',
		'Apprentice': 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-900',
		'Magical': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-900',
		'Technical': 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900'
	};
	return styles[difficulty] || 'bg-gray-100 text-gray-900';
};

type Tour = {
	id: number;
	icon: React.ElementType;
	title: string;
	short: string;
	overview?: string | null;
	duration?: string;
	price?: string;
	itinerary?: string | null;
};

type TourCardProps = {
	tour: Tour;
	expanded: boolean;
	onExpand: (id: number | null) => void;
};

const TourCard = ({ tour, expanded, onExpand }: TourCardProps) => (
	<div className="relative group">
		{/* Main Card Container */}
		<div
			className={`
				relative overflow-hidden cursor-pointer transition-all duration-500 ease-out
				bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl
				rounded-3xl hover:scale-[1.03] hover:shadow-emerald-500/20
				before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-50/30 before:via-white/10 before:to-teal-50/30
				before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
				${expanded ? "z-50" : ""}
			`}
			onClick={() => onExpand(tour.id)}
		>
			{/* Floating Orbs Background */}
			<div className="absolute inset-0 overflow-hidden rounded-3xl">
				<div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
				<div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-green-300/15 to-emerald-300/15 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000 delay-200"></div>
			</div>

			{/* Content Container */}
			<div className="relative flex flex-col p-6 z-10">
				{/* Header Section */}
				<div className="flex items-start justify-between mb-5">
					{/* Icon - removed box, show only icon */}
					<div className="flex items-center justify-center">
						{tour.icon && React.createElement(tour.icon, { size: 40, className: "text-emerald-700 drop-shadow-sm" })}
					</div>
					
					{/* Duration Badge */}
					{tour.duration && (
						<div className="flex items-center gap-1.5 bg-emerald-100/80 backdrop-blur-sm border border-emerald-200/60 rounded-full px-3 py-1.5 text-emerald-700 text-xs font-semibold shadow-sm">
							<Clock size={12} />
							<span>{tour.duration}</span>
						</div>
					)}
				</div>

				{/* Title & Description */}
				<div className="flex-1 flex flex-col mb-5">
					<h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
						{tour.title}
					</h3>
					<p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
						{tour.short}
					</p>
				</div>

				{/* Bottom Section */}
				<div className="flex items-center justify-between gap-3">
					{/* Price Tag */}
					{tour.price && (
						<div className="bg-gradient-to-r from-amber-100/90 to-yellow-100/90 backdrop-blur-sm border border-amber-200/60 rounded-full px-3 py-1.5 text-amber-700 text-xs font-semibold shadow-sm">
							<Award size={12} className="inline mr-1" />
							{tour.price === "Ask" ? "Get Quote" : `€${tour.price}`}
						</div>
					)}

					{/* CTA Button */}
					<button
						className="
							relative overflow-hidden bg-emerald-700 hover:bg-emerald-600 
							text-white text-sm font-semibold 
							px-6 py-2.5 rounded-full transition-all duration-300 
							hover:scale-105 hover:shadow-lg hover:shadow-emerald-700/25
							before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/25 before:to-white/0
							before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
							shadow-lg
						"
						onClick={e => { e.stopPropagation(); onExpand(tour.id); }}
					>
						<span className="relative z-10 flex items-center gap-2">
							Explore
							<Compass size={14} className="group-hover:rotate-45 transition-transform duration-300" />
						</span>
					</button>
				</div>
			</div>

			{/* Subtle Border Glow */}
			<div className="absolute inset-0 rounded-3xl ring-1 ring-emerald-200/30 group-hover:ring-emerald-300/50 transition-all duration-500"></div>
		</div>

		{/* Enhanced Modal */}
		{expanded && (
			<div 
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
				style={{ top: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }} // Prevent overlap with navbar
				onClick={e => { e.stopPropagation(); onExpand(null); }}
			>
				<div 
					className="relative bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300"
					style={{ marginTop: 0 }} // Remove margin so modal is flush below navbar
					onClick={e => e.stopPropagation()}
				>
					{/* Modal Background Pattern */}
					<div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white/10 to-teal-50/30 rounded-3xl"></div>
					
					{/* Modal Header */}
					<div className="relative p-8 pb-6">
						{/* Close Button */}
						<button
							onClick={() => onExpand(null)}
							className="absolute top-6 right-6 w-10 h-10 bg-gray-100/80 hover:bg-gray-200/80 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 backdrop-blur-sm"
						>
							<span className="text-xl">×</span>
						</button>

						{/* Header Content */}
						<div className="flex items-start gap-6">
							{/* Icon - removed box, show only icon */}
							<div className="flex items-center justify-center">
								{tour.icon && React.createElement(tour.icon, { size: 48, className: "text-emerald-700" })}
							</div>
							<div className="flex-1">
								<h3 className="text-2xl font-bold text-gray-800 mb-2">{tour.title}</h3>
								<p className="text-gray-600 leading-relaxed">{tour.short}</p>
								<div className="flex gap-3 mt-4">
									{tour.duration && (
										<span className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-200/60">
											<Clock size={16} />
											{tour.duration}
										</span>
									)}
									{tour.price && (
										<span className="inline-flex items-center gap-2 bg-amber-100/80 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold border border-amber-200/60">
											<Award size={16} />
											{tour.price === "Ask" ? "Get Quote" : `€${tour.price}`}
										</span>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Modal Content */}
					<div className="px-8 pb-8">
						{tour.overview && (
							<div className="mb-6">
								<h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
									<Globe size={18} className="text-emerald-600" />
									Overview
								</h4>
								<div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 space-y-3">
									{/* Split overview into paragraphs for readability */}
									{tour.overview.split('\n').map((para: string, idx: number) => (
										<p key={idx} className="text-gray-700 leading-relaxed">{para.trim()}</p>
									))}
								</div>
							</div>
						)}

						{tour.itinerary && (
							<div className="mb-6">
								<h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
									<MapPin size={18} className="text-teal-600" />
									Itinerary
								</h4>
								<div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
									{/* Render itinerary as bullet points if possible */}
									<ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
										{tour.itinerary.split('\n').map((line, idx) => (
											line.trim() ? <li key={idx}>{line.trim()}</li> : null
										))}
									</ul>
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex gap-4 pt-4">
							<button
								className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-700/25"
								onClick={() => onExpand(null)}
							>
								Book This Adventure
							</button>
							<button
								className="bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-200/50 backdrop-blur-sm"
								onClick={() => onExpand(null)}
							>
								Save for Later
							</button>
						</div>
					</div>
				</div>
			</div>
		)}
	</div>
);

export default function ToursPage() {
	const [activeSection, setActiveSection] = useState('tours');
	const [expandedTourIds, setExpandedTourIds] = useState<Record<number, number | null>>({}); // {rowIdx: tourId}

	// Helper to group tours into rows of 3
	interface GetRowsListItem {
		id: number;
		icon: React.ElementType;
		title: string;
		short: string;
		overview?: string | null;
		duration?: string;
		price?: string;
		itinerary?: string | null;
	}

	const getRows = (list: GetRowsListItem[]): GetRowsListItem[][] => {
		const rows: GetRowsListItem[][] = [];
		for (let i = 0; i < list.length; i += 3) {
			rows.push(list.slice(i, i + 3));
		}
		return rows;
	};

	const toursToShow = activeSection === 'tours' ? tours : mtbTours;
	const rows = getRows(toursToShow);

	return (
		<div className="min-h-screen bg-white text-gray-900 overflow-hidden">
			{/* Animated Background */}
			<div className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-white">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.04),transparent_50%)]"></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.04),transparent_50%)]"></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(119,255,198,0.04),transparent_50%)]"></div>
			</div>

			<main style={{ paddingTop: NAVBAR_HEIGHT }} className="relative z-10">
				<Navigation />
				
				{/* Title Section - updated as requested */}
			<section className="max-w-[1200px] mx-auto px-4 pt-8 pb-2 text-left">
				{/* Location indicator badge above title */}
				<div className="mb-4">
					<div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-2 sm:px-6 text-stone-600 shadow-sm">
						<Activity size={18} strokeWidth={1.5} className="text-emerald-600" />
						<span className="text-xs sm:text-sm font-medium tracking-wide">
							Our Activities
						</span>
					</div>
				</div>
				<h2 className="text-5xl font-extralight tracking-wide text-neutral-900 mb-10 tracking-[0.1em] text-left">
					Authentic Experiences
				</h2>
				<p className="text-xl text-neutral-600 leading-relaxed font-light max-w-4xl text-left">
					Discover the beauty of Morocco with our curated tours, exploring local
					culture, history, and breathtaking landscapes that define the soul of this
					magnificent land.
				</p>
			</section>

				{/* Section Switcher */}
				<div className="flex justify-center mt-16 mb-12 px-4">
					<div className="flex gap-2 border border-gray-200 bg-transparent rounded-full p-2">
						<button
							onClick={() => setActiveSection('tours')}
							className={`
								px-5 py-2 font-semibold text-sm transition-all duration-300
								${activeSection === 'tours' 
									? 'bg-black text-white border-black rounded-full border shadow-lg'
									: 'bg-transparent text-gray-700'
								}
							`}
						>
							MYSTICAL ADVENTURES
						</button>
						<button
							onClick={() => setActiveSection('mtb')}
							className={`
								px-5 py-2 font-semibold text-sm transition-all duration-300
								${activeSection === 'mtb' 
									? 'bg-black text-white border-black rounded-full border shadow-lg'
									: 'bg-transparent text-gray-700'
								}
							`}
						>
							BIKE WARRIORS
						</button>
					</div>
				</div>

				{/* Tours Grid */}
				<section className="max-w-7xl mx-auto px-4 pb-20">
					{rows.map((row, rowIdx) => (
						<div key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
							{row.map((tour) => (
								<TourCard
									key={tour.id}
									tour={tour}
									expanded={expandedTourIds[rowIdx] === tour.id}
									onExpand={id => {
										setExpandedTourIds(prev => ({
											...prev,
											[rowIdx]: prev[rowIdx] === id ? null : id
										}));
									}}
								/>
							))}
						</div>
					))}
				</section>
				
			</main>
			<Footer />
		</div>
	);
}