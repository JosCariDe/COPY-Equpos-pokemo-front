"use client";

import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebard";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const MenuOptions = [
    { label: "Inicio", path: "/home" },
    // { label: "Pokémon", path: "/pokemons" },
    { label: "Entrenadores", path: "/coaches" },
  ];
  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        MenuOptions={MenuOptions}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          !isOpen && "ml-0!"
        }`}
      >
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Page Content */}
        <main className="p-4! overflow-auto h-[calc(100vh-4rem)] w-full">{children}</main>
      </div>
    </div>
  );
}
