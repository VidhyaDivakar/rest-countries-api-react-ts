import { useState, useEffect } from "react";
import type { Pagination, PaginationInputPros } from "../types/pagination";

function usePagination({ totalItems, itemsPerPage, initialPage }: PaginationInputPros): Pagination {

    //state- render this hook onchange of currentPage. 
    const [currentPage, setCurrentPage] = useState(initialPage);

    //varaible which gets updated on every render, these all are derived values from the other input props
    //update when input prop/hooks' state changes
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        const newTotalPages = Math.ceil(totalItems / itemsPerPage);
        setCurrentPage(prev => Math.max(1, Math.min(prev, newTotalPages)));
    }, [itemsPerPage, totalItems]);

    const canNextPage = currentPage < totalPages;
    const canPrevPage = currentPage > 1;

    const nextPage = ()=>{
        console.log("inside use pagination hook next page");
        setCurrentPage(prevPage => prevPage + 1)
    };

    const prevPage = ()=>{
        setCurrentPage(prevPage => prevPage - 1)
    };

    const setPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return {
        setPage: setPage,
        currentPage: currentPage,
        totalPages: totalPages,
        startIndex: startIndex,
        endIndex: endIndex,
        itemsOnCurrentPage: itemsPerPage, 
        nextPage: nextPage,
        prevPage: prevPage,
        canNextPage: canNextPage,
        canPrevPage: canPrevPage
    }
  }

export default usePagination;

