import type { Country } from "../../types/countryTypes";
import { Link } from 'react-router-dom'

function CountryCard(country: Country) {

    console.log(country)
    return (<section className="w-65 md:72 lg:80 rounded-xl border overflow-hidden" >
        <Link to={`/country/${country.name}`}>
            <img className="w-full h-40" src={country.flag} />
        </Link>
        <div className="m-4">
            <div className="flex justify-between">
                <h2 className="font-bold">{country.name}</h2>
                <p className="border bg-teal-400 rounded-md p-1">{country.region}</p>
            </div>
            <div className="flex justify-between mt-2">
                <div className="fex flex-col">
                    <label className="font-light">Population</label>
                    <p>{country.population}</p>
                </div>
                <div className="flex flex-col">
                    <label className="font-light">Capital</label>
                    <p>{country.capital}</p>
                </div>
            </div>
        </div>
    </section>)
}
export default CountryCard;
