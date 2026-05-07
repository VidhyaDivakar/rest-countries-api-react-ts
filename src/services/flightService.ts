
// This file is used to calling the Aviationstack API to fetching flight data, and returning the response.

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;

export async function getFlightsByAirport(iata: string) {
    const response = await fetch(
        `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${iata}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch flight data");
    }
    const data = await response.json();
    console.log("Flight API Response:", data);

    return data;
}