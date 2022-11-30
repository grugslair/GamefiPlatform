import { Tabs } from "antd";
import { useEffect } from "react";
import type { NextPage } from "next";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
const tailwind = resolveConfig(tailwindConfig);

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { IProject } from "store/launchpad/launchpad";
import { getProjectList } from "store/launchpad/thunk";

// Hooks
import { useAppDispatch } from "hooks/useStoreHooks";

// Components
import Banner from "components/Public/Banner";
import Project from "components/Landing/Project";

import styles from "styles/Projects.module.css";

interface IGridWrapper {
  projects: IProject[];
}

const GridWrapper = ({ projects }: IGridWrapper) =>
  projects.length ? (
    <div className="grid grid-cols-2 gap-x-4 gap-y-14">
      {projects.map((project, i) => (
        <Project key={i} dataproject={project} />
      ))}
    </div>
  ) : (
    <div className="flex h-96 flex-col items-center justify-center">
      <div className="font-avara text-3xl font-extrabold leading-[38px] text-white">
        No available projects
      </div>
      <div className="mt-2 text-center font-sora text-xl font-light leading-[30px] text-grayCool300">
        Projects will be shown here when it&quot;s available.
        <br />
        Join our Discord to be the first to know
      </div>
    </div>
  );

const Landing: NextPage = () => {
  const launchpad = useSelector((state: RootState) => state.launchpad);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      label: "All",
      key: "all",
      children: <GridWrapper projects={launchpad.projectList} />,
    },
    {
      label: "Ongoing",
      key: "ongoing",
      children: (
        <GridWrapper
          projects={launchpad.projectList.filter(
            (e) => e.status === "on_going"
          )}
        />
      ),
    },
    {
      label: "Upcoming",
      key: "upcoming",
      children: (
        <GridWrapper
          projects={launchpad.projectList.filter(
            (e) => e.status === "upcoming"
          )}
        />
      ),
    },
    {
      label: "Participated",
      key: "participated",
      children: (
        <GridWrapper
          projects={launchpad.projectList.filter(
            (e) => e.status === "participate"
          )}
        />
      ),
    },
  ];

  return (
    <div>
      <div>
        <Banner />
        <div className="mx-auto -mt-24 box-content max-w-[1144px] px-6">
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
