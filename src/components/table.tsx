import { Result } from "@/modules/interfaces/pokemon";
import { PokemonService } from "@/modules/services/PokemonService";
import { EyeIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useMemo, useState } from "react";
import Pagination from "./pagination";
import PokemonDetails from "./pokemonDetail";

interface dataTable {
  tableName: string;
  data: Result[];
  nextUrl: string;
}

const TableReact = ({ tableName, data, nextUrl }: dataTable) => {
  const [tableData, setTableData] = useState(data);
  const [rowsLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(nextUrl);
  const totalPage = Math.ceil(tableData.length / rowsLimit);
  const [selectedPokemon, setSelectedPokemon] = useState<Result | null>(null);

  const rowsToShow = useMemo(() => {
    const startIndex = currentPage * rowsLimit;
    return tableData.slice(startIndex, startIndex + rowsLimit);
  }, [currentPage, tableData, rowsLimit]);

  const changePage = (value: number): void => {
    if (value >= 0 && value < totalPage) {
      setCurrentPage(value);
    }
  };

  const loadMoreData = async () => {
    if (!nextPageUrl) return;
    const newData = await PokemonService.getSpecifict(nextPageUrl);
    const { results, next } = newData;
    setNextPageUrl(next);
    setTableData((prev) => [...prev, ...results]);
  };

  return (
    <div className="min-h-screen h-full bg-white flex items-center justify-center pt-10 pb-14">
      <div className="w-full max-w-4xl px-2">
        <h1 className="text-2xl font-medium">{tableName}</h1>
        <div className="w-full overflow-x-auto mt-2">
          <table className="table-auto w-full text-left border">
            <thead className="bg-gray-200 text-gray-700 font-semibold">
              <tr>
                {tableData.length > 0 &&
                  Object.keys(tableData[0]).map((key) => (
                    <th key={key} className="py-3 px-3">
                      {key}
                    </th>
                  ))}
                <th className="py-3 px-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rowsToShow.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  {Object.values(item).map((value, i) => (
                    <td
                      key={i}
                      className="py-2 px-3 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {Array.isArray(value) ? (
                        <ul className="max-h-[100px] overflow-y-auto">
                          {value.map((detail, j) => (
                            <li key={j} className="text-sm text-gray-600">
                              {Object.entries(detail).map(([key, val]) => (
                                <div key={key} className="truncate">
                                  <strong>{key}:</strong> {val}
                                </div>
                              ))}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="truncate block">{value}</span>
                      )}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-center flex justify-center gap-4">
                    <button
                      onClick={() => setSelectedPokemon(item)}
                      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          changePage={changePage}
        />

        {currentPage === totalPage - 1 && nextPageUrl && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreData}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Cargar más datos
            </button>
          </div>
        )}
        {selectedPokemon && (
          <PokemonDetails
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TableReact;
