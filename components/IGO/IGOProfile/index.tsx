const IGOProfile = () => {
  return (
    <>
      <div className="border p-4">
        <div className="grid grid-cols-2 mb-4">
          <div className="text-left">
            <button>
              Back
            </button>
          </div>
          <div className="text-right">
            <button className="px-4 py-1 border">
              Add to Metamask
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 grid-flow-col">
          <div className="w-12 h-12 col-span-1">
            image
          </div>
          <div className="col-span-4">
            <div className="font-bold text-xl">Chibi Dino</div>
            <div className="font-semibold text-gray-400 mb-5">$CHIBI - ETH</div>
            <div className="truncate mb-5">
              Chibi Dinos is an ever expanding ecosystem spanning the Metaverse and Play to Earn Game
            </div>
            <div>
              <ul className="flex">
                <li>sosmed</li>
                <li>sosmed</li>
                <li>sosmed</li>
                <li>sosmed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IGOProfile