import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faSpinner } from "@fortawesome/free-solid-svg-icons";

import useMediaQuery from "hooks/useMediaQuery";

export default MobileGuard;

function MobileGuard({ children }: any) {
  const router = useRouter();
  const mobile = useMediaQuery("(max-width: 955px)");
  const [isMobile, setIsMobile] = useState(-1);

  const path = router.asPath.split("?")[0];
  const mobileSafePath = ["/reports"];
  const isCurrentPathMobileSafe = mobileSafePath.includes(path);

  useLayoutEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);

  console.log(isMobile);

  if (isMobile === -1) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "80vh", marginBottom: -200 }}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-6xl text-primary600"
          spin
        />
      </div>
    );
  }

  if (!isMobile || isCurrentPathMobileSafe) {
    return children;
  } else {
    return (
      <div
        className="flex flex-col items-center justify-center px-4 text-center"
        style={{ height: "80vh", marginBottom: -200 }}
      >
        <FontAwesomeIcon
          icon={faComputer}
          className="text-5xl text-primary500"
        />
        <div className="mt-6 font-avara text-xl font-extrabold text-white">
          View this page on your desktop
        </div>
        <div className="mt-2 font-sora text-base font-light text-gray300">
          This page is not yet supported for mobile viewing
        </div>
      </div>
    );
  }
}
