"use client";

import { useEffect, useRef } from "react";
import "./Card.css";
import { Pokemon } from "@/modules/types/Pokemon";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/16/solid";
interface HoloCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
  showTrashIcon: boolean
  onDelete?: (pokemon: Pokemon) => void
}

const HoloCard: React.FC<HoloCardProps> = ({ pokemon, onClick, showTrashIcon, onDelete }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect>(null);
  const isHovering = useRef(false);


  useEffect(() => {
    const $card = cardRef.current;
    if (!$card) return;

    const rotateToMouse = (e: MouseEvent) => {
      if (!bounds.current) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.current.x;
      const topY = mouseY - bounds.current.y;
      const center = {
        x: leftX - bounds.current.width / 2,
        y: topY - bounds.current.height / 2
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      $card.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 2}deg
        )
      `;

      const glow = $card.querySelector('.glow') as HTMLElement;
      glow.style.backgroundImage = `
        radial-gradient(
          circle at
          ${center.x * 2 + bounds.current.width / 2}px
          ${center.y * 2 + bounds.current.height / 2}px,
          #ffffff55,
          #0000000f
        )
      `;
    };

    const handleMouseEnter = () => {
      bounds.current = $card.getBoundingClientRect();
      isHovering.current = true;
      document.addEventListener("mousemove", rotateToMouse);
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      document.removeEventListener("mousemove", rotateToMouse);
      $card.style.transform = '';
      ($card.querySelector('.glow') as HTMLElement).style.backgroundImage = '';
    };

    $card.addEventListener('mouseenter', handleMouseEnter);
    $card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      $card.removeEventListener('mouseenter', handleMouseEnter);
      $card.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener("mousemove", rotateToMouse);
    };
  }, []);

  return (
    <div className="card-container" onClick={() => onClick?.(pokemon)}>
      <div className="card" ref={cardRef}>
        <div className="card-content">
          {showTrashIcon &&
            <button title="Eliminar Pokemon" onClick={() => onDelete?.(pokemon)} className="text-red-500 hover:text-red-700 transition-all cursor-pointer absolute top-2 right-2">
              <TrashIcon className="h-5 w-5" />
            </button>
          }
          <div className="p-2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{pokemon.nombre}</h2>
              <span className="text-lg">HP {pokemon.estadisticas.hp}</span>
            </div>
            <div className="mt-2">
              <Image
                src={pokemon.sprite}
                alt={pokemon.nombre}
                width={128}
                height={128}
                className="mx-auto"
              />
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <p className="text-sm"><strong>Tipos:</strong> {pokemon.tipos.join(", ")}</p>
              <div className="flex justify-between flex-row">
                <p className="text-sm"><strong>Ataque:</strong> {pokemon.estadisticas.ataque}</p>
                <p className="text-sm"><strong>Nivel:</strong> {pokemon.nivel}</p>
              </div>
              <div className="flex justify-between flex-row">
                <p className="text-sm"><strong>Defensa:</strong> {pokemon.estadisticas.defensa}</p>
                <p className="text-sm"><strong>Velocidad:</strong> {pokemon.estadisticas.velocidad}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="glow" />
      </div>
    </div>
  );
};

export default HoloCard;