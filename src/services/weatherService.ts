import type { WeatherResponse } from "../types/weatherTypes";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;


// 1. Get coordinates from city
export async function getCoordinates(city: string, country?: string) {
    const query = country
        ? `${city},${country}`
        : city;
    const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            city
        )}&limit=1&appid=${OPENWEATHER_API_KEY}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch coordinates");
    }

    const data = await res.json();

    if (!data || data.length === 0) {
        throw new Error(`No coordinates found for city: ${city}`);
    }

    return {
        lat: data[0].lat as number,
        lon: data[0].lon as number,
        name: data[0].name as string,
        country: data[0].country as string,
    };
}

// 2. Fetch One Call Weather (TYPE SAFE)

export async function fetchWeather(
    lat: number,
    lon: number
): Promise<WeatherResponse> {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data: WeatherResponse = await res.json();
    return data;
}


// 3. Combined helper (clean API for UI)

export async function getWeatherByCity(city: string) {
    const coords = await getCoordinates(city);

    const weather = await fetchWeather(coords.lat, coords.lon);

    return {
        location: {
            city: coords.name,
            country: coords.country,
        },
        weather,
    };
}