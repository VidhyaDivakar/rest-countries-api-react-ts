
import usePagination from "../../hooks/usePagination";
import type { Pagination } from "../../types/pagination";
import PaginationControls from "../Dashboard/PaginationControls";
import CountryCard from "./CountryCard";
import type { Country } from "../../types/countryTypes";

function CountryList({filteredList}){

    
    const pagination:Pagination = usePagination({ 
        totalItems: filteredList.length, 
        itemsPerPage: 4, 
        initialPage:1 
    });

    console.log(filteredList);

    //get the country list to be displayed for the page
    const pageItems:Country[]= filteredList.slice(pagination.startIndex, pagination.endIndex);

    return (<div className="pt-5">
        <div className="flex gap-10 flex-wrap">
    {pageItems.map((country)=><CountryCard key={country.name} {...country}/>
    )}</div>
    <PaginationControls pagination={pagination} totalItems={filteredList.length}/> 
    {/*passing the whole pagination object instad of destructing as it has many properties */}
    </div>)
}

export default CountryList;