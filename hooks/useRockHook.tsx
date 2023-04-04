import { rocksContractABI, rocksContractAddress, stakeContractABI, stakeContractAddress } from "@/helper/contract"
import { ethToWei } from "@/helper/utilities"
import { useState } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"

const useRockHook = () => {
  const [approveAmount, setApproveAmount] = useState<string>("")

  const { config: approveConfig } = usePrepareContractWrite({
    address: rocksContractAddress,
    abi: rocksContractABI,
    functionName: 'approve',
    args: [stakeContractAddress, ethToWei(approveAmount?.toString() || "0")],
    enabled: !!approveAmount
  })

  const { data: dataApprove, write: writeApprove } = useContractWrite(approveConfig)
 
  const { isLoading: loadingApprove, isSuccess: successApprove, isError: approveError } = useWaitForTransaction({
    hash: dataApprove?.hash,
  })


  return {
    writeApprove,
    loadingApprove,
    successApprove,
    approveError,
    approveAmount,
    setApproveAmount,
  }
}

export default useRockHook
