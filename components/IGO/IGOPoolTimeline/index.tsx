import { Timeline } from "antd";
import { twJoin } from "tailwind-merge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";

import { grugDateFormat, numberWithCommas } from "helper/utilities";

interface IIGOPoolTimeline {
  data: IIGOPoolTimelineData[];
  currentIndex: number;
}

interface IIGOPoolTimelineData {
  title: string;
  date: string;
}

const PoolTimeline = ({ data, currentIndex }: IIGOPoolTimeline) => (
  <Timeline className="ml-2 -mb-8 pt-2">
    {data.map((entry, i) => {
      const isCurrent = i === currentIndex;
      const isInactive = i > currentIndex;
      return (
        <Timeline.Item
          key={i}
          dot={
            <div
              className={twJoin(
                "flex h-6 w-6 items-center justify-center rounded-full",
                isCurrent
                  ? "bg-primary600"
                  : isInactive
                  ? "bg-gray-500"
                  : "bg-success600"
              )}
            >
              <FontAwesomeIcon
                icon={!isCurrent && !isInactive ? faCheck : faCircle}
                className={twJoin(
                  isInactive ? "text-gray400" : "text-white",
                  !isCurrent && !isInactive ? "text-xs" : "text-[8px]"
                )}
              />
            </div>
          }
        >
          <div
            className={twJoin(
              "font-avara text-sm font-extrabold",
              isInactive ? "text-gray500" : "text-white"
            )}
          >
            {entry.title}
          </div>
          <div
            className={twJoin(
              "mb-1 font-sora text-sm font-light",
              isInactive ? "text-gray600" : "text-gray400"
            )}
          >
            {entry.date}
          </div>
        </Timeline.Item>
      );
    })}
  </Timeline>
);

const IGOPoolTimeline = ({ data }: any) => {
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
      value: "Polygon",
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
      value: `${grugDateFormat(data.periodStart)}`,
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
              date: "20 May'22 11:00 - 20 May'22 16:00",
            },
            {
              title: "Buying Phase",
              date: "20 May'22 11:00 - 20 May'22 16:00",
            },
            {
              title: "Claim Start (10% TGE)",
              date: "20 May'22 11:00 - 20 May'22 16:00",
            },
          ]}
          currentIndex={1}
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

export default IGOPoolTimeline;
