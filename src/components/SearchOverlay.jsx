// src/components/SearchOverlay.jsx
import { useState, useEffect } from 'react';

const MOCK_DATA = [
    {
        id: 1,
        type: 'Update',
        date: 'April 2026',
        title: 'ESG & Sustainability Report',
        color: 'bg-gradient-to-br from-neutral-900 to-black border border-white/10',
        textColor: 'text-gold-200',
        category: 'News'
    },
    {
        id: 2,
        type: 'Project',
        title: 'The Highland Estate',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        category: 'Work'
    },
    {
        id: 3,
        type: 'Insight',
        date: 'June 2026',
        title: 'Circular Cities: The Future',
        color: 'bg-gradient-to-br from-gold-900/40 to-black border border-gold-500/20',
        textColor: 'text-white',
        category: 'News'
    },
    {
        id: 4,
        type: 'Leadership',
        date: 'Principal',
        title: 'Chhatra S. Singhi',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887',
        category: 'People'
    },
];

export default function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(MOCK_DATA);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-obsidian/98 backdrop-blur-xl z-[60] overflow-y-auto animate-fade-in font-sans">
            
            {/* Header / Close Button */}
            <div className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-end z-50">
                <button
                    onClick={onClose}
                    className="group flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-gold-400 transition-colors"
                >
                    <span>Close Search</span>
                    <div className="bg-white/10 text-white rounded-full p-2 group-hover:bg-gold-400 group-hover:text-black transition-all duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col items-center">

                {/* Input */}
                <div className="w-full max-w-3xl text-center mb-24">
                    <label className="block text-[10px] font-bold tracking-[0.4em] uppercase text-gold-500/60 mb-6">
                        Search the Archive
                    </label>
                    <input
                        type="text"
                        placeholder="Type to filter..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        // NO ITALIC here either
                        className="w-full text-center text-5xl md:text-7xl font-serif text-gold-100 bg-transparent border-none placeholder:text-white/10 focus:outline-none focus:ring-0 transition-all"
                        autoFocus
                    />
                </div>

                {/* Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {results.map((item) => (
                        <div key={item.id} className="group cursor-pointer block">

                            {/* Card Container */}
                            <div className={`aspect-[4/3] w-full relative overflow-hidden rounded-sm transition-all duration-700 group-hover:shadow-[0_20px_40px_-15px_rgba(197,160,89,0.15)] ${item.color ? item.color : 'bg-neutral-900'}`}>
                                {item.image && (
                                    <>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                                    </>
                                )}

                                {!item.image && (
                                    <div className="absolute inset-0 p-10 flex flex-col justify-center text-center">
                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-500/70 mb-6 border-b border-gold-500/20 pb-2 inline-block mx-auto">
                                            {item.type}
                                        </span>
                                        {/* NO ITALIC class here */}
                                        <h3 className="text-3xl font-serif leading-tight mb-4 text-neutral-300 group-hover:text-gold-200 transition-colors duration-500">
                                            {item.title}
                                        </h3>
                                        {item.date && (
                                            <p className="text-xs font-sans uppercase tracking-widest text-white/40 mt-2">
                                                {item.date}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* CAPTION AREA - THE FIX */}
                            <div className="mt-6 flex justify-between items-end border-t border-white/10 pt-4">
                                
                                <div className="relative inline-block">
                                    {/* 1. Standard Font (Not Italic) */}
                                    <h4 className="text-lg font-medium text-white transition-colors duration-300 group-hover:text-gold-400">
                                        {item.title}
                                    </h4>
                                    
                                    {/* 2. THE UNDERLINE LINE */}
                                    <span className="
                                        absolute 
                                        left-0 
                                        -bottom-1        /* Pushes it down below descenders */
                                        h-[2px]          /* Visible thickness */
                                        w-full 
                                        bg-gold-400      /* Visible Gold */
                                        origin-left 
                                        scale-x-0        /* Start hidden */
                                        transition-transform duration-500 ease-out 
                                        group-hover:scale-x-100 /* Grow on parent hover */
                                    "></span>
                                </div>

                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-white transition-colors">
                                    {item.category}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}