import { useEffect, useState } from "react";
import { fetchCountryDetails, fetchBorderCountries } from "../services/restCountriesApiService";
import type { BorderCountry, CountryDetailsApiData } from "../types/countryTypes";
import { BorderCountries } from "../components/BorderCountries";
import { Link, useParams } from "react-router-dom";

// Weather service functions
import { getWeatherByCity } from "../services/weatherService";

// Flight service functions

import { getFlightsByAirport } from "../services/flightService";
import { capitalAirportMap } from "../data/capitalAirportMap";
import type { Flight } from "../types/flightTypes";

// Leaflet Map function
import { CountryMap } from "../components/country/CountryMap";

export function CountryDetailsPage() {

    const { name } = useParams<{ name: string }>();

    const [country, setCountry] = useState<CountryDetailsApiData | null>(null);
    const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [weatherLoading, setWeatherLoading] = useState(false);


    const [flights, setFlights] = useState<Flight[]>([]);
    const [flightLoading, setFlightLoading] = useState(false);

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

    // Loading weather details from API
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

    // Loading flight details from the API
    useEffect(() => {
        async function loadFlights() {
            try {
                if (!country?.capital?.[0]) return;

                const capital = country.capital[0];
                console.log("Capital:", capital);

                const airportCode = capitalAirportMap[capital];
                console.log("Airport Code:", airportCode);

                if (!airportCode) {
                    console.log("No airport mapping found");
                    return;
                }

                setFlightLoading(true);

                const result = await getFlightsByAirport(airportCode);

                console.log("Flight Result:", result);
                console.log("Capital:", capital);
                console.log("Airport Code:", airportCode);

                if (result.data) {
                    setFlights(result.data.slice(0, 3));
                } else {
                    setFlights([]);
                }

            } catch (err) {
                console.error("Flight error:", err);
            } finally {
                setFlightLoading(false);
            }
        }

        loadFlights();
    }, [country]);

    // Loading state
    //
    if (loading) return <p>Loading Country details ...</p>;
    if (!country) return <p>No country found</p>;
    const coords = country.capitalInfo?.latlng;
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

                            {/* HEADER */}
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                                <div>
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Location Map
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Explore the capital city location
                                    </p>
                                </div>

                                {/* Small floating badge */}
                                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
                                    📍 {country.capital?.[0] ?? "Unknown"}
                                </div>
                                {/* Google Maps Link */}
                                {coords && (
                                    <a
                                        href={`https://www.google.com/maps?q=${coords[0]},${coords[1]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                                    >
                                        Open Map
                                    </a>
                                )}
                            </div>

                            {/* MAP SECTION */}
                            <div className="relative p-4">

                                {/* subtle gradient glow */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-sky-100/20" />

                                {coords && coords.length === 2 && (
                                    <CountryMap
                                        coords={[coords[0], coords[1]]}
                                        capital={country.capital?.[0] ?? "Unknown"}
                                        country={country.name.common}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}