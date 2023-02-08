import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twJoin } from "tailwind-merge";

export interface ICheckboxButton {
  checked: boolean;
  color?: string;
  onClick?: () => void;
}

const CheckboxButton = ({ checked, color, onClick }: ICheckboxButton) => {
  return (
    <div
      className={twJoin(
        "mr-2 flex h-4 w-4 items-center justify-center rounded-[4px] border border-solid text-xs transition duration-300 ",
        checked
          ? color
            ? `bg-[${color}]`
            : "border-success600 bg-success600"
          : "border-gray300"
      )}
      style={checked && color ? { borderColor: color } : {}}
      onClick={onClick}
    >
      {checked && <FontAwesomeIcon icon={faCheck} color="white" />}
    </div>
  );
};

export default CheckboxButton;
