import Header from "../components/Header.jsx"

import Routers from "../routes/Routers.jsx"

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Header />
            <main className="flex-grow">
                <Routers />
            </main>
        </div>
    )
}

export default Layout