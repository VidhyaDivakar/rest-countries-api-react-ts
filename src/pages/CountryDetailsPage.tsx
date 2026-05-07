import { useEffect, useState } from "react";
import { fetchCountryDetails, fetchBorderCountries } from "../services/restCountriesApiService";
import type { BorderCountry, CountryDetailsApiData } from "../types/countryTypes";
import { BorderCountries } from "../components/BorderCountries";
import { Link, useParams } from "react-router-dom";

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
        <main className="min-h-screen bg-gray-50 px-6 py-8">
            <section className="mx-auto w-full max-w-7xl px-6">
                <Link
                    to="/dashboard"
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                >
                    ← Back to All Countries
                </Link>

                <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* LEFT SIDE */}
                    <div>
                        <img
                            src={country.flags.png}
                            alt={`${country.name.common} flag`}
                            className="h-64 w-full max-w-xl rounded-2xl border border-gray-200 object-cover shadow-lg"
                        />

                        <div className="mt-6">
                            <h2 className="text-3xl font-bold text-gray-900">
                                {country.name.common}
                            </h2>

                            <p className="mt-2 text-gray-600">{nativeName}</p>
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <h3 className="mb-3 text-base font-semibold">Key Facts</h3>

                                <div className="space-y-3 text-sm text-gray-700">
                                    <p className="flex items-center gap-2">
                                        <span>👥</span>
                                        <span>Population: {country.population.toLocaleString()}</span>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <span>🌎</span>
                                        <span>Region: {country.region}</span>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <span>🏛️</span>
                                        <span>Capital: {country.capital?.[0] || "N/A"}</span>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <span>🔗</span>
                                        <span>Top Level Domain: {country.tld?.[0] || "N/A"}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <h3 className="mb-3 text-base font-semibold">More Details</h3>

                                <div className="space-y-3 text-sm text-gray-700">
                                    <p className="flex items-center gap-2">
                                        <span>📍</span>
                                        <span>Subregion: {country.subregion || "N/A"}</span>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <span>🗣️</span>
                                        <span>Languages: {languages}</span>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <span>💰</span>
                                        <span>Currencies: {currencies}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <h3 className="mb-3 text-lg font-semibold">Border Countries</h3>
                            <BorderCountries borderCountries={borderCountries} />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>
                        {/* WEATHER API UI */}
                        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-500 to-blue-700 p-6 text-white shadow-xl">
                            <div className="flex items-start justify-between gap-4">
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
                                                    <span>Humidity: {weather.main.humidity}%</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">💨</span>
                                                    <span>Wind: {weather.wind.speed} m/s</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">🌡</span>
                                                    <span>Feels like {weather.main.temp}°C</span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {weatherLoading && (
                                        <p className="mt-4 text-blue-100">Loading weather...</p>
                                    )}

                                    {!weatherLoading && !weather && (
                                        <p className="mt-4 text-blue-100">
                                            No weather data available
                                        </p>
                                    )}
                                </div>

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

                        {/* FLIGHT DETAILS CARD */}
                        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800">
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