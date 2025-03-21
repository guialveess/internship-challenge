import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  type = "button",
  icon,
  children,
  className = "",
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`w-full px-4 py-3 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2 mt-6 ${className}`}
      >
        {icon && icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type} // controlando tipos do botao do html
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2 mt-6 ${className}`}
    >
      {children}
      {icon && icon}
    </button>
  );
};

export default Button;
