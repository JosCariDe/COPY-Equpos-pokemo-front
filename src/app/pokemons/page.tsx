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
    queryFn: PokemonService.getAll(),
    queryKey: ["pokemons", "all"],
    retry: 2,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {typeof pokemons}
      <TableReact
        tableName="lista de Pokemones"
        data={pokemons}
        showActionAdd={true}
        showActionShow={true}
      />
    </div>
  );
};

export default Page;
