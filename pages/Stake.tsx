import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'



const Stake: NextPage = () => {
  const wallet  = useSelector((state: RootState) => state.wallet)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if(wallet.balance === 0 || wallet.balance === null) {
      router.push('/Verification')
    }

  }, [wallet])


  return (
    <div className='px-36 pt-40'>
      <div>
        Stake Rocks
      </div>
      <div>
        <div className='grid grid-cols-4 gap-3'>
          <div className='p-6'>
            <div>claim</div>
            <div>
              <div>You own</div>
              <div>0 Grugs</div>
            </div>
            <div>Claim Rocks</div>
          </div>
          <div className='col-span-2'>
            <div>stake and unstake</div>
            <div>
              <div>ROCKS Balance</div>
              <div>0.0</div>
              <div>Stake</div>
            </div>
            <hr/>
            <div>
              <div>Unlock Stake Balance: 0 ROCKS</div>
              <div>

              </div>
            </div>
          </div>
          <div>
            <div>Overview</div>
            <div>
              <div>$ROCKS Stake</div>
              <div>0.0</div>
            </div>
            <div>
              <div>
                <i>key</i>
                <div>$ROCKS Lock</div>
                <div>0.0</div>
              </div>
              <div>
                <i>key</i>
                <div>$ROCKS Unlock</div>
                <div>0.0</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Stake
