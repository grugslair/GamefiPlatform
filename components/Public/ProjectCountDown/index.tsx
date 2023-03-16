/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import moment from "moment";

// Hooks
import useCountDown from "hooks/useCountDown";

const ProjectCountDown = ({
  data,
  isProjectDetail = false,
  className = "",
  onPhaseChange = () => null,
}: any) => {
  const { countDown, handleSetEndDate } = useCountDown();

  const isUpcoming = moment().isBefore(moment(data.registrationPeriodStart));
  const isRegistrationPhase = moment().isBetween(
    moment(data.registrationPeriodStart),
    moment(data.registrationPeriodEnd)
  );
  const isBeforeBuyPhase = moment().isBetween(
    moment(data.registrationPeriodEnd),
    moment(data.buyPeriodStart)
  );
  const isBuyPhase = moment().isBetween(
    moment(data.buyPeriodStart),
    moment(data.buyPeriodEnd)
  );
  const isBeforeClaimPhase = moment().isBetween(
    moment(data.buyPeriodEnd),
    moment(data.claimPeriodStart)
  );

  const endedDaysAgo = data?.claimPeriodStart
    ? Math.floor(
        (new Date().getTime() - new Date(data.claimPeriodStart).getTime()) /
          (24 * 60 * 60 * 1000)
      )
    : 0;

  const getPhaseData = () => {
    let targetDate, targetString, targetClass;
    if (isUpcoming) {
      targetDate = data.registrationPeriodStart;
      targetString = "Registration phase starts";
      targetClass = "bg-success600 text-white";
    }
    if (isRegistrationPhase) {
      targetDate = data.registrationPeriodEnd;
      targetString = "Registration phase ends";
      targetClass = "bg-yellow500 text-black";
    }
    if (isBeforeBuyPhase) {
      targetDate = data.buyPeriodStart;
      targetString = "Buying phase starts";
      targetClass = "bg-success600 text-white";
    }
    if (isBuyPhase) {
      targetDate = data.buyPeriodEnd;
      targetString = "Buying phase ends";
      targetClass = "bg-yellow500 text-black";
    }
    if (isBeforeClaimPhase) {
      targetDate = data.claimPeriodStart;
      targetString = "Claim phase starts";
      targetClass = "bg-success600 text-white";
    }
    return { targetDate, targetString, targetClass };
  };

  useEffect(() => {
    if (countDown === 0 || countDown === -1) {
      const { targetDate } = getPhaseData();
      if (targetDate) {
        const endDate = new Date(targetDate);
        handleSetEndDate(endDate.getTime());
        onPhaseChange()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isUpcoming,
    isRegistrationPhase,
    isBeforeBuyPhase,
    isBuyPhase,
    isBeforeClaimPhase,
    countDown,
  ]);

  const { targetString, targetClass } = getPhaseData();

  return (
    <>
      <div
        className={twMerge(
          "w-fit rounded-full px-3 py-1 font-sora text-sm",
          isProjectDetail
            ? "border border-solid border-yellow500 text-yellow500"
            : targetClass,
          !countDown &&
            (isProjectDetail
              ? "border-white text-white"
              : "bg-white text-black"),
          (countDown === -1 || (countDown === 0 && endedDaysAgo < 0)) &&
            "opacity-0",
          className
        )}
      >
        {!!countDown ? (
          <>
            {targetString} in {countDown[0]}d : {countDown[1]}h : {countDown[2]}
            m : {countDown[3]}s
          </>
        ) : (
          <>Ended {endedDaysAgo ? `${endedDaysAgo}d ago` : "today"}</>
        )}
      </div>
    </>
  );
};

export default ProjectCountDown;
