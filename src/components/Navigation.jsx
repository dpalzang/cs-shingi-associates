// src/components/Navigation.jsx
import { useState, useEffect } from 'react';
import SearchOverlay from './SearchOverlay.jsx';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // 1. STATE: Track if the background behind the header is dark
    const [isDarkBackground, setIsDarkBackground] = useState(true);

    useEffect(() => {
        // Scroll Listener (for shrinking the logo)
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // 2. INTERSECTION OBSERVER: Detects background brightness
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const style = window.getComputedStyle(entry.target);
                    const bg = style.backgroundColor;

                    // If background is transparent/0 opacity, ignore it
                    if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                         const rgb = bg.match(/\d+/g);
                         if (rgb) {
                             // Formula for brightness
                             const brightness = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
                             setIsDarkBackground(brightness < 128);
                         }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
             root: null,
             rootMargin: '-5% 0px -95% 0px', 
             threshold: 0
        });

        document.querySelectorAll('section, footer').forEach(s => observer.observe(s));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    // 4. SCROLL LOCK LOGIC (NEW)
    // Prevents main page interaction/scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup: Ensure scroll is re-enabled if component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const menuItems = [
        'Work', 'Purpose', 'Insights', 'People', 'Studios', 'News', 'Careers'
    ];

    // 3. COLOR LOGIC
    const iconColorClass = isMenuOpen 
        ? 'text-gold-200' 
        : (isDarkBackground ? 'text-gold-200' : 'text-obsidian');

    const hamburgerLineColor = isMenuOpen 
        ? 'bg-gold-200' 
        : (isDarkBackground ? 'bg-gold-200' : 'bg-obsidian');

    return (
        <>
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 flex justify-between items-center bg-transparent ${
                    (isScrolled || isMenuOpen) ? 'py-4' : 'py-8'
                }`}
            >
                {/* LOGO IMAGE */}
                <a href="/" className="z-50 relative block hover:opacity-80 transition-opacity">
                    <img
                        src="/images/logo.jpg"
                        alt="CS SHINGI & Associates"
                        className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10 md:h-12' : 'h-16 md:h-20'}`}
                    />
                </a>

                {/* ICONS */}
                <div className={`flex items-center gap-6 z-50 relative transition-colors duration-500 ${iconColorClass}`}>

                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hover:text-gold-400 transition-colors p-2"
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="group focus:outline-none p-2"
                    >
                        {isMenuOpen ? (
                            // Close X
                            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger
                            <div className="flex flex-col items-end gap-1.5">
                                <span className={`block h-[1px] ${hamburgerLineColor} transition-all duration-300 w-8 group-hover:bg-gold-400`}></span>
                                <span className={`block h-[1px] ${hamburgerLineColor} transition-all duration-300 w-6 group-hover:w-8 group-hover:bg-gold-400`}></span>
                                <span className={`block h-[1px] ${hamburgerLineColor} transition-all duration-300 w-4 group-hover:w-8 group-hover:bg-gold-400`}></span>
                            </div>
                        )}
                    </button>
                </div>
            </header>

            {/* DRAWER BACKGROUND & PANEL */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            <aside
                className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-obsidian border-l border-white/10 z-40 transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 to-transparent pointer-events-none"></div>

                <div className="relative flex flex-col h-full pt-32 px-12 pb-12 overflow-y-auto">
                    <nav className="flex flex-col space-y-8">
                        {menuItems.map((item, index) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`group relative inline-block w-max text-3xl md:text-4xl font-serif font-light text-white transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${150 + (index * 50)}ms` }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="group-hover:text-gold-400 transition-colors duration-300">
                                    {item}
                                </span>
                                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gold-400 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                            </a>
                        ))}
                    </nav>
                    <div className="mt-auto border-t border-white/10 pt-8">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600 mb-6">Connect</p>
                        <div className="space-y-3 text-sm font-medium text-neutral-400">
                            <a href="#" className="block hover:text-gold-300 transition-colors">Instagram</a>
                            <a href="#" className="block hover:text-gold-300 transition-colors">LinkedIn</a>
                            <a href="#" className="block hover:text-gold-300 transition-colors">Twitter</a>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}