'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  MenuOptions: { label: string; path: string }[];
}

const Sidebar = ({ isOpen, setIsOpen, MenuOptions }: SidebarProps) => {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative">
      <div
        ref={sidebarRef}
        className={`fixed z-10 top-[4rem] left-0 h-full bg-gray-900 text-white w-64 p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-xl font-bold mb-4">Menú</h2>
        <ul className="space-y-4">
          {MenuOptions.map((item, index) => (
            <li
              onClick={() => {
                router.push(item.path);
                setIsOpen(false); 
              }}
              key={index}
              className="hover:text-gray-400 cursor-pointer p-2"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
