interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) {
    return (
        <div className="flex flex-col items-center mt-10 gap-4">
            <div className="flex justify-center items-center space-x-6">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-700 transition shadow-sm"
                >
                    Anterior
                </button>

                <span className="text-gray-700 font-medium">
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-700 transition shadow-sm"
                >
                    Próximo
                </button>
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                <label htmlFor="itemsPerPage">Mostrar por página:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    className="border-2 border-gray-300 rounded-md p-1 focus:outline-none focus:border-red-500 bg-white"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={1025}>Todos (1025)</option>
                </select>
            </div>
        </div>
    );
}
