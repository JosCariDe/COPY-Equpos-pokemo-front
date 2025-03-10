"use client";

import { Result } from "@/modules/interfaces/pokemon";
import { trainer } from "@/modules/interfaces/trainer";
import { PokemonService } from "@/modules/services/PokemonService";
import { EyeIcon, PlusIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Pagination from "./pagination";
import PokemonDetails from "./pokemonDetail";

interface dataTable {
  tableName: string;
  data: (trainer | Result)[];
  nextUrl?: string;
  pagination?: boolean;
  showActionAdd?: boolean;
  showActionShow?: boolean;
  gestionTeams?: boolean;
}

const TableReact = ({
  tableName,
  data,
  nextUrl,
  showActionAdd = false,
  showActionShow = false,
  gestionTeams = false,
}: dataTable) => {
  const router = useRouter();
  const [tableData, setTableData] = useState(data);
  const [rowsLimit] = useState(5);
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

  const handleSelectPokemon = (item: Result | trainer) => {
    if ("name" in item) {
      setSelectedPokemon(item as Result);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-4xl px-2!">
        <h1 className="text-2xl font-medium">{tableName}</h1>
        <div className="w-full overflow-x-auto mt-2!">
          <table className="table-auto w-full text-left border">
            <thead className="bg-gray-200 text-gray-700 font-semibold">
              <tr>
                {tableData.length > 0 &&
                  Object.keys(tableData[0]).map((key) => (
                    <th key={key} className="py-3! px-3!">
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
                      className="py-2! px-3! max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      <span className="truncate block">{value}</span>
                    </td>
                  ))}
                  <td className="py-2! px-3! text-center flex justify-center gap-4">
                    {showActionShow && (
                      <button
                        onClick={() => handleSelectPokemon(item)}
                        className="p-2! bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    )}
                    {showActionAdd && (
                      <button className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    )}
                    {gestionTeams && (
                      <button
                        onClick={() => {
                          if ("id" in item) {
                            router.push(`/coaches/${(item as trainer).id}`);
                          }
                        }}
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        <UserGroupIcon className="h-5 w-5" />
                      </button>
                    )}
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

        {showActionAdd &&
          showActionShow &&
          currentPage === totalPage - 1 &&
          nextPageUrl && (
            <div className="flex justify-center mt-4!">
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
