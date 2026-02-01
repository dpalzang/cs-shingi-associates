// src/components/HeroText.jsx
import { useState, useEffect, useRef } from 'react';

export default function HeroText() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);
  
  // Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 150);
  }, []);

  const scrollToProperties = () => {
    const section = document.getElementById('properties');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div 
      className="relative z-20 text-center px-6 cursor-default select-none perspective-[1500px] h-full flex flex-col justify-center items-center"
      ref={containerRef}
    >
      <style>{`
        @keyframes liquidShine {
          0% { background-position-x: 200%; }
          100% { background-position-x: 0%; }
        }

        .gold-liquid-metal {
          background-color: #b88a44; 
          background-image: linear-gradient(
            110deg,
            transparent 20%,     
            rgba(255, 236, 210, 0.1) 40%, 
            rgba(255, 255, 255, 0.9) 50%, 
            rgba(255, 236, 210, 0.1) 60%, 
            transparent 80%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: liquidShine 6s linear infinite;
          text-shadow: 0px 2px 10px rgba(184, 138, 68, 0.2);
        }

        .god-tier-gold {
          background-image: 
            linear-gradient(
              110deg,
              transparent 35%,
              rgba(255, 255, 255, 0.8) 50%,
              transparent 65%
            ),
            linear-gradient(
              180deg,
              #a67c00 0%,
              #bf953f 30%,
              #fcf6ba 50%, 
              #bf953f 70%,
              #8a6d3b 100%
            );
          background-size: 200% 100%, 100% 100%;
          background-position-x: 200%, 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: liquidShine 8s linear infinite;
        }
      `}</style>

      {/* Parallax Container */}
      <div 
        className={`transition-all duration-[2000ms] ease-out will-change-transform flex flex-col items-center ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}
        style={{
            transform: `
                rotateX(${mousePos.y * -15}deg) 
                rotateY(${mousePos.x * 15}deg)
                translateX(${mousePos.x * -20}px)
                translateY(${mousePos.y * -20}px)
            `
        }}
      >
        
        {/* --- THE MONUMENT --- */}
        <div className="relative flex flex-col items-center justify-center mb-12 md:mb-16">
            
            {/* Crown */}
            <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-center text-[10px] md:text-xs font-sans font-bold tracking-[0.5em] text-gold-300/60 uppercase">
                    Est. 2001
                </span>
                <div className="h-[2px] w-[2px] rounded-full bg-gold-400"></div>
            </div>

            {/* THE "25" */}
            <div className="relative z-10 leading-[0.8]">
                <span className="
                    absolute inset-0 
                    font-serif italic font-light 
                    text-[9rem] md:text-[14rem] lg:text-[16rem] 
                    tracking-tighter text-black/40 blur-md
                    translate-y-6 scale-[0.98]
                ">
                    25
                </span>

                <span className="
                    god-tier-gold
                    relative block 
                    font-serif italic font-light 
                    text-[9rem] md:text-[14rem] lg:text-[16rem] 
                    tracking-tighter
                    drop-shadow-sm
                ">
                    25
                </span>
            </div>

            {/* The Glass Badge */}
            <div 
                className="mt-8 z-30 w-max"
                style={{ transform: `translateX(${mousePos.x * -10}px) translateY(${mousePos.y * -5}px)` }}
            >
                <div className="
                    relative overflow-hidden
                    bg-white/5 backdrop-blur-xl 
                    border border-white/10 
                    shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                    px-8 py-4 rounded-full
                    group
                    transition-all duration-300 hover:bg-white/10
                ">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] md:text-[12px] font-sans font-bold tracking-[0.35em] uppercase text-white/90">
                            Years of Excellence
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        {/* --- BRAND HEADER --- */}
        <div className="mt-4 relative z-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-white drop-shadow-xl">
              C.S. Shingi & <span className="font-normal italic font-serif text-gold-200">Associates</span>
            </h1>
            
            <p className="text-sm md:text-lg font-light max-w-lg mx-auto leading-relaxed text-neutral-400/90 tracking-wide">
              Shaping the Himalayan skyline with integrity, innovation, and trust.
            </p>
        </div>
      </div>
      
      {/* --- SCROLL TRIGGER (FIXED) --- */}
      {/* 1. Changed absolute to relative so it respects the text above it */}
      {/* 2. Added mt-16 md:mt-24 to force a large gap */}
      {/* 3. Removed left/translate centering as flex-col handles it now */}
      <div 
        onClick={scrollToProperties}
        className={`
            relative mt-16 md:mt-24
            transition-all duration-1000 delay-[1000ms] 
            cursor-pointer z-50 group py-4
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="flex flex-col items-center">
          <span className="text-[9px] tracking-[0.3em] mb-3 text-gold-300/40 uppercase font-semibold group-hover:text-gold-200 transition-colors duration-300">
            Explore Projects
          </span>
          <div className="relative w-[1px] h-12 bg-white/5">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold-400 to-transparent -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
          </div>
        </div>
      </div>
    </div>
  );
}