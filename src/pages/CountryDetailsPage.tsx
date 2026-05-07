import { useEffect, useState } from "react";
import { fetchCountryDetails, fetchBorderCountries } from "../services/restCountriesApiService";
import type { BorderCountry, CountryDetailsApiData } from "../types/countryTypes";
import { BorderCountries } from "../components/BorderCountries";
import { useParams } from "react-router-dom";

// Weather service functions
import { getWeatherByCity } from "../services/weatherService";

export function CountryDetailsPage() {

    const { name } = useParams<{ name: string }>();

    const [country, setCountry] = useState<CountryDetailsApiData | null>(null);
    const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [weatherLoading, setWeatherLoading] = useState(false);

    useEffect(() => {
        async function loadCountryDetails() {
            try {
                if (!name) return;

                setLoading(true);

                const response = await fetchCountryDetails(name);
                const countryData = response[0];
                setCountry(countryData);
                if (countryData.borders && countryData.borders.length > 0) {
                    const borders = await fetchBorderCountries(countryData.borders);
                    setBorderCountries(borders)
                } else {
                    setBorderCountries([]);
                }
            } catch (err) {
                console.error("Country fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        loadCountryDetails();
    }, [name])

    // Load weather (your feature)
    useEffect(() => {
        async function loadWeather() {
            try {
                if (!country?.capital?.[0]) return;

                setWeatherLoading(true);

                const result = await getWeatherByCity(country.capital[0]);
                setWeather(result.weather);
            } catch (err) {
                console.error("Weather error:", err);
            } finally {
                setWeatherLoading(false);
            }
        }

        loadWeather();
    }, [country]);

    // -------------------------
    // Loading state
    // -------------------------
    if (loading) return <p>Loading Country details ...</p>;
    if (!country) return <p>No country found</p>;

    //  if (!country) return <p>Loading Country details ...</p>

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
                        {/* WEATHER API UI */}
                        <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-500 to-blue-700 p-6 text-white shadow-xl">
                            <div className="flex items-start justify-between gap-4">

                                {/* LEFT SECTION */}
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {country.capital?.[0]}
                                    </h3>

                                    {!weatherLoading && weather && (
                                        <>
                                            <p className="mt-1 text-lg capitalize text-blue-100">
                                                {weather.weather[0].description}
                                            </p>

                                            <div className="mt-6 space-y-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">💧</span>
                                                    <span>
                                                        Humidity: {weather.main.humidity}%
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">💨</span>
                                                    <span>
                                                        Wind: {weather.wind.speed} m/s
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">🌡</span>
                                                    <span>
                                                        Feels like {weather.main.temp}°C
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {weatherLoading && (
                                        <p className="mt-4 text-blue-100">
                                            Loading weather...
                                        </p>
                                    )}

                                    {!weatherLoading && !weather && (
                                        <p className="mt-4 text-blue-100">
                                            No weather data available
                                        </p>
                                    )}
                                </div>

                                {/* RIGHT SECTION */}
                                {!weatherLoading && weather && (
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                                            alt={weather.weather[0].description}
                                            className="h-32 w-32 drop-shadow-lg"
                                        />

                                        <p className="-mt-4 text-5xl font-bold">
                                            {Math.round(weather.main.temp)}°C
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Flight Card Dummy*/}
                        {/* FLIGHT DETAILS CARD */}
                        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Flight Details
                            </h2>

                            <div className="space-y-3">
                                <div className="h-4 w-40 rounded bg-gray-200"></div>
                                <div className="h-4 w-64 rounded bg-gray-200"></div>
                                <div className="h-4 w-52 rounded bg-gray-200"></div>
                                <div className="h-20 rounded bg-gray-100"></div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </main>
    );

}