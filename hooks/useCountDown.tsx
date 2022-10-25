import { getReturnValues } from 'helper/utilities'
import React, { useEffect, useState } from 'react'

const useCountDown = () => {
  const [countDown, setCountDown] = useState<number[]>()

  const [endDate, setEndDate] = useState(0)

  function handleSetEndDate(endDate: number) {
    console.log(endDate)
    setEndDate(endDate)
  }

  useEffect(() => {
    if(new Date().getTime() < endDate) {
      setTimeout(() => {
          setCountDown(getReturnValues(endDate - new Date().getTime()))
      }, 1000)
    } else {
      setCountDown(undefined)
    }

  }, [countDown])

  return {
    countDown,
    handleSetEndDate
  }

}

export default useCountDown