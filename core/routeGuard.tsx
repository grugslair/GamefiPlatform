import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useWallet, { web3Modal } from 'hooks/useWallet';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

export { RouteGuard };

function RouteGuard({ children }: any) {
    const router = useRouter();

    const { connectWallet, isAuthorize } = useWallet()

    const wallet = useSelector((state: RootState) => state.wallet)

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    useEffect(() => {
        authCheck(router.asPath);
    }, [isAuthorize])

    function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/verify'];
        const path = url.split('?')[0];
        console.log(isAuthorize)
        if (!isAuthorize && !publicPaths.includes(path)) {
            router.push({
                pathname: '/verify',
            });
        } else {
            router.push({
                pathname: '/projects'
            })
        }
    }

    return (children);
}