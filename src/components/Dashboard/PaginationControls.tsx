
function PaginationControls({pagination, totalItems}) {

 //   const totalNoOfCountries = 100;

    const handlePageChange = (e) => {//Todo: add different event types like: mouse & key
        pagination.setPage(e.target.value);
    }

    return (<div className="flex gap-2 justify-between flex-wrap mt-5">

        <button type="button" className="bg-blue-300 px-2" disabled={!pagination.canPrevPage} onClick={pagination.prevPage}>&lt;</button>
        <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        <div className="flex gap-2 flex-wrap">
        {Array.from({ length: pagination.totalPages }, (_, i) => (<button key={i + 1} value={i + 1}  className="bg-blue-300 px-2" type="button" onClick={handlePageChange}>{i + 1}</button>))}
        </div>
        <span>Total Countries: {totalItems}</span>
        <button type="button" className="bg-blue-300 px-2" disabled={!pagination.canNextPage} onClick={pagination.nextPage}> &gt;</button>

    </div>)
}

export default PaginationControls;