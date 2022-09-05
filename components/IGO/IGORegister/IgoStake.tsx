const IgoStake = () => {
  return (
    <div className="absolute w-full h-full text-center">
      <div className="font-['avara'] mb-2 text-xl">
        Registration Locked
      </div>
      <div className="text-base mb-6">
        Staked min.3000 ROCKS to unlock. Staked token will be lock until 7 days after IGO ended
      </div>
      <button className="font-['avara'] text-sm bg-[#B54639] rounded-sm py-2 px-4">
        Stake ROCKS
      </button>
    </div>
  )
}

export default IgoStake