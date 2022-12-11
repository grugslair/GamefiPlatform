import { Timeline } from "antd";
import { twJoin } from "tailwind-merge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";

import Button from "@/components/Button";

interface IVestingTimeline {
  data: IGOPoolTimelineData[];
}

interface IGOPoolTimelineData {
  title: string;
  date: string;
  percentage: string;
  status: string;
}

const VestingTimeline = ({ data }: IVestingTimeline) => (
  <>
    <div className="mb-6 flex font-sora text-sm text-gray400">
      <div className="flex-1">Date & Amount</div>
      <div className="mr-20 w-14 text-center">%</div>
      <div className="w-24">Status</div>
    </div>
    <Timeline className="ml-2 -mb-8 pt-2">
      {data.map((entry, i) => {
        const isUnlocked = entry.status !== "unclaimable";
        return (
          <Timeline.Item
            key={i}
            dot={
              <div
                className={twJoin(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  isUnlocked ? "bg-primary600" : "bg-gray-500"
                )}
              >
                <FontAwesomeIcon
                  icon={faCircle}
                  className={twJoin(
                    "text-[8px]",
                    isUnlocked ? "text-white" : "text-gray400"
                  )}
                />
              </div>
            }
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div
                  className={twJoin(
                    "font-avara text-sm font-extrabold",
                    isUnlocked ? "text-white" : "text-gray500"
                  )}
                >
                  {entry.title}
                </div>
                <div
                  className={twJoin(
                    "mb-1 font-sora text-sm font-light",
                    isUnlocked ? "text-gray400" : "text-gray600"
                  )}
                >
                  {entry.date}
                </div>
              </div>
              <div className="mr-20 mt-[2px] w-14 text-center font-avara text-sm font-extrabold text-white">
                {entry.percentage}
              </div>
              <div
                className={twJoin(
                  "flex w-24 items-center justify-center rounded-full py-[2px] font-sora text-xs capitalize",
                  entry.status === "claimed"
                    ? "bg-success50 text-success700"
                    : entry.status === "claimable"
                    ? "bg-primary50 text-primary700"
                    : "bg-gray-100 text-gray700 opacity-50"
                )}
              >
                {entry.status === "claimed" ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="mr-[5px] text-[10px]"
                  />
                ) : entry.status === "claimable" ? (
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="mr-[7px] text-[6px]"
                  />
                ) : null}
                {entry.status}
              </div>
            </div>
          </Timeline.Item>
        );
      })}
    </Timeline>
  </>
);

const IGOClaimStatus = ({ data }: any) => {
  return (
    <div className="mt-4 border border-solid border-grugBorder bg-grugCardBackground p-6">
      <div className="mb-6 font-avara text-xl font-extrabold text-primary500">
        Vesting
      </div>

      <div className="flex items-center">
        <div className="flex-1">
          <div className="ont-sora text-sm text-gray300">Total Claimed</div>
          <div className="mt-2 font-avara text-3xl font-extrabold text-white">
            0/0 CHIBI
          </div>
        </div>
        <Button className="tablet:h-11">Claim All</Button>
      </div>
      <div className="my-6 border border-solid border-yellow500 bg-grugAltCardBackground10 p-4 text-center font-sora text-sm text-yellow500">
        Vesting: 10% at TGE, then 15% per month
      </div>
      <VestingTimeline
        data={[
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "claimed",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "claimable",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "unclaimable",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "unclaimable",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "unclaimable",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "unclaimable",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "unclaimable",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "unclaimable",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "unclaimable",
          },
          {
            title: "125 ZZZ",
            date: "20 Jun'22 - 11:00PM (GMT+7)",
            percentage: "20%",
            status: "unclaimable",
          },
        ]}
      />
      {/* <div className="mt-5">
        <div className="grid grid-cols-3">
          <div>
            <div className="mb-6">Date & Amount</div>
            <Timeline>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="font-['avara'] text-[#667085]">0 ZZZ</div>
                <div className="text-sm text-[#475467]">
                  20 Jun’22 - 11:00PM (GMT+7)
                </div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="font-['avara'] text-[#667085]">0 ZZZ</div>
                <div className="text-sm text-[#475467]">
                  20 Jun’22 - 11:00PM (GMT+7)
                </div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="font-['avara'] text-[#667085]">0 ZZZ</div>
                <div className="text-sm text-[#475467]">
                  20 Jun’22 - 11:00PM (GMT+7)
                </div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="font-['avara'] text-[#667085]">0 ZZZ</div>
                <div className="text-sm text-[#475467]">
                  20 Jun’22 - 11:00PM (GMT+7)
                </div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="font-['avara'] text-[#667085]">0 ZZZ</div>
                <div className="text-sm text-[#475467]">
                  20 Jun’22 - 11:00PM (GMT+7)
                </div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="font-['avara'] text-[#667085]">0 ZZZ</div>
                <div className="text-sm text-[#475467]">
                  20 Jun’22 - 11:00PM (GMT+7)
                </div>
              </Timeline.Item>
            </Timeline>
          </div>
          <div className="text-center">
            <div className="mb-6">%</div>
            <div className="mb-11 font-['avara']">20%</div>
            <div className="mb-11 font-['avara']">20%</div>
            <div className="mb-11 font-['avara']">20%</div>
            <div className="mb-11 font-['avara']">20%</div>
            <div className="mb-11 font-['avara']">20%</div>
            <div className="mb-11 font-['avara']">20%</div>
          </div>
          <div>
            <div className="mb-6">Status</div>
            <div className=""></div>
          </div>
        </div> */}
      {/* <div>
          <div className="grid grid-cols-3">
            <div>Date & Amount</div>
            <div className="text-center">%</div>
            <div>Status</div>
          </div>
        </div>
        <ul className="steps steps-vertical">
          <li className="step step-primary">
            <div>
              <div className="grid grid-cols-3">
                <div>
                  <div>20 Jun&apos;22 - 11:00</div>
                  <div>0 CHIBI</div>
                </div>
                <div>
                  20%
                </div>
                <div>
                  UnClaimable
                </div>
              </div>
            </div>
          </li>
          <li className="step step-primary">Choose plan</li>
          <li className="step">Purchase</li>
          <li className="step">Receive Product</li>
        </ul> */}
      {/* </div> */}
    </div>
  );
};

export default IGOClaimStatus;
