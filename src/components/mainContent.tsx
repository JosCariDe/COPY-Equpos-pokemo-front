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
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        MenuOptions={MenuOptions}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Page Content */}
        <div className="p-4 mt-16 overflow-auto h-full">{children}</div>
      </div>
    </div>
  );
}
