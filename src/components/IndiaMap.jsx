// src/components/IndiaMap.jsx
import { useState } from 'react';

export default function IndiaMap() {
  const [activeCity, setActiveCity] = useState('gangtok');

  const cities = [
    { 
      id: 'delhi', 
      name: 'New Delhi', 
      coords: { top: '30%', left: '35%' }, 
      type: 'Commercial Hub',
      status: 'In Planning'
    },
    { 
      id: 'gangtok', 
      name: 'Gangtok (HQ)', 
      coords: { top: '25%', left: '75%' }, 
      type: 'Origin',
      status: 'Established 2001'
    },
    { 
      id: 'mumbai', 
      name: 'Mumbai', 
      coords: { top: '55%', left: '25%' }, 
      type: 'High-Rise Residential',
      status: 'Upcoming'
    },
    { 
      id: 'bangalore', 
      name: 'Bengaluru', 
      coords: { top: '75%', left: '40%' }, 
      type: 'Sustainable Campus',
      status: 'Proposal Phase'
    },
  ];

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200">
      
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Connection Lines (From Gangtok to others) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {cities.map((city) => (
          city.id !== 'gangtok' && (
            <line 
              key={city.id}
              x1="75%" y1="25%" // Gangtok Coords
              x2={city.coords.left} y2={city.coords.top}
              stroke="black" 
              strokeWidth="1" 
              strokeDasharray="4 4"
              className="opacity-20"
            />
          )
        ))}
      </svg>

      {/* City Nodes */}
      {cities.map((city) => (
        <button
          key={city.id}
          className="absolute z-10 group focus:outline-none"
          style={{ top: city.coords.top, left: city.coords.left }}
          onMouseEnter={() => setActiveCity(city.id)}
          onClick={() => setActiveCity(city.id)}
        >
          {/* The Marker */}
          <div className={`relative flex items-center justify-center w-4 h-4 rounded-full transition-all duration-500 ${activeCity === city.id ? 'bg-amber-700 scale-125' : 'bg-neutral-400 hover:bg-neutral-600'}`}>
            {activeCity === city.id && (
              <span className="absolute w-8 h-8 bg-amber-700/20 rounded-full animate-ping"></span>
            )}
          </div>

          {/* Label (Only visible if active or hovered) */}
          <div className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 ${activeCity === city.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
            <span className="text-xs font-bold uppercase tracking-widest text-black block">{city.name}</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">{city.type}</span>
          </div>
        </button>
      ))}

      {/* Info Panel (Bottom Left) */}
      <div className="absolute bottom-8 left-8 z-20 bg-white p-6 shadow-xl border-l-4 border-amber-700 max-w-xs transition-all duration-500">
        <span className="text-[10px] tracking-widest uppercase text-neutral-400 mb-2 block">Project Status</span>
        {activeCity && (
          <div className="animate-fade-in">
            <h4 className="text-xl font-light text-black mb-1">
              {cities.find(c => c.id === activeCity).name}
            </h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {cities.find(c => c.id === activeCity).status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}