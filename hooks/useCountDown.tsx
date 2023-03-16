import { getReturnValues } from "helper/utilities";
import { useEffect, useRef, useState } from "react";

const useCountDown = () => {
  const countDownRef = useRef<any>();
  const [countDown, setCountDown] = useState<any>(-1);

  const [endDate, setEndDate] = useState(-1);

  function handleSetEndDate(endDate: number) {
    setEndDate(endDate);
  }

  function getCountDownValues(date: number) {
    return getReturnValues(date - new Date().getTime());
  }

  useEffect(() => {
    if (endDate !== -1) {
      countDownRef.current = setInterval(() => {
        if (new Date().getTime() + 500 < endDate) {
          setCountDown(getCountDownValues(endDate));
        } else {
          setCountDown(0);
          clearInterval(countDownRef.current);
        }
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate]);

  return {
    countDown,
    handleSetEndDate,
  };
};

export default useCountDown;
