
function PaginationControls({pagination, totalItems}) {

 //   const totalNoOfCountries = 100;

    const handlePageChange = (e) => {//Todo: add different event types like: mouse & key
        pagination.setPage(e.target.value);
    }

    return (<div>

        <button type="button" disabled={!pagination.canPrevPage} onClick={pagination.prevPage}>&lt;</button>
        <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        {Array.from({ length: pagination.totalPages }, (_, i) => (<button key={i + 1} value={i + 1} type="button" onClick={handlePageChange}>{i + 1}</button>))}
        <span>Total Countries: {totalItems}</span>
        <button type="button" disabled={!pagination.canNextPage} onClick={pagination.nextPage}>&gt;</button>

    </div>)
}

export default PaginationControls;