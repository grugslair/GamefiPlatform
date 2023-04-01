import { stakeContractABI, stakeContractAddress } from "@/helper/contract"
import { useEffect, useState } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"

const useStakeHook = () => {
  const [stakeAmount, setStakeAmount] = useState<string>("")
  const [unStakeAmount, setUnStakeAmount] = useState<string>("")

  const { config: stakeConfig } = usePrepareContractWrite({
    address: stakeContractAddress,
    abi: stakeContractABI,
    functionName: 'lockToken',
    args: [stakeAmount],
    enabled: !!stakeAmount
  })

  const { data: dataStaking, write: writeStaking } = useContractWrite(stakeConfig)
 
  const { isLoading: loadingStaking, isSuccess: successStaking, isError: stakingError } = useWaitForTransaction({
    hash: dataStaking?.hash,
  })


  return {
    writeStaking,
    loadingStaking,
    successStaking,
    stakingError,
    stakeAmount,
    setStakeAmount,
    unStakeAmount,
    setUnStakeAmount
  }
}

// const useStakeHook = (stakeAmount: string) => {
//   const { config: stakeConfig } = usePrepareContractWrite({
//     address: stakeContractAddress,
//     abi: stakeContractABI,
//     functionName: 'lockToken',
//     args: [stakeAmount],
//     enabled: !!stakeAmount
//   })

//   return stakeConfig
// }

// const useUnstakeToken = (unStakeAmount: string) => {

// }

export default useStakeHook