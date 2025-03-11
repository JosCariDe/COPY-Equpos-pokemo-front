"use client";
import LoaderScreen from "@/components/Loaders/LoaderScreen";
import { EquipoEntrenadorService } from "@/modules/services/TeamCoachService";
import { TeamsServices } from "@/modules/services/TeamsService";
import { TeamCoach } from "@/modules/types/TeamCoach";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EntrenadorDetalle() {

  const [createTeamModal, setCreateTeam] = useState(false);
  const [nombreEquipo, setNombreEquipo] = useState("");
  const { id: entrenadorId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: teamCoach,
    isLoading: isLoadingEquipoEntrenador,
    error: errorLoadingEquipoEntrenador,
  } = useQuery({
    queryKey: ["teamCoach", entrenadorId],
    queryFn: () => EquipoEntrenadorService.getByEntrenador(parseInt(entrenadorId as string)),
    enabled: !!entrenadorId,
  });

  const getAllTeams = async (teamCoach: TeamCoach | undefined) => {
    if (!teamCoach || teamCoach.equiposIds.length === 0) return [];
    return await Promise.all(
      teamCoach.equiposIds.map((equipoId) => TeamsServices.getOne(equipoId))
    );
  };

  const {
    data: teams,
    isLoading: isLoadingTeams,
    error: errorLoadingTeams,
  } = useQuery({
    queryKey: ["Teams", entrenadorId, teamCoach?.equiposIds],
    queryFn: () => getAllTeams(teamCoach),
    enabled: !!teamCoach,
  });

  useEffect(() => {
    if (!isLoadingEquipoEntrenador && errorLoadingEquipoEntrenador != null) {
      // No existe `teamCoach`, entonces se crea
      EquipoEntrenadorService.createEquipoEntrenador({
        entrenadorId: parseInt(entrenadorId as string),
        equiposIds: [],
        equipoSeleccionado: "",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["teamCoach", entrenadorId] });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingEquipoEntrenador]);

  const onSubmitTeam = async () => {
    await TeamsServices.createTeam({
      entrenadorId: entrenadorId as string,
      pokemonIds: [],
      nombre: nombreEquipo,
    });
  };

  const createTeamMutation = useMutation({
    mutationFn: onSubmitTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamCoach", entrenadorId] });
      setNombreEquipo("");
      setCreateTeam(false);
    },
  });

  if (isLoadingEquipoEntrenador || isLoadingTeams) return <LoaderScreen />;

  return (
    <div className="h-full flex flex-col items-center p-6 text-[var(--foreground)]">
      <div className="p-6 rounded-lg shadow-md max-w-3xl w-full">
        <div className="flex flex-row flex-wrap justify-around">
          <button
            onClick={() => setCreateTeam(true)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Crear nuevo equipo
          </button>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Añadir Pokémon
          </button>
        </div>



        <h2 className="text-xl font-bold mt-6">Equipos</h2>
        {errorLoadingTeams && (
          <p className="text-red-500">Error al cargar los equipos.</p>
        )}
        {errorLoadingEquipoEntrenador && (
          <p className="text-red-500">Error al cargar el equipo del entrenador.</p>
        )}
        {teamCoach && teamCoach.equiposIds?.length > 0 ? (
          <>
            {teams && teams.length > 0 && teams.map((team) => (
              <div
                key={team.id}
                className="mt-4 p-4 bg-gray-200 rounded-md shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {team.nombre}
                  </h3>
                </div>
              </div>
            ))}
          </>

        ) : (
          <p className="text-gray-600">No hay equipos disponibles.</p>
        )}
      </div>

      {/* 🟢 Modal de CREAR EQUIPO */}
      {createTeamModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
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

    </div>
  );
}
