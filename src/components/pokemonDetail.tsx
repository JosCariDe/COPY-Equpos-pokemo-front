"use client";

import { Result } from "@/modules/interfaces/pokemon";
import { PokemonService } from "@/modules/services/PokemonService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Card from "./Card";

interface PokemonInfoProps {
  pokemon: Result;
  onClose: () => void;
}

const PokemonInfo = ({ pokemon, onClose }: PokemonInfoProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", pokemon.name],
    queryFn: () => PokemonService.getSpecifict(pokemon.url),
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (isLoading) return <div className="text-white">Cargando...</div>;
  if (error)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;

  const sprites = data?.sprites;
  const abilities =
    data?.abilities?.map(
      (a: { ability: { name: string } }) => a.ability.name
    ) || [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-300 relative max-h-[90vh] overflow-auto"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-50"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          {data?.name ?? pokemon.name}
        </h2>

        <div className="space-y-2 flex justify-center">
          <Card
            name={pokemon.name}
            img={sprites?.other?.dream_world?.front_default}
            abilities={abilities}
            imgClassName="w-50 h-50 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
