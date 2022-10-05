import { twMerge } from "tailwind-merge";

const Button = ({ children, className, onClick }: any) => {
  return (
    <button
      className={twMerge(
        "h-10 rounded-sm bg-primary600 px-4 py-[10px] font-avara text-sm font-black text-white",
        "tablet:h-12 tablet:px-5 tablet:py-3 tablet:text-base",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
