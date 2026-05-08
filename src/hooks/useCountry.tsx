import { useState, useEffect } from "react";
import { fetchAllCountries } from "../services/restCountriesApiService";
import type { Country, CountryDetailsApiData } from "../types/countryTypes";
import countryMapper from "../components/mapper/countryMapper";

function useCountry(): { countryList: Country[] } {

        const [countryList, setCountryList] = useState<Country[]>([]);
        useEffect(()=>{
                const countryPromiseObj = fetchAllCountries();
                countryPromiseObj.then((data)=>{
                    
                    const coutries:CountryDetailsApiData[] = data;
                    //convert list of CountryDetailsApiData to Country list
                    const countryList:Country[] = coutries.map(countryMapper);

                    setCountryList(countryList);
                });
        
            },[]);
    return ({countryList});
}

export default useCountry;