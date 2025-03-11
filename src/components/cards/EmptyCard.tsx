import { PlusIcon } from "@heroicons/react/16/solid";

function EmptyCard({onClick}: {onClick: () => void}) {
    return (
        <div onClick={onClick} className="w-[15.625rem] h-[21.875rem] bg-[var(--background)] border-dotted border-2 border-[var(--foreground)] flex items-center justify-center rounded-2xl cursor-pointer hover:bg-[var(--background2)] transition-all">
            <PlusIcon className="w-8 h-8"></PlusIcon>
        </div>
    );
}

export default EmptyCard;