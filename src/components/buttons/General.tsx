interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
    const defaultClass="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer transition-all hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed";
    return (
        <button
            className={className ? `${className} cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed` : defaultClass}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
