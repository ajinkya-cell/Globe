export async function getCountryInfo(name: string) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error("Failed to fetch country info:", error);
    return null;
  }
}
