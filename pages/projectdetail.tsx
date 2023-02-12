/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IProjectDetail, IProjectDetailData } from "store/launchpad/launchpad";
import { getProjectListById } from "store/launchpad/thunk";

// Global utils
import { useAppDispatch } from "hooks/useStoreHooks";
import { getSocialMedias } from "helper/utilities";

// Global components
import Requirement from "components/Public/Requirement";

// Local components
import IGOPoolTimeline from "components/IGO/IGOPoolTimeline";
import IGOProfile from "components/IGO/IGOProfile";
import IGOTargetRaise from "components/IGO/IGOTargetRaise";
import IGOInvest from "components/IGO/IGOInvest";

const ProjectDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const wallet = useSelector((state: RootState) => state.wallet);

  const [dataIGO, setDataIGO] = useState<IProjectDetail | null>(null);
  const [openRequirement, setOpenRequirement] = useState<boolean>(false);

  const fetchData = () => {
    dispatch(
      getProjectListById({
        id: router.query?.id?.toString() || "0",
        walletAddress: wallet.walletAddress?.toString() || "",
      })
    ).then((resp) => {
      setDataIGO(resp.payload);
    });
  };

  useEffect(() => {
    if (router.query.id && wallet.walletAddress) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, wallet.walletAddress]);

  return (
    <>
      {dataIGO?.project && (
        <div>
          <div className="absolute top-0 h-[708px] w-full overflow-hidden">
            <img src={dataIGO.project.banner || ""} alt="banner" className="w-full" />
            <div
              className="absolute bottom-0 h-full w-full"
              style={{
                background:
                  "linear-gradient(360deg, #0b0b0b 57.24%, rgba(11, 11, 11, 0.2) 98.26%)",
              }}
            />
          </div>
          <div className="relative mx-auto mt-[280px] box-content max-w-screen-maxContent px-6">
            <div className="flex gap-4">
              <div className="flex-[690]">
                <IGOProfile
                  companyLogo={{
                    img: dataIGO.project.logo || "",
                    width: 80,
                    height: 80,
                  }}
                  companyEndDate={dataIGO.project.registrationPeriodEnd}
                  companyDesc={dataIGO.project.description}
                  companyName={dataIGO.project.name}
                  companyToken={dataIGO.project.tokenSymbol}
                  companySosMedia={getSocialMedias(dataIGO.project)}
                  networkName={dataIGO.project.Chain?.name}
                  networkLogo={dataIGO.project.Chain?.logo}
                />
                <IGOPoolTimeline data={dataIGO.project} />
                {/* <IGOClaimStatus /> */}
              </div>
              <div className="flex-[448]">
                <IGOTargetRaise
                  handleOpenRequirement={() => setOpenRequirement(true)}
                  data={dataIGO.project}
                />
                <IGOInvest
                  isRegistered={dataIGO.isRegistered}
                  maxAllocation={dataIGO.maxAllocation}
                  investedAmount={dataIGO.investedAmount}
                  data={dataIGO.project}
                  refetchData={fetchData}
                />
              </div>
            </div>
          </div>
          <Requirement
            openRequirement={openRequirement}
            handleClose={() => setOpenRequirement(false)}
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
