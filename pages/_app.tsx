import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../store/index'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { notification } from 'antd'
import { useEffect } from 'react'
import type { W3mModal } from '@web3modal/ui'
import { ConfigCtrl } from '@web3modal/core'

config.autoAddCss = false

notification.config({
  maxCount: 5,
  duration: 1000000,
})

ConfigCtrl.setConfig({
  projectId: "ac5a9cb50dde75f987bbb76555d229b4",
  enableStandaloneMode: true,
  themeMode: "light" as const,
  themeColor: "orange" as const,
});

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    import('@web3modal/ui')
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <w3m-modal></w3m-modal>
    </Provider>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'w3m-modal': Partial<W3mModal>
    }
  }
}

export default MyApp
