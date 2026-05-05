import { DataError, NetworkError } from "../errorHandler/errorHandler";

//fetch all countries needed for home page
export async function fetchAllCountries() {

    try {
        const response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
        );

        // Check if the API request was successful
        if (!response.ok) {
            throw new NetworkError("Failed to fetch countries");
        }
        const data = await response.json();

        // validate that the API returned an Array
        if (!Array.isArray(data)) {
            throw new DataError("Invalid data for countries")
        }
        return data;
    } catch (error) {
        //Re-throw custom errors
        if (error instanceof NetworkError || error instanceof DataError) {
            throw error;
        }

        //handle unexpected errors
        throw new Error("Something went wrong with fetching all countries")
    }
}

//fetch details for one selected Country 
export async function fetchCountryDetails(name: string) {
    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`
        );

        // Check if the API request was successful
        if (!response.ok) {
            throw new NetworkError(`Failed to fetch country ${name}`);
        }
        const data = await response.json();

        // validate that the API returned an array
        if (!Array.isArray(data)) {
            throw new DataError(`Invalid data for country ${name}`)
        }
        return data;

    } catch (error) {
        //Re-throw custom errors
        if (error instanceof NetworkError || error instanceof DataError) {
            throw error;
        }
        //handle unexpected errors
        throw new Error(`Something went wrong with fetching details for ${name}`);
    }

}

//Fetch border country details using their country codes
export async function fetchBorderCountries(codes: string[]) {
    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}&fields=name,cca3`
        );

        // Check if the API request was successful
        if (!response.ok) {
            throw new NetworkError(`Failed to fetch border countries: ${codes.join(",")}`);
        }
        const data = await response.json();

        //validate that the API returned an array
        if (!Array.isArray(data)) {
            throw new DataError("Invalid data for border countries");
        }
        return data

    } catch (error) {
        //Re-throw custom errors
        if (error instanceof NetworkError || error instanceof DataError) {
            throw error;
        }

        //handle unexpected errors
        throw new Error("Something went wrong with fething border countries")
    }
}
