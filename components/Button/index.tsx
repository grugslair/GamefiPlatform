import { twMerge } from "tailwind-merge";

const Button = ({ children, className, onClick }: any) => {
  return (
    <button
      className={twMerge(
        "h-10 rounded-sm bg-primary600 px-4 font-avara text-sm font-black text-white flex items-center",
        "tablet:h-12 tablet:px-5 tablet:text-base",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
