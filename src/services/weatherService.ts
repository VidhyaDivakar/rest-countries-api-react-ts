import { DataError, NetworkError } from "../errorHandler/errorHandler";

// Fetch weather for a city (usually capital city)
export async function fetchWeather(city: string) {
    try {
        const API_KEY = "YOUR_OPENWEATHERMAP_KEY";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new NetworkError(`Failed to fetch weather for ${city}`);
        }

        const data = await response.json();

        if (!data || typeof data !== "object") {
            throw new DataError(`Invalid weather data for ${city}`);
        }

        return data;

    } catch (error) {
        if (error instanceof NetworkError || error instanceof DataError) {
            throw error;
        }

        throw new Error(`Something went wrong with fetching weather for ${city}`);
    }
}