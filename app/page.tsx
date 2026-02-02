"use client";

import { useState } from "react";
import GlobeView from "@/components/GlobeView";
import CountryPanel from "@/components/CountryPanel";

export default function Page() {
  const [country, setCountry] = useState(null);

  return (
    <main className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GlobeView onCountrySelect={setCountry} selectedCountry={country} />
      </div>

      <div className="absolute top-0 left-0 z-50 p-8 pointer-events-none">
        <h1 className="font-mono text-2xl text-white tracking-tight select-none border-b border-white/30 pb-2">
          GEOGRAPHY-101
        </h1>
        <div>
          
        </div>
      </div>

      {country && (
        <CountryPanel country={country} onClose={() => setCountry(null)} />
      )}
    </main>
  );
}
