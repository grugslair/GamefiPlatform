import { useSelector } from "react-redux"
import { RootState } from "../../../store"

const NotVerifiedGrug = () => {
  const wallet  = useSelector((state: RootState) => state.wallet)

  return(
    <>
      <div className="NotVerifiedGrug p-36">
        <div className="mb-5">
          <div className="text-xl font-bold mb-3">Reveal the projects</div>
          <p className="">Simply own a Grug&apos;s NFT then connect your <br/> wallet to reveal the project list</p>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex">
            <div className="w-11 h-11 rounded-full border-[#C3CFD9] border relative">
              <div className="absolute left-4 top-2">
                1
              </div>
            </div>

            <div className="ml-5">
              <h1>Own a Grug&apos;s NFT</h1>
              <p>You can get the NFT from Opensea</p>
              <button 
                className="mt-5 px-4 py-2 bg-[#6558F5] rounded-md font-bold text-white" 
                onClick={() => window.location.href = 'https://opensea.io/collection/grugslair'}
              >
                  Buy Grug&apos;s
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="w-11 h-11 rounded-full border-[#C3CFD9] border relative">
              <div className="absolute left-4 top-2">
                2
              </div>
            </div>

            <div className="ml-5">
              {wallet.walletAddress ? (
                <>
                  <h1>Wallet Connected</h1>
                  <p>You successfully connect Metamask</p>
                </>
              ) : (
                <>
                  <h1>Connect Wallet</h1>
                  <p>Connect your Metamask / TrustWallet</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotVerifiedGrug