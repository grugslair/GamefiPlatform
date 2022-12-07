import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useWallet, { web3Modal } from 'hooks/useWallet';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/useStoreHooks';
import { getGrugBalance } from 'store/wallet/thunk';
import { PayloadAction } from '@reduxjs/toolkit';
import { isNumber } from 'lodash';

export { RouteGuard };

function RouteGuard({ children }: any) {
    const prevBalanceRef = useRef();
    const router = useRouter();

    const path = router.asPath.split('?')[0];
    const publicPaths = ['/verify', '/reports'];
    const isCurrentPathPublic = publicPaths.includes(path);

    const { connectWallet, isAuthorize } = useWallet()

    const wallet = useSelector((state: RootState) => state.wallet)

    const [canShow, setCanShow] = useState<boolean>(false)

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    useEffect(() => {
        if (wallet.balance !== null || isNumber(prevBalanceRef.current) || !web3Modal.cachedProvider) {
            if (isAuthorize) {
                setCanShow(true)
                if(path.includes('verify')) {
                    router.push({
                        pathname: '/projects'
                    })    
                }
            } else {
                setCanShow(false)
                if (!isCurrentPathPublic) {
                    router.push({
                        pathname: '/verify',
                    });
                }
            }
        }
        //@ts-ignore
        prevBalanceRef.current = wallet.balance
    }, [wallet.balance])


    if (canShow || isCurrentPathPublic) {
        return (children);
    } else {
        return "Loading..."
    }
}