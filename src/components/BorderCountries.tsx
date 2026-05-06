import { Link } from "react-router-dom";
import type { BorderCountriesProps } from "../types/countryTypes";

export function BorderCountries({ borderCountries }: BorderCountriesProps) {
    if (borderCountries.length === 0) {
        return <p>No border countries</p>
    }

    return (
        <div>
            {
                borderCountries.map((border) => (
                    <Link to={`/country/${border.name.common}`} key={border.cca3}>
                        <button>{border.name.common}</button>
                    </Link>
                ))
            }
        </div>
    )

}