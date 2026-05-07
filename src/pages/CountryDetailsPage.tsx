import { useEffect, useState } from "react";
import { fetchCountryDetails, fetchBorderCountries } from "../services/restCountriesApiService";
import type { BorderCountry, CountryDetailsApiData } from "../types/countryTypes";
import { BorderCountries } from "../components/BorderCountries";
import { useParams } from "react-router-dom";

export function CountryDetailsPage() {

    const { name } = useParams<{ name: string }>();

    const [country, setCountry] = useState<CountryDetailsApiData | null>(null);
    const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);

    useEffect(() => {
        async function loadCountryDetails() {
            if (!name) return;
            const response = await fetchCountryDetails(name);
            const countryData = response[0];
            setCountry(countryData);
            if (countryData.borders && countryData.borders.length > 0) {
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
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <section className="mx-auto max-w-6xl">
                <div className="grid gap-10 lg:grid-cols-2">
                    <div>
                        <img
                            src={country.flags.png}
                            alt={country.name.common}
                            className="w-full max-w-md rounded-xl shadow-md"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            {country.name.common}
                        </h2>

                        <p className="mt-2 text-gray-600">{nativeName}</p>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-semibold">Key Facts</h3>
                                <p>Population: {country.population.toLocaleString()}</p>
                                <p>Region: {country.region}</p>
                                <p>Capital: {country.capital?.[0] || "N/A"}</p>
                                <p>Top Level Domain: {country.tld?.[0] || "N/A"}</p>
                            </div>

                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-semibold">More Details</h3>
                                <p>Subregion: {country.subregion}</p>
                                <p>Languages: {languages}</p>
                                <p>Currencies: {currencies}</p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-xl font-semibold">Border Countries</h3>
                            <BorderCountries borderCountries={borderCountries} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );

}