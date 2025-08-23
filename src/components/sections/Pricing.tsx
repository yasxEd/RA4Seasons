import React, { useState } from "react";
import { BedDouble, Users, CheckCircle, ChevronDown, MapPin } from "lucide-react";

const rooms = [
  {
    name: "Chambre Familiale",
    description: "Chambre 48 m², balcon, vue montagne, climatisation, salle de bains privative, terrasse, Wi-Fi gratuit.",
    beds: "5 lits simples ou 1 lit simple + 2 grands lits doubles",
    maxPersons: 5,
    price: "MAD 2 201",
    breakfast: true,
    cancellation: "Annulation gratuite avant le 14 septembre 2025",
    availability: 1,
  },
  {
    name: "Chambre Quadruple",
    description: "Chambre 35 m², balcon, vue montagne, climatisation, salle de bains privative, terrasse, Wi-Fi gratuit.",
    beds: "4 lits simples ou 2 grands lits doubles",
    maxPersons: 4,
    price: "MAD 2 672",
    breakfast: true,
    cancellation: "Annulation gratuite avant le 14 septembre 2025",
    availability: 2,
  },
  {
    name: "Suite avec Terrasse",
    description: "Suite privée 55 m², cuisine privative, balcon, vue montagne, climatisation, terrasse, Wi-Fi gratuit.",
    beds: "1 lit simple + 2 canapés-lits + 1 grand lit double",
    maxPersons: 4,
    price: "MAD 2 829",
    breakfast: true,
    cancellation: "Annulation gratuite avant le 14 septembre 2025",
    availability: 1,
  },
];

const Pricing = () => {
  const [selected, setSelected] = useState(Array(rooms.length).fill(0));

  return (
    <section className="min-h-screen bg-white relative overflow-hidden py-20" id="pricing">
      <div className="relative z-40 w-full h-full md:border-[20px] border-white md:rounded-[3rem] overflow-hidden bg-white">
        <div className="relative z-60 px-6 md:px-8 max-w-6xl mx-auto py-16 md:py-24">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full px-6 py-2 text-stone-600 shadow-sm mb-8">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium tracking-wide">Sélectionnez votre hébergement</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-stone-800 mb-6 md:mb-8 leading-[0.9] tracking-tight">
              Choisissez <span className="font-medium text-emerald-700">votre chambre</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
              Sélectionnez le type et le nombre d&apos;hébergements que vous souhaitez réserver.
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {rooms.map((room, idx) => (
              <div key={room.name} className="bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <BedDouble className="w-5 h-5 text-emerald-700" />
                    <span className="text-xl font-medium text-stone-800">{room.name}</span>
                  </div>
                  <div className="text-stone-600 text-base mb-2">{room.description}</div>
                  <div className="text-sm text-stone-500 mb-2"><strong>Lits:</strong> {room.beds}</div>
                  <div className="flex items-center gap-2 text-sm text-stone-500 mb-2">
                    <Users className="w-4 h-4" />
                    <span>Personnes max.: {room.maxPersons}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-500 mb-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Petit-déjeuner compris</span>
                  </div>
                  <div className="text-sm text-stone-500 mb-2">{room.cancellation}</div>
                  <div className="text-sm text-stone-500 mb-2">Disponibilité: <span className="font-semibold text-emerald-700">{room.availability}</span></div>
                </div>
                <div className="border-t border-stone-200/30 px-6 md:px-8 py-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-medium text-emerald-700">{room.price}</span>
                    <span className="text-xs text-stone-500 ml-2">pour 3 nuits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor={`select-${idx}`} className="text-sm text-stone-600">Sélectionner:</label>
                    <select
                      id={`select-${idx}`}
                      className="border rounded px-2 py-1 text-sm"
                      value={selected[idx]}
                      onChange={e => {
                        const arr = [...selected];
                        arr[idx] = Number(e.target.value);
                        setSelected(arr);
                      }}
                    >
                      {Array(room.availability + 1).fill(0).map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reserve CTA */}
          <div className="mt-16 md:mt-20 text-center">
            <button className="group bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-4 rounded-2xl font-medium flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-emerald-900/25 transition-all duration-300 mx-auto text-lg">
              <span>Je réserve</span>
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className="text-xs text-stone-400 mt-4">Vous ne paierez rien pour l&apos;instant</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
