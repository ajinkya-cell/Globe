import { useRef, useEffect } from "react";

export default function CountryPanel({ country, onClose }: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        ref={modalRef}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white shadow-2xl transform transition-all animate-scale-in relative overflow-hidden"
      >
        {/* Decorative gradient background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-32 h-20 mb-6 shadow-lg rounded-lg overflow-hidden relative bg-white/5">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={country.flags.svg} 
              alt={country.name.common}
              className="w-full h-full object-cover" 
            />
          </div>
          
          <h2 className="text-4xl font-light tracking-tight mb-2">
            {country.name.common}
          </h2>
          <p className="text-white/60 text-sm uppercase tracking-widest mb-8">
            {country.region}
          </p>

          <div className="grid grid-cols-2 gap-4 w-full text-left">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              <span className="text-xs text-blue-300 uppercase font-semibold">Capital</span>
              <p className="text-lg mt-1 truncate">{country.capital?.[0] || 'N/A'}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              <span className="text-xs text-purple-300 uppercase font-semibold">Population</span>
              <p className="text-lg mt-1">{country.population.toLocaleString()}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors col-span-2">
              <span className="text-xs text-emerald-300 uppercase font-semibold">Currency</span>
              <p className="text-lg mt-1">
                 {Object.values(country.currencies || {})[0]?.name || 'N/A'} 
                 <span className="opacity-50 ml-2">({(Object.values(country.currencies || {})[0] as any)?.symbol || ''})</span>
              </p>
            </div>
          </div>
          
          <a 
            href={country.maps.googleMaps} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-8 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors w-full text-sm"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
