import { stakeContractABI, stakeContractAddress } from "@/helper/contract"
import { ethToWei } from "@/helper/utilities"
import { useEffect, useState } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"

export const useStakeHook = () => {
  const [stakeAmount, setStakeAmount] = useState<string>("")

  const { config: stakeConfig } = usePrepareContractWrite({
    address: stakeContractAddress,
    abi: stakeContractABI,
    functionName: 'lockToken',
    args: [ethToWei(stakeAmount?.toString() || '0')],
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
  }
}

export const useUnStakeHook = () => {
  const [unStakeAmount, setUnStakeAmount] = useState<string>("")

  const { config: unStakeConfig } = usePrepareContractWrite({
    address: stakeContractAddress,
    abi: stakeContractABI,
    functionName: 'withdrawUnlockedToken',
    args: [ethToWei(unStakeAmount?.toString() || "0")],
    enabled: !!unStakeAmount
  })

  const { data: dataUnStaking, write: writeUnStaking } = useContractWrite(unStakeConfig)
 
  const { isLoading: loadingUnStaking, isSuccess: successUnStaking, isError: unStakingError } = useWaitForTransaction({
    hash: dataUnStaking?.hash,
  })

  return {
    writeUnStaking,
    loadingUnStaking,
    successUnStaking,
    unStakingError,
    unStakeAmount,
    setUnStakeAmount
  }
}
