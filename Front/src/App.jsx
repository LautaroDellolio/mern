import { BrowserRouter } from "react-router-dom"
import { AdminRouter } from "./router/AdminRouter"
import { WebRouter } from "./router/WebRouter"


function App() {
  return (
    <BrowserRouter>
      <WebRouter />
      <AdminRouter />
    </BrowserRouter>
  )
}

export default App
