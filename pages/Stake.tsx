import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'



const Stake: NextPage = () => {
  const wallet  = useSelector((state: RootState) => state.wallet)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    console.log(wallet)
    // if(wallet.balance === 0 || wallet.balance === null) {
    //   router.push('/Verification')
    // }

  }, [wallet])


  return (
    <div className='px-36 pt-40'>
      <div className="font-bold text-5xl font-['avara'] mb-10">
        Stake Rocks
      </div>
      <div className="mb-32">
        <div className='grid grid-cols-4 gap-3'>
          <div className="p-6 bg-[#151011] border border-[#B546394D]">
            <div className="font-['avara'] text-xl text-[#CA5D50]">claim</div>
            <div className='mt-6'>
              <div className='text-sm text-[#D0D5DD] mb-2'>You own</div>
              <div className="font-['avara'] text-3xl">0 Grug&apos;s</div>
            </div>
            <button className="px-4 py-2 bg-[#B54639] font-['avara'] text-sm">Claim ROCKS</button>
          </div>
          <div className='p-6 bg-[#151011] border border-[#B546394D] col-span-2'>
            <div className="font-['avara'] text-xl text-[#CA5D50]">stake and unstake</div>
            <div className='divide-y divide-[#FCFCFD] divide-dashed'>
              <div className='mt-6 grid grid-cols-2'>
                <div>
                  <div className='text-sm text-[#D0D5DD] mb-2'>ROCKS Balance</div>
                  <div className="font-['avara'] text-3xl">0.0</div>
                </div>
                <div className='text-right'>
                  <button className="px-8 py-2 bg-[#B54639] font-['avara'] text-sm">Stake</button>
                </div>
              </div>
              <div className='mt-6'>
                <div className='text-sm text-[#D0D5DD] mb-2 mt-6'>Unlock Stake Balance: 0 ROCKS</div>
                <div>

                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-[#151011] border border-[#B546394D]">
            <div className="font-['avara'] text-xl text-[#CA5D50]">Overview</div>
            <div className='mt-6'>
              <div className='text-sm text-[#D0D5DD] mb-2'>$ROCKS Stake</div>
              <div className="font-['avara'] text-3xl">0.0</div>
            </div>
            <div>
              <div className='mb-4 grid grid-cols-5'>
                <FontAwesomeIcon icon={faLock} color="#475467"/>
                <div className="col-span-3 text-xs text-[#D0D5DD]">$ROCKS Lock</div>
                <div className="font-['avara'] text-xs">0.0</div>
              </div>
              <div className='grid grid-cols-5'>
                <FontAwesomeIcon icon={faLockOpen} color="#B54639"/>
                <div className="col-span-3 text-xs text-[#D0D5DD]">$ROCKS Unlock</div>
                <div className="font-['avara'] text-xs">0.0</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Stake
