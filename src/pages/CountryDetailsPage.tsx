//import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCountryDetails, fetchBorderCountries } from "../services/restCountriesApiService";
import type { BorderCountry, CountryDetailsApiData } from "../types/countryTypes";
import { BorderCountries } from "../components/BorderCountries";
import { useParams } from "react-router-dom";

export function CountryDetailsPage() {

    const {name} = useParams<{name : string}>();

    const [country, setCountry] = useState<CountryDetailsApiData | null>(null);
    const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);

    useEffect(() => {
        async function loadCountryDetails() {
            if (!name) return;
            const response = await fetchCountryDetails(name);
            const countryData = response[0];
             setCountry(countryData);
            if(countryData.borders &&  countryData.borders.length > 0 ) {
                const borders = await fetchBorderCountries(countryData.borders);
                setBorderCountries(borders)
            } else {
                setBorderCountries([]);
            }
           
        }
        loadCountryDetails();
    }, [name])
    if (!country) return <p>Loading Country details ...</p>

    const nativeName = country.name.nativeName
        ? Object.values(country.name.nativeName)[0].common
        : country.name.common;

    const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

    const currencies = country.currencies
        ? Object.values(country.currencies)
            .map((currency) => currency.name)
            .join(", ")
        : "N/A"


    return (
        <div className="details-page">
            <div className="details-header">
                <img
                    src={country.flags.png}
                    alt={country.name.common}
                    width="300" />
                <h2>{country.name.common}</h2>
                <p>{nativeName}</p>
            </div>
            <div className="details-grid">
                <div className="details-card">
                    <h3>Key Facts</h3>
                    <p>Population :{country.population}</p>
                    <p>Region: {country.region}</p>
                    <p>Capital: {country.capital?.[0] || "N/A"}</p>
                    <p>Top Level Domain: {country.tld?.[0] || "N/A"}</p>
                </div>
                <div className="details-card">
                    <h3>Key Facts</h3>
                    <p>Subregion: {country.subregion}</p>
                    <p>Languages: {languages}</p>
                    <p>Currencies: {currencies}</p>
                </div>
                <div className="details-card">
                    <h3>Border Countries</h3>
                    <BorderCountries borderCountries={borderCountries} />
                </div>
            </div>
        </div>
    )

}