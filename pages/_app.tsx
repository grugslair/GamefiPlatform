import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../store/index'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { notification } from 'antd'
import { RouteGuard } from 'core/routeGuard'
import Notification from 'core/notification'

config.autoAddCss = false

notification.config({
  maxCount: 5,
  duration: 3,
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Notification>
        <Layout>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </Layout>
      </Notification>
    </Provider>
  )
}

export default MyApp
