import { useEffect, useState } from "react";
import { fetchCountryDetails, fetchBorderCountries } from "../services/restCountriesApiService";
import type { BorderCountry, CountryDetailsApiData } from "../types/countryTypes";
import { BorderCountries } from "../components/BorderCountries";
import { useParams } from "react-router-dom";

// Weather service functions
import { getWeatherByCity } from "../services/weatherService";

// Flight service functions

import { getFlightsByAirport } from "../services/flightService";
import { capitalAirportMap } from "../data/capitalAirportMap";
import type { Flight } from "../types/flightTypes";

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
                        {/* FLIGHT DETAILS */}
                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md border border-gray-200">
                            <h2 className="mb-5 text-2xl font-bold text-gray-800 flex items-center gap-2">
                                ✈️ Flight Details
                            </h2>

                            {flightLoading && (
                                <p className="text-gray-500">Loading flights...</p>
                            )}

                            {!flightLoading && flights.length === 0 && (
                                <p className="text-gray-500">No flight data available</p>
                            )}

                            <div className="space-y-5">
                                {flights.map((flight, index) => (
                                    <div
                                        key={index}
                                        className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                                    >
                                        {/* Top Row */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {flight.airline.name}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Flight{" "}
                                                    <span className="font-medium text-gray-700">
                                                        {flight.flight.iata}
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Status Badge */}
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${flight.flight_status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : flight.flight_status === "landed"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : flight.flight_status === "cancelled"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {flight.flight_status.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Route Section */}
                                        <div className="mt-5 flex items-center justify-between text-sm">
                                            {/* Departure */}
                                            <div className="w-5/12">
                                                <p className="text-gray-400 text-xs uppercase tracking-wide">
                                                    Departure
                                                </p>
                                                <p className="font-medium text-gray-800 mt-1">
                                                    {flight.departure.airport}
                                                </p>
                                            </div>

                                            {/* Plane Icon / Line */}
                                            <div className="flex-1 flex items-center justify-center">
                                                <div className="w-full h-px bg-gray-300 relative">
                                                    <span className="absolute left-1/2 -translate-x-1/2 -top-2 text-lg">
                                                        ✈️
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Arrival */}
                                            <div className="w-5/12 text-right">
                                                <p className="text-gray-400 text-xs uppercase tracking-wide">
                                                    Arrival
                                                </p>
                                                <p className="font-medium text-gray-800 mt-1">
                                                    {flight.arrival.airport}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </main>
    );

}