'use client'

import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  MenuOptions: { label: string; path: string }[];
}

const Sidebar = ({ isOpen, MenuOptions }: SidebarProps) => {
  const router = useRouter();

  return (
    <div className="relative">
      <div
        className={`fixed z-10 top-[4rem] left-0 h-full bg-gray-900 text-white w-64 p-6! transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-xl font-bold mb-4!">Menú</h2>
        <ul className="space-y-4">
          {MenuOptions.map(
            (item: { label: string; path: string }, index: number) => (
              <li
                onClick={() => router.push(item.path)}
                key={index}
                className="hover:text-gray-400! cursor-pointer p-2!"
              >
                {item.label}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
