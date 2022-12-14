/* eslint-disable @next/next/no-img-element */
import { Button, Divider, Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ILaunchPadState, IProjectList } from "store/launchpad/launchpad";
import { getProjectListById, registerProject } from "store/launchpad/thunk";
import { IContractStake } from "store/contractStake/contractStake";
import { IContractUSDC } from "store/contractUSDC/contractUSDC";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";

// Global utils
import { useAppDispatch } from "hooks/useStoreHooks";
import useCountDown from "hooks/useCountDown";
import { getSocialMedias } from "helper/utilities";

// Global components
import Requirement from "components/Public/Requirement";
import IgoRegister from "components/IGO/IGORegister";

// Local components
import IGOPoolTimeline from "../components/IGO/IGOPoolTimeline";
import IGOProfile from "../components/IGO/IGOProfile";
import IgoStake from "../components/IGO/IGORegister/IgoStake";
import IGOTargetRaise from "../components/IGO/IGOTargetRaise";
import { IIGOProfileProp } from "../components/IGO/type";
import { pushMessage } from "core/notification";

const ProjectDetail = () => {
  const wallet = useSelector((state: RootState) => state.wallet);

  const launchpad = useSelector(
    (state: RootState) => state.launchpad
  ) as ILaunchPadState;

  const contractUSDC = useSelector(
    (state: RootState) => state.contractUSDC
  ) as IContractUSDC;

  const contractStake: IContractStake = useSelector(
    (state: RootState) => state.contractStake
  );

  const [dataIGO, setDataIGO] = useState<IProjectList | null>(null);

  const [amount, setAmount] = useState("0");

  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [openRequirement, setOpenRequirement] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { countDown, handleSetEndDate } = useCountDown();

  const router = useRouter();

  useEffect(() => {
    if (launchpad.projectDetail?.project.periodStart) {
      handleSetEndDate(
        new Date(launchpad.projectDetail?.project.periodStart).getTime()
      );
    }
  }, []);

  useEffect(() => {
    if (router.query.id && wallet.walletAddress) {
      dispatch(
        getProjectListById({
          id: router.query?.id?.toString() || "0",
          walletAddress: wallet.walletAddress?.toString() || "",
        })
      ).then((resp) => {
        setDataIGO(resp.payload.project);
        setIsRegistered(resp.payload.isRegistered);
      });
    }
  }, [router, wallet.walletAddress]);

  function submitRegistrationProject() {
    const projectId = router.query.id || "0";
    const walletAddress = wallet.walletAddress || "";

    dispatch(
      registerProject({
        projectId: projectId,
        walletAddress: walletAddress,
      })
    ).then((resp) => {
      if (resp.payload.success) {
        pushMessage("success", {
          title: "",
          description: "Successfully register project",
        }, dispatch);
        dispatch(
          getProjectListById({
            id: projectId.toString(),
            walletAddress: walletAddress,
          })
        );
      }
    });
  }

  const IgoProfile: IIGOProfileProp = {
    companyLogo: {
      img: dataIGO?.logo || "",
      width: 80,
      height: 80,
    },
    companyName: dataIGO?.name || "",
    companyToken: dataIGO?.tokenSymbol || "",
    companyDesc: dataIGO?.description || "",
    companySosMedia: getSocialMedias(dataIGO!),
    companyEndDate: dataIGO?.periodEnd || "",
  };

  function changeAmount(event: ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.value);
  }

  function handleOpenRequirement() {
    setOpenRequirement(true);
  }

  function handleCloseRequirement() {
    setOpenRequirement(false);
  }

  return (
    <>
      {dataIGO && (
        <div>
          <div className="absolute top-0 h-[708px] w-full overflow-hidden">
            <img src={dataIGO.banner || ""} alt="banner" />
            <div className="projectDetailsGradient absolute bottom-0 h-full w-full" />
          </div>
          <div className="relative mx-auto mt-[280px] box-content max-w-[1144px] px-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <IGOProfile
                  companyEndDate={IgoProfile.companyEndDate}
                  companyLogo={IgoProfile.companyLogo}
                  companyDesc={IgoProfile.companyDesc}
                  companyName={IgoProfile.companyName}
                  companyToken={IgoProfile.companyToken}
                  companySosMedia={IgoProfile.companySosMedia}
                />
                <IGOPoolTimeline data={dataIGO} />
                {/* <IGOClaimStatus /> */}
              </div>
              <div>
                <IGOTargetRaise
                  handleOpenRequirement={handleOpenRequirement}
                  data={dataIGO}
                />
                <div className="relative mt-4 bg-[#151011] p-6">
                  <div className="mb-4 font-['avara'] text-[#CA5D50]">
                    Invest
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-2">
                    <div className="text-[#D0D5DD]">
                      My ${dataIGO.Currency.symbol} Balance:
                    </div>
                    <div className="text-right">
                      {contractUSDC.balanceUSDC} ${dataIGO.Currency.symbol}
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    <div className="text-[#D0D5DD]">Max. Allocation:</div>
                    <div className="text-right">
                      100 ${dataIGO.Currency.symbol}
                    </div>
                  </div>
                  <div className="border border-[#CA5D504D] p-4">
                    <div className="mb-1 text-xs text-[#D0D5DD]">
                      Invest (${dataIGO.Currency.symbol})
                    </div>
                    <div>
                      <Input.Group compact>
                        <Input
                          style={{ width: "calc(100% - 100px)" }}
                          className="border border-[#CA5D504D] bg-[#68121E1A] text-white"
                          value={amount}
                          size="large"
                          defaultValue={0}
                          onChange={changeAmount}
                          type="number"
                        />
                        <Button
                          size="large"
                          className="
                            border border-[#CA5D504D] bg-[#68121E1A] font-['avara'] text-[#CA5D50] 
                            hover:border-[#CA5D504D] hover:bg-[#68121E1A] hover:text-[#CA5D50]
                            focus:border-[#CA5D504D] focus:bg-[#68121E1A] focus:text-[#CA5D50]
                            active:border-[#CA5D504D] active:bg-[#68121E1A] active:text-[#CA5D50]
                          "
                          onClick={() =>
                            setAmount(contractUSDC.balanceUSDC.toString())
                          }
                        >
                          Max
                        </Button>
                      </Input.Group>
                    </div>

                    <div className="py-2 text-center">
                      <Divider dashed style={{ border: "#FCFCFD" }}>
                        <FontAwesomeIcon
                          icon={faCircleArrowDown}
                          color="#B54639"
                          className="fa-xl"
                        />
                      </Divider>
                    </div>
                    <div>
                      <div className="mb-1 text-xs text-[#D0D5DD]">
                        To get (${dataIGO.tokenSymbol})
                      </div>
                      <div className="mb-4 font-['avara'] text-2xl">
                        {parseInt(amount, 10) * dataIGO.publicSalePrice || "0"}
                      </div>
                    </div>

                    <div>
                      <Button
                        className="h-full w-full bg-[#B54639] py-3 text-center font-['avara']"
                        disabled
                      >
                        Invest ${dataIGO.Currency.symbol}
                      </Button>
                    </div>
                  </div>
                  {contractStake.balances < 3000 ? (
                    <IgoStake />
                  ) : countDown ? (
                    <IgoRegister
                      isRegistered={isRegistered}
                      submitRegistrationProject={submitRegistrationProject}
                      loadingRegister={launchpad.loadingRegisterProject}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Requirement
            openRequirement={openRequirement}
            handleClose={handleCloseRequirement}
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
