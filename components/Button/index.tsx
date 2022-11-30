import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Button = ({ size, children, className, onClick }: any) => {
  return (
    <button
      className={twMerge(
        "flex h-10 items-center rounded-sm bg-primary600 px-4 font-avara text-sm font-black text-white",
        "tablet:h-12 tablet:px-5 tablet:text-base",
        size === "small" && "tablet:h-9 tablet:text-sm",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: "large",
  onClick: () => null,
};

Button.propTypes = {
  size: PropTypes.oneOf(["large", "small"]),
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
