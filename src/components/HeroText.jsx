// src/components/HeroText.jsx
import { useState } from 'react';

export default function HeroText() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative z-20 text-center text-gold-50 px-6 cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-all duration-1000 ${isHovered ? 'opacity-100 scale-100' : 'opacity-100 scale-100'}`}>
        
        {/* 25th Anniversary Badge - BIGGER & PROUDER */}
        <div className="inline-flex items-center justify-center mb-10 md:mb-16">
          <div className="relative group">
            {/* The Badge Itself */}
            <span className={`
              relative z-10 inline-block
              bg-obsidian/80 backdrop-blur-xl 
              border border-gold-400
              px-10 py-3 md:px-12 md:py-4
              rounded-full 
              text-xs md:text-sm font-medium tracking-[0.35em] uppercase
              text-gold-200 
              shadow-[0_0_25px_rgba(197,160,89,0.2)]
              transition-all duration-500
              group-hover:shadow-[0_0_40px_rgba(197,160,89,0.4)]
              group-hover:border-gold-300
              group-hover:text-white
            `}>
              Celebrating <span className="text-gold-400 font-bold mx-1">25</span> Years
            </span>

            {/* Optional: A subtle glow ring behind it for extra "Pride" */}
            <div className="absolute inset-0 rounded-full bg-gold-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter mb-8">
          CS Shingi & <span className="font-normal italic font-serif text-transparent bg-clip-text bg-gold-gradient">Associates</span>
        </h1>
        
        <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto mb-12 leading-relaxed text-neutral-300">
          Creating spaces where ethical design, community, and innovation converge.
          <span className="block mt-4 text-sm md:text-base tracking-[0.2em] uppercase text-gold-400/80 font-medium">
            Established in Gangtok — Pan India
          </span>
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute -bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${isHovered ? 'opacity-40 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-[0.4em] mb-4 text-gold-300/80 uppercase font-bold">Explore</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold-400 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}