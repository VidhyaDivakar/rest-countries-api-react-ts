import type { Country } from "../../types/countryTypes";
import { Link } from 'react-router-dom'

function CountryCard(country: Country) {

    console.log(country)
    return (<div>
        <Link to={`/country/${country.name}`}>
            <img src={country.flag} />
        </Link>
        <h2>{country.name}</h2>
        <p>{country.population}</p>
        <p>{country.region}</p>
        <>{country.capital}</>
    </div>)
}
export default CountryCard;
