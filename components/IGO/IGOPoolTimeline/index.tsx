import { Timeline } from "antd";
import { twJoin } from "tailwind-merge";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";

import { IProjectList } from "store/launchpad/launchpad";

import { numberWithCommas } from "helper/utilities";

interface IIGOTokenDetails {
  data: IProjectList;
}

interface IIGOPoolTimeline {
  data: IIGOPoolTimelineData[];
}

interface IIGOPoolTimelineData {
  title: string;
  startTime: string;
  endTime?: string;
}

const PoolTimeline = ({ data }: IIGOPoolTimeline) => (
  <Timeline className="ml-2 -mb-8 pt-2">
    {data.map((entry, i) => {
      const now = moment();
      const isStarted = now.isAfter(moment(entry.startTime));
      const isEnded = entry.endTime
        ? now.isAfter(moment(entry.endTime))
        : isStarted;
      const isOngoing = isStarted && !isEnded;
      return (
        <Timeline.Item
          key={i}
          dot={
            <div
              className={twJoin(
                "flex h-6 w-6 items-center justify-center rounded-full",
                isOngoing
                  ? "bg-primary600"
                  : !isEnded
                  ? "bg-gray-500"
                  : "bg-success600"
              )}
            >
              <FontAwesomeIcon
                icon={isEnded ? faCheck : faCircle}
                className={twJoin(
                  isStarted ? "text-white" : "text-gray400",
                  isEnded ? "text-xs" : "text-[8px]"
                )}
              />
            </div>
          }
        >
          <div
            className={twJoin(
              "font-avara text-sm font-extrabold",
              isStarted ? "text-white" : "text-gray500"
            )}
          >
            {entry.title}
          </div>
          <div
            className={twJoin(
              "mb-1 font-sora text-sm font-light",
              isStarted ? "text-gray400" : "text-gray600"
            )}
          >
            {moment(entry.startTime).format("DD MMM'YY hh:mm")}
            {!!entry.endTime &&
              ` - ${moment(entry.endTime).format("DD MMM'YY hh:mm")}`}
          </div>
        </Timeline.Item>
      );
    })}
  </Timeline>
);

const IGOTokenDetails = ({ data }: IIGOTokenDetails) => {
  const tokenData = [
    {
      text: "Symbol",
      value: `$${data.tokenSymbol}`,
    },
    {
      text: "Token Price",
      value: `${data.publicSalePrice} $${data.Currency.symbol}`,
    },
    {
      text: "Token Network",
      value: data.Chain?.name,
    },
    {
      text: "Initial Supply",
      value: `${numberWithCommas(data.tokenInitialSupply)} $${
        data.tokenSymbol
      }`,
    },
    {
      text: "Total Supply",
      value: `${numberWithCommas(data.tokenTotalSupply)} $${data.tokenSymbol}`,
    },
    {
      text: "Initial Market Cap",
      value: `$${numberWithCommas(data.targetAmount)}`,
    },
    {
      text: "Listing Date",
      value: `${moment(data.periodStart).format("DD MMM'YY")}`,
    },
    {
      text: "Contract Address",
      value: `${data.tokenContractAddress.slice(0, 15)}`,
    },
  ];

  return (
    <>
      {/* divide-y divide-solid divide-grayCool25 divide-opacity-10 */}
      <div className="mt-4 border border-solid border-grugBorder bg-grugCardBackground p-6">
        <div className="mb-6 font-avara text-xl font-extrabold text-primary500">
          Pool Timeline
        </div>
        <PoolTimeline
          data={[
            {
              title: "Registration Phase",
              startTime: data.periodStart,
              endTime: data.periodEnd,
            },
            {
              title: "Buying Phase",
              startTime: data.periodStart,
              endTime: data.periodEnd,
            },
            {
              title: `Claim Start (${data.VestingRule?.tgePercentage}% TGE)`,
              startTime: data.periodStart,
            },
          ]}
        />

        <div className="my-6 h-px bg-grayCool25 opacity-10" />

        <div className="mb-6 font-avara text-xl font-extrabold text-primary500">
          Token Info
        </div>
        <div className="flex flex-col gap-4">
          {tokenData.map((item, i) => (
            <div key={i} className="flex">
              <div className="w-44 font-sora text-base font-light text-gray300">
                <div key={item.text}>{item.text}</div>
              </div>
              <div
                className="flex-1 font-avara text-base font-bold text-white"
                key={item.value}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IGOTokenDetails;
