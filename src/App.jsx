import { BrowserRouter, Routes, Route} from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Dashboard from "./Pages/Dashboard"

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
