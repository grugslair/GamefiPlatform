import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../store/index'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
  }, [])

  return(
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
