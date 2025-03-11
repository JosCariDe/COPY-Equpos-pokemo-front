"use client"
import HoloCard from "@/components/cards/Card";
import EmptyCard from "@/components/cards/EmptyCard";
import usePokemons from "@/components/hooks/usePokemons";
import LoaderScreen from "@/components/Loaders/LoaderScreen";
import Modal from "@/components/modal/Modal";
import { PokemonService } from "@/modules/services/PokemonService";
import { TeamsServices } from "@/modules/services/TeamsService";
import { Team } from "@/modules/types/Team";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const { data: pokemons, isLoading: isLoadingAllPokemons, error: errorAllPokemons } = usePokemons();
    const [showPokemons, setShowPokemons] = useState(false);
    const { id: teamId } = useParams();

    const getAllPokemons = async (team: Team | undefined) => {
        if (!team || team.pokemonesIds.length === 0) return [];
        return await Promise.all(
            team.pokemonesIds.map((equipoId) => PokemonService.getOne(equipoId))
        );
    };
    const {
        data: team,
        isLoading: isLoadingTeam,
        error: errorTeam,
    } = useQuery({
        queryKey: ["pok-team", teamId],
        queryFn: () => TeamsServices.getOne(teamId as string),
        enabled: !!teamId,
    });

    const {
        data: pokemonsOfTeam,
        isLoading: isLoadingPokemons,
        error: errorLoadingPokemons,
    } = useQuery({
        queryKey: ["Pokemons", teamId],
        queryFn: () => getAllPokemons(team),
        enabled: !!team,
    });

    if (isLoadingAllPokemons || isLoadingTeam) return <LoaderScreen />;

    if (errorAllPokemons || errorLoadingPokemons)
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-red-500 text-lg font-semibold">
                    Ocurrió un error al cargar los pokemons. Inténtalo de nuevo más tarde.
                </p>
            </div>
        );

    if (errorTeam)
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-red-500 text-lg font-semibold">
                    Ocurrio un error al cargar el equipo. Inténtalo de nuevo mas tarde.
                </p>
            </div>
        );

    return (
        <div className="h-full w-full">
            <h1>Equipo: {team?.nombre}</h1>
            <h2>Pokemones:</h2>
            <br />
            <section className="flex flex-wrap flex-row gap-4">
                {isLoadingPokemons ? (
                    <LoaderScreen />
                ) : (
                    (Array.from({ length: 6 }).map((_, index) => {
                        const temp = (pokemonsOfTeam || [])[index];
                        if (!temp) {
                            return (
                                <EmptyCard key={index}
                                    onClick={() => { setShowPokemons(true) }}>
                                </EmptyCard>
                            );
                        } else {
                            return (
                                <HoloCard
                                    key={temp.id}
                                    pokemon={temp}
                                />
                            );
                        }
                    }))
                )
                }
            </section>
            <Modal
                isOpen={showPokemons}
                title="Selecciona un pokemon"
                onClose={() => setShowPokemons(false)}
            >
                <div className="flex flex-wrap flex-row gap-1 overflow-y-auto h-[calc(100vh-12rem)]">
                    {pokemons?.map((pokemon) => (
                        <HoloCard
                            key={pokemon.id}
                            pokemon={pokemon}
                        />
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Page;
