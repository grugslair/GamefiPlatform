import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { isNumber } from 'lodash';

import { RootState } from 'store';
import { useSelector } from 'react-redux';

import useWallet, { web3Modal } from 'hooks/useWallet';

export { RouteGuard };

const isDevBypassRoute = false;

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
        if (isDevBypassRoute) return;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet.balance])


    if (canShow || isCurrentPathPublic || isDevBypassRoute) {
        return (children);
    } else {
        return "Loading..."
    }
}