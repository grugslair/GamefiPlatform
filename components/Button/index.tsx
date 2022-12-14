import { twMerge } from "tailwind-merge";

export interface IButton {
  size?: "large" | "small";
  disabled?: boolean;
  children?: any;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  size = "large",
  children,
  className,
  disabled = false,
  onClick,
}: IButton) => {
  return (
    <button
      className={twMerge(
        "flex h-10 items-center rounded-sm bg-primary600 px-4 font-avara text-sm font-black text-white",
        "tablet:h-12 tablet:px-5 tablet:text-base",
        size === "small" && "tablet:h-9 tablet:text-sm",
        disabled && "cursor-not-allowed opacity-30",
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
