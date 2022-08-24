const ProjectTarget = (props) => {
  return (
    <div>
      <div className="font-bold text-xs text-gray-500">
        Target Raise
      </div>
      <div className="font-bold text-gray-700">
        {props.targetRaise}
      </div>
      <div className="mb-4">
        <progress className="progress progress-success w-full" value="50" max="100"></progress>
        <div className="relative h-5">
          <div className="absolute left-0">
            test
          </div>
          <div className="absolute right-0">
            test
          </div>

        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">Rate</div>
          <div className="text-right font-bold text-gray-800">{props.rate}</div>
        </div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">End Date (GMT+7)</div>
          <div className="text-right font-bold text-gray-800">{props.endDate}</div>
        </div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">Min ROCKS</div>
          <div className="text-right font-bold text-gray-800">{props.minRocks}</div>
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