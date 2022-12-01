import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { walletState } from 'store/wallet/walletType'
import { IContractRocks } from 'store/contractRocks/contractRocks'
import ModalStakeAmount from '@/components/Public/ModalStakeAmount'
import { changeToOneDecimal, ethToWei } from 'helper/utilities'
import { Button, Input, InputNumber } from 'antd'
import { useAppDispatch } from 'hooks/useStoreHooks'
import { contractUnstaking, getGasPrice } from 'store/contractStake/thunk'
import { IContractStake } from 'store/contractStake/contractStake'
import useMessage from 'hooks/useMessageHooks'
import ModalClaimRocks from '@/components/Public/ModalClaimRocks'



const Staking: NextPage = () => {
  const wallet: walletState  = useSelector((state: RootState) => state.wallet)
  const contractRocks: IContractRocks  = useSelector((state: RootState) => state.contractRocks)
  const contractStake: IContractStake  = useSelector((state: RootState) => state.contractStake)
  const router = useRouter()

  const { pushMessage } = useMessage()

  const dispatch = useAppDispatch()

  const [unStakeAmount, setUnStakeAmount] = useState('');

  function changeUnStakeAmount(value: string) {
    setUnStakeAmount(value)
  }

  async function unStake() {
    await dispatch(getGasPrice())
    const weiAmount = ethToWei(unStakeAmount?.toString() || '0')
    const result = await dispatch(contractUnstaking(weiAmount))

    if(result?.payload?.hash) {
      await pushMessage('success', {
        title: '',
        description: 'Successfully unstake token'
      })
    }
    
    //@ts-ignore
    if(result?.error?.message === 'Rejected') {
      await pushMessage('failed', {
        title: '',
        description: result.payload.reason
      })
    }
  }

  return (
    <div className='px-36 pt-40'>
      <div className="font-bold text-5xl font-['avara'] mb-10">
        Stake Rocks
      </div>
      <div className="mb-32">
        <div className='grid grid-cols-4 gap-3'>
          <div className="relative p-6 bg-[#151011] border border-[#B546394D]">
            <div className="font-['avara'] text-xl text-[#CA5D50]">claim</div>
            <div className='mt-6'>
              <div className='text-sm text-[#D0D5DD] mb-2'>You own</div>
              <div className="font-['avara'] text-3xl">{wallet.balance || 0} Grug&apos;s</div>
            </div>
            <div className='absolute bottom-6'>
              <ModalClaimRocks actionTitle='Claim $ROCKS' paddingButton='px-4 py-2'/>
            </div>
          </div>
          <div className='p-6 bg-[#151011] border border-[#B546394D] col-span-2'>
            <div className="font-['avara'] text-xl text-[#CA5D50]">stake and unstake</div>
            <div className='divide-y divide-[#FCFCFD] divide-dashed'>
              <div className='mt-6 grid grid-cols-2'>
                <div>
                  <div className='text-sm text-[#D0D5DD] mb-2 px-'>ROCKS Balance</div>
                  <div className="font-['avara'] text-3xl">{changeToOneDecimal(contractRocks.balanceOfRocks) || '0'}</div>
                </div>
                <div className='text-right'>
                  <ModalStakeAmount actionTitle='Stake' paddingButton={'py-2 px-8'}/>
                </div>
              </div>
              <div className='mt-6'>
                <div className='text-sm text-[#D0D5DD] mb-2 mt-6'>Unlock Stake Balance: {contractStake.unlockRocks || '0'} ROCKS</div>
                <div className='p-4 bg-[#68121E1A]'>
                  <div>
                    Amount to Unstake
                  </div>
                  <div>
                  <Input.Group compact>
                    <InputNumber
                      style={{ width: 'calc(100% - 200px)', border:'unset' }} 
                      className="bg-[#68121d00] text-white"
                      value={unStakeAmount} 
                      size="large"
                      onChange={changeUnStakeAmount}
                      controls={false}
                    />
                    <Button
                      size="large"
                      style={{border:'unset'}}
                      className="
                        text-[#CA5D50] bg-[#68121E00] border-0 font-['avara'] 
                        hover:text-[#CA5D50] hover:bg-[#68121E00] hover:border-[#CA5D504D]
                        active:text-[#CA5D50] active:bg-[#68121E00] active:border-[#CA5D504D]
                        focus:text-[#CA5D50] focus:bg-[#68121E00] focus:border-[#CA5D504D]
                      "
                      onClick={() => setUnStakeAmount(contractRocks.balanceOfRocks.toString())}
                    >
                      Max
                    </Button>
                    <Button
                      style={{border:'unset'}} 
                      className="
                      bg-[#B54639] text-white font-['avara'] py-2 px-4
                      hover:text-white hover:bg-[#B54639] hover:border-[#CA5D5000]
                      active:text-white active:bg-[#B54639] active:border-[#CA5D5000]
                      focus:text-white focus:bg-[#B54639] focus:border-[#CA5D5000]
                      "
                      onClick={unStake}
                    >
                      Unstake
                    </Button>
                  </Input.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative p-6 bg-[#151011] border border-[#B546394D]">
            <div className="font-['avara'] text-xl text-[#CA5D50]">Overview</div>
            <div className='mt-6'>
              <div className='text-sm text-[#D0D5DD] mb-2'>$ROCKS Stake</div>
              <div className="font-['avara'] text-3xl">{changeToOneDecimal(contractStake.balances) || 0}</div>
            </div>
            <div className='absolute bottom-6'>
              <div className='mb-4 grid grid-cols-5'>
                <FontAwesomeIcon icon={faLock} color="#475467"/>
                <div className="col-span-3 text-xs text-[#D0D5DD]">$ROCKS Lock</div>
                <div className="font-['avara'] text-xs">{contractStake.lockRocks || '0'}</div>
              </div>
              <div className='grid grid-cols-5'>
                <FontAwesomeIcon icon={faLockOpen} color="#B54639"/>
                <div className="col-span-3 text-xs text-[#D0D5DD]">$ROCKS Unlock</div>
                <div className="font-['avara'] text-xs">{contractStake.unlockRocks || '0'}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Staking
