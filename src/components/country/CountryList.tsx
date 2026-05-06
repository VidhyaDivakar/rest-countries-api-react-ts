import usePagination from "../../hooks/usePagination";
import type { Pagination } from "../../types/pagination";
import PaginationControls from "../Dashboard/PaginationControls";
import CountryCard from "./CountryCard";

function CountryList(){

    const pagination:Pagination = usePagination({ 
        totalItems: 100, 
        itemsPerPage: 6, 
        initialPage:1 
    }); 
    return (<>
    <CountryCard/>
    <PaginationControls {...pagination}/> 
    {/* instead of passing each property in pagination object separately, use spread operator to do that */}
    </>)
}

export default CountryList;