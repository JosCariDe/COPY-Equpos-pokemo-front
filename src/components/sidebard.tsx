
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-6 transform mt-16  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-xl font-bold mb-4">Menú</h2>
        <ul className="space-y-4">
          <li className="hover:text-gray-400 cursor-pointer">Inicio</li>
          <li className="hover:text-gray-400 cursor-pointer">Pokémon</li>
          <li className="hover:text-gray-400 cursor-pointer">Buscar</li>
          <li className="hover:text-gray-400 cursor-pointer">Ajustes</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
