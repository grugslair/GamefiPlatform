/* eslint-disable @next/next/no-img-element */
import { Button, Divider, Input } from "antd";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ILaunchPadState, IProjectList } from "store/launchpad/launchpad";
import {
  approveContractUSDC,
  getUSDCAllowance,
  investUSDC,
} from "store/contractUSDC/thunk";
import { getGasPrice } from "store/contractStake/thunk";
import {
  getInvestSignature,
  getProjectListById,
  registerProject,
} from "store/launchpad/thunk";
import { IContractStake } from "store/contractStake/contractStake";
import { IContractUSDC } from "store/contractUSDC/contractUSDC";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";

// Global components
import IgoStake from "components/IGO/IGORegister/IgoStake";
import IgoRegister from "components/IGO/IGORegister";

// Global utils
import { useAppDispatch } from "hooks/useStoreHooks";
import { ethToWei } from "helper/utilities";

// Local components
import { pushMessage } from "core/notification";
import moment from "moment";

interface IIGOInvest {
  data: IProjectList;
  isRegistered: boolean;
  refetchData: () => void;
}

const IGOInvest = ({ data, isRegistered, refetchData }: IIGOInvest) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  const [amount, setAmount] = useState("0");

  // const isRegisterationPhase = moment().isBetween(
  //   moment(data.periodStart),
  //   moment(data.periodEnd)
  // );
  const isRegisterationPhase = true;

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
        pushMessage(
          {
            status: "success",
            title: "",
            description: "Successfully register project",
          },
          dispatch
        );
        refetchData();
      }
    });
  }

  async function invest() {
    const projectId = router.query.id || "0";
    const walletAddress = wallet.walletAddress || "";

    await dispatch(getGasPrice());
    const getAllowanceResult = await dispatch(getUSDCAllowance());

    // If allowance is less than amount, trigger approveContractUSDC
    if (Number(getAllowanceResult?.payload?.allowance) < Number(amount)) {
      const weiAmount = ethToWei(amount?.toString() || "0");
      const approveResult = await dispatch(approveContractUSDC(weiAmount));

      //@ts-ignore
      if (approveResult?.error?.message === "Rejected") {
        pushMessage(
          {
            status: "error",
            title: "",
            description: approveResult.payload.reason,
          },
          dispatch
        );
        return;
      }
    }

    const getSignatureResult = await dispatch(
      getInvestSignature({
        projectId: projectId,
        commitAmount: Number(amount),
        walletAddress: walletAddress,
      })
    );

    if (getSignatureResult?.payload?.message) {
      dispatch(investUSDC(amount));
    }
  }

  function changeAmount(event: ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.value);
  }

  return (
    <div className="relative mt-4 bg-[#151011] p-6">
      <div className="mb-4 font-['avara'] text-[#CA5D50]">Invest</div>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <div className="text-[#D0D5DD]">
          My ${data.Currency.symbol} Balance:
        </div>
        <div className="text-right">
          {contractUSDC.balanceUSDC} ${data.Currency.symbol}
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="text-[#D0D5DD]">Max. Allocation:</div>
        <div className="text-right">100 ${data.Currency.symbol}</div>
      </div>
      <div className="border border-[#CA5D504D] p-4">
        <div className="mb-1 text-xs text-[#D0D5DD]">
          Invest (${data.Currency.symbol})
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
              onClick={() => setAmount(contractUSDC.balanceUSDC.toString())}
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
            To get (${data.tokenSymbol})
          </div>
          <div className="mb-4 font-['avara'] text-2xl">
            {parseInt(amount, 10) * data.publicSalePrice || "0"}
          </div>
        </div>

        <div>
          <Button
            className="h-full w-full bg-[#B54639] py-3 text-center font-['avara']"
            onClick={invest}
            // disabled
          >
            Invest ${data.Currency.symbol}
          </Button>
        </div>
      </div>
      {isRegisterationPhase ? (
        contractStake.balances < 3000 ? (
          <IgoStake />
        ) : (
          <IgoRegister
            isRegistered={isRegistered}
            submitRegistrationProject={submitRegistrationProject}
            loadingRegister={launchpad.loadingRegisterProject}
          />
        )
      ) : (
        !isRegistered && <div>You are not able to buy</div>
      )}
    </div>
  );
};

export default IGOInvest;
