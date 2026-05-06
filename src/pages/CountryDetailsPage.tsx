//import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCountryDetails } from "../services/restCountriesApiService";
import type { CountryDetailsApiData } from "../types/countryTypes";

export function CountryDetailsPage() {

  //const {name} = useParams<{name : string}>();
const name = "Germany"
const [country, setCountry] = useState<CountryDetailsApiData | null>(null);
  
  useEffect(()=> {
    async function loadCountryDetails() {
        if(!name) return;
        const response = await fetchCountryDetails(name);
        console.log("country details response:" , response);
        setCountry(response[0]);
    }
    loadCountryDetails();
  },[name])
  if(!country) return <p>Loading Country details ...</p>

  return (
    <div>
        <h1>Country Details Page</h1>
        <img 
          src= {country.flags.png} 
          alt= {country.name.common}
          width ="300" />
          <h2>{country.name.common}</h2>
          <p>Population :{country.population}</p>
          <p>Region: {country.region}</p>
          <p>Subregion: {country.subregion}</p>
          <p>Capital: {country.capital?.[0]}</p>
    </div>
  )

}