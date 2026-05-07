export interface Pagination{
    currentPage: number;
    totalPages: number;
    startIndex:number;
    endIndex:number;
    itemsOnCurrentPage:number;
    setPage:(pageNumber: number)=>void;
    nextPage:()=>void;
    prevPage:()=>void;
    canNextPage:boolean;
    canPrevPage:boolean;
}
export interface PaginationInputPros{
    totalItems: number,
     itemsPerPage: number, 
     initialPage: number
}


export interface PaginationControlInput{
    pagination:Pagination;
    totalItems:number
}