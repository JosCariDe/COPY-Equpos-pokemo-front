import Button from "./buttons/General";

interface dataPagiantion {
  currentPage: number;
  totalPage: number;
  changePage: (value: number) => void;
}
const Pagination = ({ currentPage, totalPage, changePage }: dataPagiantion) => {
  return (
    <div className="flex items-center flex-row my-2">
      <Button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Anterior
      </Button>
      <div className="mx-2">
        {[...Array(totalPage)].map((_, index) =>
          index >= Math.max(0, currentPage - 2) &&
            index <= Math.min(totalPage - 1, currentPage + 2) ? (
            <Button
              key={index}
              onClick={() => changePage(index)}
              className={`px-3! py-2 border rounded-md ${currentPage === index ? "bg-blue-500  text-[var(--foreground)]" : "bg-gray-200"
                }`}
            >
              {index + 1}
            </Button>
          ) : null
        )}
      </div>
      <Button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPage - 1}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default Pagination;
