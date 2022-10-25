import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import Banner from '../components/Public/Banner'
import Project from '../components/Landing/Project'
import { RootState } from '../store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getProjectList } from '../store/launchpad/thunk'
import { useAppDispatch } from '../hooks/useStoreHooks'
import { Tabs } from 'antd'



const Landing: NextPage = () => {
  const wallet  = useSelector((state: RootState) => state.wallet)
  const launchpad = useSelector((state: RootState) => state.launchpad)
  const dispatch = useAppDispatch()
  const router = useRouter()


  useEffect(() => {
    if(wallet.balance === 0 || wallet.balance === null) {
      router.push('/verify')
    }
  }, [wallet])

  useEffect(() => {
    dispatch(getProjectList())
  }, [])

  return (
    <div>

      <div>
        <Banner />
        <>
          <div className="my-4 mx-[148px]">
            <Tabs defaultActiveKey="1" tabBarStyle={{color: 'white'}}>
              <Tabs.TabPane tab="Ongoing" key="1">
                <div className="relative">
                  <div className='grid gap-4 grid-cols-2 pb-5'>
                    {launchpad.projectList.map((project, index) => {
                      if(project.status === 'on_going') {
                        return(
                          <Project key={index} dataproject={project} />
                        )
                      }
                    })}
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Upcoming" key="2">
                <div className="relative">
                  <div className='grid gap-4 grid-cols-2 pb-5'>
                    {launchpad.projectList.map((project, index) => {
                      if(project.status === 'up_coming') {
                        return(
                          <Project key={index} dataproject={project} />
                        )
                      }
                    })}
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Ended" key="3">
                <div className="relative">
                  <div className='grid gap-4 grid-cols-2 pb-5'>
                    {launchpad.projectList.map((project, index) => {
                      if(project.status === 'ended') {
                        return(
                          <Project key={index} dataproject={project} />
                        )
                      }
                    })}
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Participate" key="4">
                <div className="relative">
                  <div className='grid gap-4 grid-cols-2 pb-5'>
                    {launchpad.projectList.map((project, index) => {
                      if(project.status === 'participate') {
                        return(
                          <Project key={index} dataproject={project} />
                        )
                      }
                    })}
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
          
        </>
        
      </div>
    </div>
  )
}

export default Landing
