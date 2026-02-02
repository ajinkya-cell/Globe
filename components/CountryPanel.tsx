export default function CountryPanel({ country }: any) {
  if (!country) return null;

  return (
    <div className="w-[420px] p-6 text-white bg-zinc-900">
      <img src={country.flags.svg} className="w-24 mb-4" />
      <h2 className="text-2xl font-bold">{country.name.common}</h2>

      <ul className="mt-4 space-y-2 text-sm">
        <li>Capital: {country.capital?.[0]}</li>
        <li>Region: {country.region}</li>
        <li>Population: {country.population.toLocaleString()}</li>
        <li>
          Currency:{" "}
          {Object.values(country.currencies || {})[0]?.name}
        </li>
      </ul>
    </div>
  );
}
