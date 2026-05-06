import type { Country, CountryApiData } from "../../types/countryTypes";

function countryMapper(api: CountryApiData): Country {

    return {
        name: api.name.common,
        population: api.population,
        region: api.region,
        capital: api.capital ? api.capital[0] : "N/A",
        flag: api.flags.png
    }
}

export default countryMapper;