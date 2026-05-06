import type { Pagination } from "../../types/pagination";

function PaginationControls(pagination:Pagination){

    const totalNoOfCountries = 100;

    return (<div>

        <button type="button">&lt;</button>
        <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        {Array.from({length:pagination.totalPages},(_,i)=>(<button key={i+1} type="button">{i+1}</button>))}
        <span>Total Countries: {totalNoOfCountries}</span>
         <button type="button">&gt;</button>

    </div>)
}

export default PaginationControls;