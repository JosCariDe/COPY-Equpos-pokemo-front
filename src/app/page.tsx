"use client";

import { PokemonService } from "@/modules/services/PokemonService";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: pokemons, isLoading, error } = useQuery({
    queryKey: ["pokemons", "all"],
    queryFn: PokemonService.getAll,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {pokemons?.map((pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
    </div>
  );
}
