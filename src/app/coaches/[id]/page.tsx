"use client";
import Page from "@/app/pokemons/page";
import { TeamsServices } from "@/modules/services/TeamsServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EntrenadorDetalle() {
  const [showInputAddPokemon, setShowInputAddPokemon] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<number | null>(
    null
  );
  const [mostrarModal, setMostrarModal] = useState(false);
  const [equipoExpandido, setEquipoExpandido] = useState<number | null>(null);
  const [createTeamModal, setCreateTeam] = useState(false);
  const [nombreEquipo, setNombreEquipo] = useState("");
  const { id: entrenadorId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Teams", entrenadorId],
    queryFn: () => TeamsServices.getOne(parseInt(entrenadorId as string)),
  });

  const createTeamMutation = useMutation({
    mutationFn: () =>
      TeamsServices.createTeam(
        { nombre: nombreEquipo, pokemonIds: [] },
        parseInt(entrenadorId as string)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["Teams"]);
      setNombreEquipo("");
      setCreateTeam(false);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
        <div className="flex flex-row flex-wrap justify-around">
          <button
            onClick={() => setCreateTeam(true)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Crear nuevo equipo
          </button>
          <button
            onClick={() => setShowInputAddPokemon((prev) => !prev)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Añadir Pokémon
          </button>
        </div>

        {showInputAddPokemon ? <div className="mt-3 items-start">
          <form className="max-w-sm mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Seleccione un equipo
            </label>

            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                Choose a country
              </option>
            </select>
          </form>
        </div> : <div></div>}
        

        <h2 className="text-xl font-bold mt-6 text-gray-800">Equipos</h2>
        {isLoading ? (
          <p>Cargando equipos...</p>
        ) : error ? (
          <p className="text-red-500">Error al cargar los equipos.</p>
        ) : teams?.equipos?.length > 0 ? (
          teams.equipos.map((equipo: any) => (
            <div
              key={equipo.id}
              className="mt-4 p-4 bg-gray-200 rounded-md shadow-md"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {equipo.nombre}
                </h3>
                <button
                  onClick={() =>
                    setEquipoExpandido(
                      equipoExpandido === equipo.id ? null : equipo.id
                    )
                  }
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                >
                  {equipoExpandido === equipo.id ? "Ocultar" : "Ver Detalles"}
                </button>
              </div>

              {equipoExpandido === equipo.id && (
                <div className="mt-3 bg-white p-3 rounded-md shadow-md">
                  <h4 className="font-semibold text-gray-700">
                    Pokémon en este equipo:
                  </h4>
                  {equipo.pokemons.length > 0 ? (
                    <ul className="mt-2 grid grid-cols-2 gap-4">
                      {equipo.pokemons.map((pokemon: any, index: number) => (
                        <li
                          key={index}
                          className="bg-gray-100 p-2 rounded-md shadow text-center"
                        >
                          <strong className="text-gray-900">
                            {pokemon.nombre}
                          </strong>
                          <p className="text-sm text-gray-600">
                            Nivel: {pokemon.nivel}
                          </p>
                          <p className="text-sm text-gray-600">
                            Tipo: {pokemon.tipo}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">
                      No hay Pokémon en este equipo.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No hay equipos disponibles.</p>
        )}
      </div>

      {/* 🟢 Modal de CREAR EQUIPO */}
      {createTeamModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Botón para cerrar el modal */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-gray-200 rounded-full p-2"
              onClick={() => setCreateTeam(false)}
            >
              ✖
            </button>

            {/* Título */}
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Crear Nuevo Equipo
            </h2>

            {/* Formulario */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createTeamMutation.mutate();
              }}
              className="mt-4 space-y-4"
            >
              {/* Input para el nombre del equipo */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Nombre del equipo:
                </label>
                <input
                  type="text"
                  value={nombreEquipo}
                  onChange={(e) => setNombreEquipo(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Botón para guardar */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
              >
                Guardar Equipo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🟢 Modal para Añadir Pokémon */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-gray-200 rounded-full p-2"
              onClick={() => setMostrarModal(false)}
            >
              ✖
            </button>
            <div className="overflow-hidden max-h-[85vh]">
              <Page />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
