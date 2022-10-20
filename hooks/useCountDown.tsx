import React, { useEffect, useState } from 'react'

const useCountDown = () => {
  const [countDown, setCountDown] = useState(0)

  const [endDate, setEndDate] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if(countDown < endDate) {
        setCountDown(countDown - new Date().getTime())
      }
    }, 1000)
    

  }, [countDown])

  return {
    countDown
  }

}

export default useCountDown