import Header from './Header.js'

function Layout ({children}) {
    return (
        <div>
            <Header></Header>
            <main>{children}</main>
        </div>
    )

}

export default Layout