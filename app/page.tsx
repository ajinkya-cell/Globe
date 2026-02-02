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

      {country && (
        <CountryPanel country={country} onClose={() => setCountry(null)} />
      )}
    </main>
  );
}
