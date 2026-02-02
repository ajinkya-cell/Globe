"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });
import { useEffect, useRef, useState } from "react";
import { loadCountries } from "@/lib/geojson";
import { getCountryInfo } from "@/lib/countries";

export default function GlobeView({ onCountrySelect, selectedCountry }: any) {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [hoverD, setHoverD] = useState<any>(null);

  useEffect(() => {
    // Globe controls initialized in onGlobeReady
    loadCountries().then((data) => {
      setCountries(data.features || []);
    });
  }, []);

  useEffect(() => {
    if (!selectedCountry && globeRef.current) {
      globeRef.current.controls().autoRotate = true;
    }
  }, [selectedCountry]);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      backgroundColor="#000"
      polygonsData={countries}
      polygonCapColor={(d: any) =>
        d === hoverD ? "rgba(255, 215, 0, 0.3)" : "rgba(0, 0, 0, 0)"
      }
      polygonSideColor={() => "rgba(0, 0, 0, 0)"}
      polygonStrokeColor={() => "rgba(255, 255, 255, 0.2)"}
      polygonLabel={({ properties: d }: any) => `
        <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(4px); padding: 5px 10px; border-radius: 4px; color: white; font-family: sans-serif; border: 1px solid rgba(255, 255, 255, 0.2);">
          ${d.ADMIN || d.NAME}
        </div>
      `}
      polygonAltitude={(d: any) => (d === hoverD ? 0.12 : 0.06)}
      polygonsTransitionDuration={300}
      onPolygonHover={setHoverD}
      onPolygonClick={(polygon: any, event: any, { lat, lng }: any) => {
        if (!polygon) return;

        // Stop auto rotation and fly to location
        globeRef.current.controls().autoRotate = false;
        globeRef.current.pointOfView({ lat, lng, altitude: 2.5 }, 1000);

        const name = polygon.properties.ADMIN || polygon.properties.NAME;
        getCountryInfo(name).then((data) => {
          if (data) onCountrySelect(data);
        });
      }}
      onGlobeReady={() => {
        if (globeRef.current) {
          globeRef.current.controls().autoRotate = true;
          globeRef.current.controls().autoRotateSpeed = 0.6;
          globeRef.current.pointOfView({ altitude: 2.5 });
        }
      }}
    />
  );
}
