"use client";
import Page from "@/app/pokemons/page";
import { use, useState } from "react";
import { dataTeams } from "../data";

const pokemonData = [
  { id: 1, nombre: "Pikachu", nivel: 50, tipo: "Eléctrico" },
  { id: 2, nombre: "Charizard", nivel: 52, tipo: "Fuego/Volador" },
  { id: 3, nombre: "Bulbasaur", nivel: 48, tipo: "Planta/Veneno" },
  { id: 4, nombre: "Squirtle", nivel: 47, tipo: "Agua" },
  { id: 5, nombre: "Snorlax", nivel: 50, tipo: "Normal" },
];

export default function EntrenadorDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const entrenadorId = parseInt(id);
  const entrenador = dataTeams.find((e) => e.id === entrenadorId);

  if (!entrenador)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-gray-800">
            No tiene equipos de momento...
          </h2>
        </div>
      </div>
    );

  const [equipos, setEquipos] = useState(entrenador.equipos || []);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<number | null>(
    null
  );
  const [mostrarModal, setMostrarModal] = useState(false);
  const [equipoExpandido, setEquipoExpandido] = useState<number | null>(null);

  // Función para agregar Pokémon al equipo seleccionado
  const agregarPokemonAEquipo = (pokemonId: number) => {
    if (equipoSeleccionado === null) {
      alert("Selecciona un equipo primero");
      return;
    }

    const equipoIndex = equipos.findIndex(
      (equipo) => equipo.id === equipoSeleccionado
    );
    if (equipoIndex === -1) return;

    const pokemon = pokemonData.find((p) => p.id === pokemonId);
    if (!pokemon) return;

    if (equipos[equipoIndex].pokemons.some((p) => p.id === pokemon.id)) {
      alert("Este Pokémon ya está en el equipo");
      return;
    }

    const nuevosEquipos = [...equipos];
    nuevosEquipos[equipoIndex].pokemons.push(pokemon);
    setEquipos(nuevosEquipos);
    setMostrarModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-gray-800">
          {entrenador.nombre}
        </h1>
        <p className="mt-2 text-gray-600">Nivel: {entrenador.nivel}</p>
        <p className="mt-2 text-gray-600">Equipos: {equipos.length}</p>

        {/* Selección de equipo */}
        <h2 className="text-xl font-bold mt-6 text-gray-800">
          Selecciona un equipo
        </h2>
        <select
          onChange={(e) => setEquipoSeleccionado(Number(e.target.value))}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Selecciona un equipo</option>
          {equipos.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>
              {equipo.nombre}
            </option>
          ))}
        </select>

        {equipoSeleccionado ? (
          <button
            onClick={() => setMostrarModal(true)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Añadir Pokémon
          </button>
        ) : (
          <p>si deseas añadir un pokemon. selecciona un equipo</p>
        )}

        {/* Equipos recogidos */}
        <h2 className="text-xl font-bold mt-6 text-gray-800">Equipos</h2>
        {equipos.map((equipo) => (
          <div
            key={equipo.id}
            className="mt-4 p-4 bg-gray-200 rounded-md shadow-md transition-all duration-300"
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

            {/* Sección expandible */}
            {equipoExpandido === equipo.id && (
              <div className="mt-3 bg-white p-3 rounded-md shadow-md transition-all duration-300">
                <h4 className="font-semibold text-gray-700">
                  Pokémon en este equipo:
                </h4>
                {equipo.pokemons.length > 0 ? (
                  <ul className="mt-2 grid grid-cols-2 gap-4">
                    {equipo.pokemons.map((pokemon, index) => (
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
        ))}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full border border-gray-300 relative z-50">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-gray-200 rounded-full p-2"
              onClick={() => setMostrarModal(false)}
            >
              ✖
            </button>

            <div className="overflow-hidden max-h-[80vh]">
              <Page />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
