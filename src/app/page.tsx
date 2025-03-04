"use client";

import TableReact from "@/components/table";
import { PokemonService } from "@/modules/services/PokemonService";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const {
    data: pokemons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemons", "all"],
    queryFn: PokemonService.getAll,
  });

  // const {results, next} = pokemons;

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <TableReact tableName="lista de Pokemones" data={pokemons.results} nextUrl={pokemons.next} />
    </div>
  );
}
