import { Link } from "react-router-dom";
import type { BorderCountriesProps } from "../types/countryTypes";

export function BorderCountries({ borderCountries }: BorderCountriesProps) {
    if (borderCountries.length === 0) {
        return <p className="text-gray-500">No border countries</p>
    }

    return (
        <div className="flex flex-wrap gap-3">
            {borderCountries.map((border) => (
                <Link
                    to={`/country/${border.name.common}`}
                    key={border.cca3}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100"
                >
                    {border.name.common}
                </Link>
            ))}
        </div>
    );

}