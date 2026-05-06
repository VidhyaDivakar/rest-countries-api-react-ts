import type { Country } from "../../types/countryTypes";

function CountryCard(country:Country){

    console.log(country)
    return(<div>
        <img src={country.flag}/>
        <h2>{country.name}</h2>
        <p>{country.population}</p>
        <p>{country.region}</p>
        <>{country.capital}</>
    </div>)
}
export default CountryCard;
