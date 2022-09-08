import { useSelector } from "react-redux"
import { RootState } from "../../../store"

const NotVerifiedGrug = () => {
  const wallet  = useSelector((state: RootState) => state.wallet)

  return(
    <>
      <div className="NotVerifiedGrug p-36 top-0 bg-[url('/Bg.png')] w-full h-full bg-cover">
        <div>
          <div className="mb-5">
            <div className="text-xl font-bold mb-3 font-['avara']">Reveal the projects</div>
            <p className="">Simply own a Grug&apos;s NFT then connect your <br/> wallet to reveal the project list</p>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex">
              <div className="w-10 h-10 rounded-full relative bg-[#FBE7D8]">
                <div className="absolute left-[13px] top-1 text-[#B54639] text-xl font-bold">
                  1
                </div>
              </div>

              <div className="ml-5">
                <h1 className="font-['avara'] text-white">Own a Grug&apos;s NFT</h1>
                <p>You can get the NFT from Opensea</p>
                <button 
                  className="mt-5 px-[14px] py-2 bg-[#B54639] rounded-sm font-bold text-white" 
                  onClick={() => window.location.href = 'https://opensea.io/collection/grugslair'}
                >
                    Buy Grug&apos;s
                </button>
              </div>
            </div>

            <div className="flex">
              <div className="w-10 h-10 rounded-full relative bg-[#FBE7D8]">
                <div className="absolute left-[14px] top-1 text-[#B54639] text-xl font-bold">
                  2
                </div>
              </div>

              <div className="ml-5">
                {wallet.walletAddress ? (
                  <>
                    <h1 className="font-['avara'] text-white">Wallet Connected</h1>
                    <p>You successfully connect Metamask</p>
                  </>
                ) : (
                  <>
                    <h1 className="font-['avara'] text-white">Connect Wallet</h1>
                    <p>Connect your Metamask / TrustWallet</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotVerifiedGrug