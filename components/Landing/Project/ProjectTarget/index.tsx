const ProjectTarget = () => {
  return (
    <div>
      <div className="font-bold text-xs text-gray-500">
        Target Raise
      </div>
      <div className="font-bold text-gray-700">
        $190.000
      </div>
      <div className="mb-4">
        Progress bar
      </div>
      <div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">Rate</div>
          <div className="text-right font-bold text-gray-800">1 USDT = 1.000 CHIBI</div>
        </div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">End Date (GMT+7)</div>
          <div className="text-right font-bold text-gray-800">6 March&apos;22 - 07:00</div>
        </div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">Min ROCKS</div>
          <div className="text-right font-bold text-gray-800">300 ROCKS</div>
        </div>
        <div className="grid grid-cols-2 text-xs pb-12 pt-3">
          <div className="text-left font-bold text-gray-500">Vesting</div>
          <div className="text-right font-bold text-gray-800">10% on TGE and after 10% monthly from the second month</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectTarget