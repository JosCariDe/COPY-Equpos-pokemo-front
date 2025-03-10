"use client";

import { PokemonService } from "@/modules/services/PokemonService";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: pokemons, isLoading, error } = useQuery({
    queryKey: ["pokemons", "all"],
    queryFn: () => PokemonService.getAll(5),
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {pokemons?.map((pokemon) => (
        <div key={pokemon.id}>
          {pokemon.id} {pokemon.name} {pokemon.image}
          <div>
            {pokemon.types.map((type: string, index: number) => (
              <span key={index}>{type} </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}