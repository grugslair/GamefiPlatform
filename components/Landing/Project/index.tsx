import ProjectBanner from "./ProjectBanner"
import ProjectDescription from "./ProjectDescription.tsx"
import ProjectTarget from "./ProjectTarget"
import ProjectStyle from './Project.module.css'

const Project = () => {
  return (
    <>
      <div className="">
        <ProjectBanner></ProjectBanner>
        <div className="p-4 border">
          <ProjectDescription></ProjectDescription>
          <ProjectTarget></ProjectTarget>
          <button className="bg-indigo-600 text-white w-full rounded-md p-1">Participate</button>
        </div>
      </div>
    </>
  )
}

export default Project