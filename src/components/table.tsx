import { UserGroupIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Pagination from "./pagination";
import { Entrenador } from "@/modules/types/Coach";
import Button from "./buttons/General";

interface dataTable {
  data: Entrenador[];
}

export const TABLE_MAX_ROWS = 10;

const TableReact = ({
  data
}: dataTable) => {
  const router = useRouter();
  const headers = [
    { label: "ID", access: "id" },
    { label: "Nombre", access: "first_name" },
    { label: "Apellido", access: "last_name" },
    { label: "Email", access: "email" },
    { label: "Fecha de Nacimiento", access: "birth_date" },
  ]
  const [currentPage, setCurrentPage] = useState(0);
  const totalPage = Math.ceil(data.length / TABLE_MAX_ROWS);

  const changePage = (value: number): void => {
    if (value >= 0 && value < totalPage) {
      setCurrentPage(value);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-4xl px-2!">
        <h1 className="text-2xl font-medium">Entrenadores</h1>
        <div className="w-full overflow-x-auto mt-2!">
          <table className="table-auto w-full text-left border">
            <thead className="bg-[var(--background2)] text-[var(--foreground)] font-semibold">
              <tr>
                {headers.map((h) => (
                  <th key={h.access} className="py-3! px-3!">
                    {h.label}
                  </th>
                ))}
                <th className="py-3 px-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={(item as any)[headers[0].access]} className="border-b border-gray-300">
                  {headers.map((value, i) => (
                    <td
                      key={value.access + index + i}
                      className="py-2! px-3! max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      <span className="truncate block">{(item as any)[value.access]}</span>
                    </td>
                  ))}
                  <td className="py-2! px-3! text-center flex justify-center gap-4">
                    <Button
                      title="Ver Entrenador"
                      onClick={() => {
                        router.push(`/coaches/${item.id}`);
                      }}
                    >
                      <UserGroupIcon className="h-5 w-5" />
                    </Button>
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
      </div>
    </div>
  );
};

export default TableReact;
