import { Route, Routes, } from "react-router-dom"
import Home from "../pages/web/Home"
import ClientLayout from "../layout/clientLayout/ClientLayout"

export function WebRouter() {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }
    return (
        <Routes>
            <Route path="/" element={loadLayout(ClientLayout, Home)} />
        </Routes>
    )
}


