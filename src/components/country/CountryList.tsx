
import usePagination from "../../hooks/usePagination";
import type { Pagination } from "../../types/pagination";
import PaginationControls from "../Dashboard/PaginationControls";
import CountryCard from "./CountryCard";
import type { Country } from "../../types/countryTypes";

function CountryList({filteredList}){

    
    const pagination:Pagination = usePagination({ 
        totalItems: filteredList.length, 
        itemsPerPage: 6, 
        initialPage:1 
    });

    console.log(filteredList);

    //get the country list to be displayed for the page
    const pageItems:Country[]= filteredList.slice(pagination.startIndex, pagination.endIndex);

    return (<>
    {pageItems.map((country)=><CountryCard key={country.name} {...country}/>
    )}
    <PaginationControls pagination={pagination} totalItems={filteredList.length}/> 
    {/*passing the whole pagination object instad of destructing as it has many properties */}
    </>)
}

export default CountryList;