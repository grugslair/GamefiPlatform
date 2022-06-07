
const NotVerifiedGrug = () => {
  return(
    <>
      <div className="NotVerifiedGrug text-center">
        <div>
          Grug Image
        </div>
        <h1 className="font-bold my-2">You're not a verified Grug</h1>
        <p>You must own Grug's NFT to access this page.</p>
        <p>After getting one, try reconnect wallet/refresh this page</p>
        <button className="mt-5 px-4 py-2 bg-[#6558F5] rounded-md font-bold text-white">Buy Grug's</button>
      </div>

    </>
  )
}

export default NotVerifiedGrug