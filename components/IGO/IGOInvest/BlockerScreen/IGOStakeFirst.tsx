import dynamic from "next/dynamic";

const ModalStakeAmountButton = dynamic(
  () => import("../../../Public/ModalStakeAmountButton"),
  { ssr: false }
);

const IGOStakeFirst = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center bg-[#0b0b0be6] px-20 text-center">
      <div className="font-avara text-xl font-extrabold text-white">
        Registration Locked
      </div>
      <div className="mt-2 font-sora text-base font-light text-gray300">
        Staked min. 3.000 ROCKS to unlock. Staked token will be lock until 7
        days after IGO ended
      </div>
      <ModalStakeAmountButton
        actionTitle={"Stake ROCKS"}
        buttonProps={{
          size: "small",
          className: "mt-6 self-center",
        }}
      />
    </div>
  );
};

export default IGOStakeFirst;
