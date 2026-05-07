import type { PaginationControlInput } from "../../types/pagination";

function PaginationControls({pagination, totalItems}:PaginationControlInput) {

    const handlePageChange = (e) => {//Todo: add different event types like: mouse & key
        pagination.setPage(Number(e.target.value));
    }

    return (
        <div className="flex gap-2 justify-between items-center mt-6 min-w-0 border-t border-gray-200 pt-4">
            <button
                type="button"
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-40 transition-colors"
                disabled={!pagination.canPrevPage}
                onClick={pagination.prevPage}
            >&lt;</button>
            <span className="text-gray-600 text-sm">Page {pagination.currentPage} of {pagination.totalPages}</span>
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-1 whitespace-nowrap flex-none max-w-[250px] sm:mx-w-[350px] md:max-w-[450px]">
                    {Array.from({ length: pagination.totalPages }, (_, i) => (
                        <button
                            className="px-3 py-1.5 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            key={i + 1}
                            value={i + 1}
                            type="button"
                            onClick={handlePageChange}
                        >{i + 1}</button>
                    ))}
                </div>
            </div>
            <span className="text-gray-600 text-sm">Total: {totalItems}</span>
            <button
                type="button"
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-40 transition-colors"
                disabled={!pagination.canNextPage}
                onClick={pagination.nextPage}
            >&gt;</button>
        </div>
    );
}

export default PaginationControls;