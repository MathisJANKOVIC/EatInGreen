import { Route, Routes, BrowserRouter } from "react-router-dom"
import Register from "./screens/Register"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
