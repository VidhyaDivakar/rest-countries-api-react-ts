import { useState, useEffect } from "react";
import { fetchAllCountries } from "../services/restCountriesApiService";
import type { Country } from "../types/countryTypes";

function useCountry(){

        const [countryList, setCountryList] = useState<Country[]>([]);
        useEffect(()=>{
                const countryPromiseObj = fetchAllCountries();
                countryPromiseObj.then((data)=>{
                    console.log(data);
                    setCountryList(countryList);
                });
        
            },[]);
    return ({countryList});
}

export default useCountry;