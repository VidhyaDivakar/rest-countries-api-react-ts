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
                    className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
                >
                    {border.flags?.png && (
                        <img
                            src={border.flags.png}
                            alt={`${border.name.common} flag`}
                            className="h-4 w-6 rounded-sm object-cover"
                        />
                    )}

                    <span>{border.name.common}</span>
                </Link>
            ))}
        </div>
    );

}