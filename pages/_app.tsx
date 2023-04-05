import { notification } from "antd";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import RouteGuard from "core/routeGuard";
import MobileGuard from "core/mobileGuard";
import Notification from "core/notification";

import store from "store/index";

import Layout from "components/Layout";

import "styles/globals.css";

import { EthereumClient, modalConnectors, walletConnectProvider } from "@web3modal/ethereum"
import { Web3Modal} from "@web3modal/react"
import { goerli, configureChains, createClient, WagmiConfig } from "wagmi"

config.autoAddCss = false;

notification.config({
  maxCount: 5,
  duration: 3,
});


const projectId = 'b84d5cea063ce59ac6845a21ac965631'

const chains = [goerli]

const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider,
})

export const ethereumClient = new EthereumClient(wagmiClient, chains)

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <Notification>
          <Layout>
            <RouteGuard>
              <MobileGuard>
                <Component {...pageProps} />
              </MobileGuard>
            </RouteGuard>
          </Layout>
        </Notification>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
      </WagmiConfig>
    </Provider>
  );
}

export default MyApp;
