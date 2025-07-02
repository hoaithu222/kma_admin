const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    let start = Math.max(0, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages - 1, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(0, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-2 justify-between items-center mt-4 sm:flex-row">
      {/* Info */}
      <div className="text-xs text-secondary">
        Hiển thị {currentPage * pageSize + 1} -{" "}
        {Math.min((currentPage + 1) * pageSize, totalItems)} của {totalItems}{" "}
        kết quả
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-1 items-center">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-2 py-1 text-xs rounded border border-secondary hover:bg-background-muted disabled:opacity-50 disabled:cursor-not-allowed text-secondary"
        >
          Trước
        </button>

        {/* First Page */}
        {getPageNumbers()[0] > 0 && (
          <>
            <button
              onClick={() => onPageChange(0)}
              className="px-2 py-1 text-xs rounded border border-secondary hover:bg-background-muted text-secondary"
            >
              1
            </button>
            {getPageNumbers()[0] > 1 && <span className="px-1">...</span>}
          </>
        )}

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 text-xs border rounded ${
              page === currentPage
                ? "bg-secondary text-white border-secondary"
                : "border-secondary hover:bg-background-muted text-secondary"
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* Last Page */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 2 && (
              <span className="px-1">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages - 1)}
              className="px-2 py-1 text-xs rounded border border-secondary hover:bg-background-muted text-secondary"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-2 py-1 text-xs rounded border border-secondary hover:bg-background-muted disabled:opacity-50 disabled:cursor-not-allowed text-secondary"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default Pagination;
