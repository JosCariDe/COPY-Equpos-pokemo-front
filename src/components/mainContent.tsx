"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Sidebar from "./sidebard";

export default function Layout({ children = {} }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />{" "}
      {/* ✅ Se pasa correctamente */}
      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <h1 className="text-xl font-bold">PokeApp</h1>
        </div>

        {/* Page Content */}
        <div className="p-4 mt-16 overflow-auto h-full">{children}</div>
      </div>
    </div>
  );
}
