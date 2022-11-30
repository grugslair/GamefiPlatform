// Redux
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Components
import Banner from "../components/Public/Banner";
import NotVerifiedGrug from "../components/Verification/NotVerifiedGrug";

const Verify = () => {
  const wallet = useSelector((state: RootState) => state.wallet);
  return (
    <>
      <Banner />
      {!(wallet.walletAddress && wallet.balance && wallet.balance > 0) && (
        <NotVerifiedGrug />
      )}
    </>
  );
};

export default Verify;
