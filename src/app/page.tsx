"use client";

import { PokemonService } from "@/modules/services/PokemonService";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemons, setPokemon] = useState<any>([]);
  useEffect(() => {
    const FetchPokemon = async () => {
      const response = await PokemonService.getAll();
      setPokemon(response.results);
    }
    FetchPokemon();
  }, [])
  
  return (
    <div>
      {pokemons.map((pokemon: any) => (
        <div key={pokemon.id}>{pokemon.name}</div>
      ))}
    </div>
  );
}
