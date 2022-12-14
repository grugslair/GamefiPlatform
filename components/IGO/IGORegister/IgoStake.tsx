import dynamic from "next/dynamic"

const ModalStakeAmountButton = dynamic(() => import('../../Public/ModalStakeAmountButton'), {ssr: false})

const IgoStake = () => {
  return (
    <div className="px-20 absolute top-0 left-0 right-0 bottom-0 text-center bg-[#0b0b0be6] flex flex-col justify-center">
      <div className="font-['avara'] mb-2 text-xl">
        Registration Locked
      </div>
      <div className="text-base mb-6">
        Staked min.3000 ROCKS to unlock. Staked token will be lock until 7 days after IGO ended
      </div>
      <div>
        <ModalStakeAmountButton 
          actionTitle={'Stake ROCKS'} 
          buttonProps={{
          size: "small",
          className:
            "m-auto",
          disabled: false,
        }}/>
      </div>
    </div>
  )
}

export default IgoStake