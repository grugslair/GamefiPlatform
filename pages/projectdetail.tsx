/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IProjectList } from "store/launchpad/launchpad";
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

  const [dataIGO, setDataIGO] = useState<IProjectList | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [openRequirement, setOpenRequirement] = useState<boolean>(false);

  const fetchData = () => {
    dispatch(
      getProjectListById({
        id: router.query?.id?.toString() || "0",
        walletAddress: wallet.walletAddress?.toString() || "",
      })
    ).then((resp) => {
      console.log(resp.payload);
      setDataIGO(resp.payload.project);
      setIsRegistered(resp.payload.isRegistered);
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
      {dataIGO && (
        <div>
          <div className="absolute top-0 h-[708px] w-full overflow-hidden">
            <img src={dataIGO.banner || ""} alt="banner" className="w-full" />
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
                    img: dataIGO?.logo || "",
                    width: 80,
                    height: 80,
                  }}
                  companyEndDate={dataIGO?.registrationPeriodEnd}
                  companyDesc={dataIGO?.description}
                  companyName={dataIGO?.name}
                  companyToken={dataIGO?.tokenSymbol}
                  companySosMedia={getSocialMedias(dataIGO!)}
                  networkName={dataIGO?.Chain?.name}
                  networkLogo={dataIGO?.Chain?.logo}
                />
                <IGOPoolTimeline data={dataIGO} />
                {/* <IGOClaimStatus /> */}
              </div>
              <div className="flex-[448]">
                <IGOTargetRaise
                  handleOpenRequirement={() => setOpenRequirement(true)}
                  data={dataIGO}
                />
                <IGOInvest
                  isRegistered={isRegistered}
                  data={dataIGO}
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
