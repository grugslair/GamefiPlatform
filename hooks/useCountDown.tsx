import React, { useEffect, useState } from 'react'

const useCountDown = () => {
  const [countDown, setCountDown] = useState()

  const [endDate, setEndDate] = useState()

  useEffect(() => {
    

  }, [countDown])

  function initialEndDate(date) {
    

  }

  const calculateTheTime = (countDown:number) => {
    // calculate time left
    console.log(countDown)
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  
    return [days, hours, minutes, seconds];
  };

  return
}

export default useCountDown