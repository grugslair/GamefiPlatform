import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../store/index'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { notification } from 'antd'

config.autoAddCss = false

notification.config({
  maxCount: 5,
  duration: 1000000,
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
