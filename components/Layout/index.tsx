import dynamic from 'next/dynamic'
import Footer from './Footer'
// import Header from './Header'

const Header = dynamic(() => import('./Header'), {
  ssr: false
})

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  )
}