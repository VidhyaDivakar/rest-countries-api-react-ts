import type { Country } from "../../types/countryTypes";
import { Link } from 'react-router-dom'

function formatPopulation(n: number): string {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
}

function CountryCard(country: Country) {

    return (<section className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-sm mx-auto" >

        <Link to={`/country/${country.name}`}>
            <div className="w-full aspect-[3/2] overflow-hidden bg-gray-50">
                <img className="w-full h-full object-cover" src={country.flag} />
            </div>
        </Link>
    
        <div className="m-4">
            <div className="flex justify-between">
                <h2 className="font-semibold text-gray-800">{country.name}</h2>
                <p className="border border-gray-200 bg-gray-100 text-gray-600 rounded-md px-2 py-1 text-sm">{country.region}</p>
            </div>
            <div className="flex justify-between pt-4">
                <div className="flex flex-col">
                    <label className="font-light text-gray-500 text-sm">Population</label>
                    <p className="text-gray-700 text-xs ">{formatPopulation(country.population)}</p>
                </div>
                <div className="flex flex-col">
                    <label className="font-light text-gray-500 text-sm">Capital</label>
                    <p className="text-gray-700 text-sm">{country.capital}</p>
                </div>
            </div>
        </div>
    </section>)
}
export default CountryCard;
