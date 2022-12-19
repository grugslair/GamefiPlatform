import { getReturnValues } from "helper/utilities";
import { useEffect, useState } from "react";

const useCountDown = () => {
  const [countDown, setCountDown] = useState<number[]>();

  const [endDate, setEndDate] = useState(0);

  function handleSetEndDate(endDate: number) {
    setEndDate(endDate);
    setCountDown(getCountDownValues(endDate));
  }

  function getCountDownValues(date: number) {
    return getReturnValues(date - new Date().getTime());
  }

  useEffect(() => {
    if (new Date().getTime() < endDate) {
      setTimeout(() => {
        setCountDown(getCountDownValues(endDate));
      }, 1000);
    } else {
      setCountDown(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  return {
    countDown,
    handleSetEndDate,
  };
};

export default useCountDown;
