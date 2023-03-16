import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twJoin } from "tailwind-merge";

export interface IRadioButton {
  selected: boolean;
  color?: string;
  onClick?: () => void;
}

const RadioButton = ({ selected, color, onClick }: IRadioButton) => {
  return (
    <div
      className={twJoin(
        "mr-2 flex h-4 w-4 items-center justify-center rounded-full text-xs transition duration-300 ",
        selected ? "bg-white" : "border border-solid border-gray300"
      )}
      // style={selected && color ? { borderColor: color } : {}}
      onClick={onClick}
    >
      {selected && (
        <FontAwesomeIcon
          icon={faDotCircle}
          style={selected && color ? { color } : {}}
          className="h-full w-full text-success600"
        />
      )}
    </div>
  );
};

export default RadioButton;
