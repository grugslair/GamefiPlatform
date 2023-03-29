import moment from "moment";

const IGOComingSoon = ({startTime = ""}) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center bg-[#0b0b0be6] px-20 text-center">
      <div className="font-avara text-xl font-extrabold text-white">
        Coming Soon
      </div>
      <div className="mt-2 font-sora text-base font-light text-gray300">
        The Project will start receiving registration at {moment(startTime).format("DD MMM'YY hh:mm")}
      </div>
    </div>
  );
};

export default IGOComingSoon;
