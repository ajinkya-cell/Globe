"use client";

import { useState } from "react";
import GlobeView from "@/components/GlobeView";
import CountryPanel from "@/components/CountryPanel";

export default function Page() {
  const [country, setCountry] = useState(null);

  return (
    <main className="flex h-screen bg-black overflow-hidden">
      <div
        className={`transition-all duration-700 ${
          country ? "w-1/3" : "w-full"
        }`}
      >
        <GlobeView onCountrySelect={setCountry} />
      </div>

      {country && (
        <div className="animate-slide-in">
          <CountryPanel country={country} />
        </div>
      )}
    </main>
  );
}
