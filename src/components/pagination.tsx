interface dataPagiantion {
  currentPage: number;
  totalPage: number;
  changePage: (value: number) => void;
}
const Pagination = ({ currentPage, totalPage, changePage }: dataPagiantion) => {
  return (
    <div>
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-3! py-1! border rounded-md bg-gray-500 disabled:opacity-50 text-[var(--foreground)]"
      >
        Anterior
      </button>
      {[...Array(totalPage)].map((_, index) =>
        index >= Math.max(0, currentPage - 2) &&
        index <= Math.min(totalPage - 1, currentPage + 2) ? (
          <button
            key={index}
            onClick={() => changePage(index)}
            className={`px-3! py-1! border rounded-md ${
              currentPage === index ? "bg-blue-500  text-[var(--foreground)]" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ) : null
      )}
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPage - 1}
        className="px-3! py-1! border rounded-md bg-gray-500 disabled:opacity-50 text-[var(--foreground)]"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
