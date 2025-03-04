import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
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
  );
};

export default Header;
