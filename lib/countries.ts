export async function getCountryInfo(name: string) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
    if (!res.ok) return null;
    const data = await res.json();

    // Prioritize exact match
    const exactMatch = data.find((country: any) => 
      country.name.common.toLowerCase() === name.toLowerCase() ||
      country.name.official.toLowerCase() === name.toLowerCase()
    );

    return exactMatch || data[0];
  } catch (error) {
    console.error("Failed to fetch country info:", error);
    return null;
  }
}
