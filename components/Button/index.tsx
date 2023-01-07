import { twMerge } from "tailwind-merge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export interface IButton {
  size?: "large" | "small" | "extraLarge";
  disabled?: boolean;
  loading?: boolean;
  children?: any;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  size = "large",
  children,
  className,
  disabled = false,
  loading = false,
  onClick,
}: IButton) => {
  return (
    <button
      className={twMerge(
        "flex h-10 items-center rounded-sm bg-primary600 px-4 font-avara text-sm font-black text-white",
        "tablet:h-12 tablet:px-5 tablet:text-base",
        size === "small" && "tablet:h-9 tablet:text-sm",
        size === "extraLarge" && "tablet:h-[52px] tablet:text-base",
        (disabled || loading) && "cursor-not-allowed opacity-30",
        className
      )}
      onClick={!disabled && !loading ? onClick : undefined}
    >
      {loading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          className={twMerge(
            "text-2xl text-white",
            size === "small" && "text-base"
          )}
          spin
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
