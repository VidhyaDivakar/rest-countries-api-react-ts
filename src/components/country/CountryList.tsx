
import usePagination from "../../hooks/usePagination";
import type { Pagination } from "../../types/pagination";
import PaginationControls from "../Dashboard/PaginationControls";
import CountryCard from "./CountryCard";
import useCountry from "../../hooks/useCountry";
import type { Country } from "../../types/countryTypes";

function CountryList(){

    //use custom hook to get the countryList
    const {countryList} = useCountry();

    const pagination:Pagination = usePagination({ 
        totalItems: 100, 
        itemsPerPage: 6, 
        initialPage:1 
    });

    //get the country list to be displayed for the page
    const pageItems:Country[]= countryList.slice(pagination.startIndex, pagination.endIndex);

    return (<>
    {pageItems.map((country)=><CountryCard key={country.name} {...country}/>
    )}
    <PaginationControls {...pagination}/> 
    {/* instead of passing each property in pagination object separately, use spread operator to do that */}
    </>)
}

export default CountryList;