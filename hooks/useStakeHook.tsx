import { stakeContractABI, stakeContractAddress } from "@/helper/contract"
import { usePrepareContractWrite } from "wagmi"

const useStakeHook = (stakeAmount: string) => {
  const { config: stakeConfig } = usePrepareContractWrite({
    address: stakeContractAddress,
    abi: stakeContractABI,
    functionName: 'lockToken',
    args: [stakeAmount],
    enabled: !!stakeAmount
  })

  return stakeConfig
}

const useUnstakeToken = (unStakeAmount: string) => {

}

export default useStakeHook