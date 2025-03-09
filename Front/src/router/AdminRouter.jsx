import { Route, Routes } from "react-router-dom"
import Auth from "../pages/Admin/Auth"
import User from "../pages/Admin/users/User"
import Blog from "../pages/Admin/users/blog/Blog"
import AdminLayout from "../layout/adminLayout/AdminLayout"

const user = { email: "pepe@milanesa.com" }

export function AdminRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    )
  }

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
      ) : (
        <>
          {["/admin", "/admin/blog"].map((path) => {
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Blog)}
            />
          })}
          <Route path="/admin/user" element={loadLayout(AdminLayout, User)} />
        </>
      )}
    </Routes>
  )
}
