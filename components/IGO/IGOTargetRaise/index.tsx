const IGOTargetRaise = () => {
  return (
    <>
      <div className="border p-4">
        <div className="mb-4">
          <span className="bg-red-600 text-white rounded-full font-bold px-3 py-1 text-xs">Ends in 1d : 7h : 30m : 10s</span>
        </div>
        <div>
          <div>
            Target Raise
          </div>
          <div className="text-xl font-bold">
            $190.000
          </div>
          <div>
            Progress
          </div>
          <div className="grid grid-cols-2 mb-5">
            <div>
              Progress: 0%
            </div>
            <div>
              0/150.000 CHIBI
            </div>
          </div>
          <div className="p-3 border">
            Requirement Meet 2/4
          </div>
        </div>
      </div>
    </>
  )
}

export default IGOTargetRaise