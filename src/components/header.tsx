import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <div className="bg-gray-800 text-white p-4! flex justify-between items-center z-10 h-16 ">
      <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2! flex">
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>
      <h1 className="text-xl font-bold flex">PokeApp</h1>
    </div>
  );
};

export default Header;
