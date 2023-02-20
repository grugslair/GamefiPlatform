import { Tabs } from "antd";
import { useEffect } from "react";
import type { NextPage } from "next";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { getProjectList } from "store/launchpad/thunk";
import type { IProjectList } from "store/launchpad/launchpad";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useAppDispatch } from "hooks/useStoreHooks";

// Components
import Banner from "components/Public/Banner";
import Project from "components/Landing/Project";

import styles from "styles/Projects.module.css";
import { useAccount } from "wagmi";

interface IGridWrapper {
  projects: IProjectList[];
  loading: boolean;
}

const GridWrapper = ({ projects, loading }: IGridWrapper) => {
  if (!projects.length) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        {loading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-6xl text-primary600"
            spin
          />
        ) : (
          <>
            <div className="font-avara text-3xl font-extrabold text-white">
              No available projects
            </div>
            <div className="mt-2 text-center font-sora text-xl font-light text-grayCool300">
              Projects will be shown here when it&quot;s available.
              <br />
              Join our Discord to be the first to know
            </div>
          </>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-14">
      {projects.map((project, i) => (
        <Project key={i} dataproject={project} />
      ))}
    </div>
  );
};

const Landing: NextPage = () => {
  const { loading, list } = useSelector(
    (state: RootState) => state.launchpad.projects
  );
  const { address } = useAccount()
  const dispatch = useAppDispatch();
  const isLoading = loading || !address;

  useEffect(() => {
    address &&
      dispatch(getProjectList({ walletAddress: address }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const items = [
    {
      label: "All",
      key: "all",
      children: <GridWrapper projects={list} loading={isLoading} />,
    },
    {
      label: "Ongoing",
      key: "ongoing",
      children: (
        <GridWrapper
          projects={list.filter((e) => e.status === "on_going")}
          loading={isLoading}
        />
      ),
    },
    {
      label: "Upcoming",
      key: "upcoming",
      children: (
        <GridWrapper
          projects={list.filter((e) => e.status === "upcoming")}
          loading={isLoading}
        />
      ),
    },
    {
      label: "Participated",
      key: "participated",
      children: (
        <GridWrapper
          projects={list.filter((e) => e.status === "participate")}
          loading={isLoading}
        />
      ),
    },
  ];

  return (
    <div>
      <div>
        <Banner />
        <div className="mx-auto -mt-24 box-content max-w-screen-maxContent px-6">
          <Tabs
            items={items}
            className={styles.ProjectsTab}
            tabBarGutter={48}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
