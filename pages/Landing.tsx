import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import Banner from '../components/Landing/Banner'
import NotVerifiedGrug from '../components/Landing/NotVerifiedGrug'
import Project from '../components/Landing/Project'
import { RootState } from '../store'



const Landing: NextPage = () => {
  const wallet  = useSelector((state: RootState) => state.wallet)

  return (
    <div>

      <div>
        <Banner />
        <>
          <div className="my-4 mx-16">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li className="mr-2" role="presentation">
                    <button className="inline-block p-4 rounded-t-lg border-b-2" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                      Ongoing
                    </button>
                </li>
                <li className="mr-2" role="presentation">
                    <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">
                      Upcoming
                    </button>
                </li>
                <li className="mr-2" role="presentation">
                    <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">
                      Ended
                    </button>
                </li>
                <li role="presentation">
                    <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">
                      Participate
                    </button>
                </li>
            </ul>
          </div>
          <div className="relative">
            <div className='mx-16 grid gap-6 grid-cols-2 pb-5'>
              <Project></Project>
              <Project></Project>
            </div>
            {wallet.walletAddress && (wallet.balance && wallet.balance > 0) ?
              (<></>) : (<NotVerifiedGrug />)
            }
          </div>
        </>
        
      </div>
    </div>
  )
}

export default Landing
