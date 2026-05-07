
import usePagination from "../../hooks/usePagination";
import type { Pagination } from "../../types/pagination";
import PaginationControls from "../Dashboard/PaginationControls";
import CountryCard from "./CountryCard";
import type { Country } from "../../types/countryTypes";

function CountryList({filteredList}){

    
    const pagination:Pagination = usePagination({ 
        totalItems: filteredList.length, 
        itemsPerPage: 12, 
        initialPage:1 
    });

    //get the country list to be displayed for the page
    const pageItems:Country[]= filteredList.slice(pagination.startIndex, pagination.endIndex);

    return (<div className="pt-5">
        <div className="grid grid-cols-6 gap-4">
    {pageItems.map((country)=><CountryCard key={country.name} {...country}/>
    )}</div>
    <PaginationControls pagination={pagination} totalItems={filteredList.length}/> 
    {/*passing the whole pagination object instad of destructing as it has many properties */}
    </div>)
}

export default CountryList;