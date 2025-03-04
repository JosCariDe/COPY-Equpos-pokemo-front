import TableReact from "@/components/table";
import { Entrenador } from "./interfaces";

const entrenadores: Entrenador[] = [
  { id: 1, nombre: "Ash Ketchum", nivel: 50, cantidadEquipos: 3 },
  { id: 2, nombre: "Misty", nivel: 45, cantidadEquipos: 2 },
  { id: 3, nombre: "Brock", nivel: 48, cantidadEquipos: 4 },
  { id: 4, nombre: "Gary Oak", nivel: 55, cantidadEquipos: 5 },
  { id: 5, nombre: "Lance", nivel: 65, cantidadEquipos: 6 },
  { id: 6, nombre: "Cynthia", nivel: 70, cantidadEquipos: 6 },
  { id: 7, nombre: "Steven Stone", nivel: 68, cantidadEquipos: 5 },
  { id: 8, nombre: "Red", nivel: 80, cantidadEquipos: 6 },
  { id: 9, nombre: "Blue", nivel: 72, cantidadEquipos: 5 },
  { id: 10, nombre: "Leon", nivel: 75, cantidadEquipos: 6 },
  { id: 11, nombre: "Red", nivel: 80, cantidadEquipos: 6 },
  { id: 12, nombre: "Blue", nivel: 72, cantidadEquipos: 5 },
  { id: 13, nombre: "Leon", nivel: 75, cantidadEquipos: 6 },
];

const page = () => {
  return (
    <div className="mt-8">
      <TableReact
        data={entrenadores}
        tableName="Entrenadores"
        gestionTeams={true}
      />
    </div>
  );
};

export default page;
