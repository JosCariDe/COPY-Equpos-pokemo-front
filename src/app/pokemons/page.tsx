"use client";
import TableReact from "@/components/table";
import { PokemonService } from "@/modules/services/PokemonService";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const {
    data: pokemons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemons", "all"],
    queryFn: PokemonService.getAll,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="mt-5">
      <TableReact
        tableName="lista de Pokemones"
        data={pokemons.results}
        nextUrl={pokemons.next}
        showActionAdd={true}
        showActionShow={true}
      />
    </div>
  );
};

export default Page;
