import Navbar from "../components/Navbar"
import { Route, Routes } from "react-router-dom"
import Fans from "../components/Products/Fans"
import Footer from "../components/Footer"
import Irons from "../components/Products/Irons"
import Switches from "../components/Products/Switches"
import Lights from "../components/Products/Lights"
import Pipes from "../components/Products/Pipes"
import Wires from "../components/Products/Wires"
import Register from "../components/Register"
import Login from "../components/Login"
import OrderGateway from "../components/OrderGateway"
import HomePage from '../components/HomePage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Products/Fans" element={<Fans/>} />
        <Route path="/Products/Irons" element={<Irons/>} />
        <Route path="/Products/Switches" element={<Switches/>} />
        <Route path="/Products/Lights" element={<Lights/>} />
        <Route path="/Products/Pipes" element={<Pipes/>} />
        <Route path="/Products/Wires" element={<Wires/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/OrderGateway" element={<OrderGateway/>} />
      </Routes>
      </div>
      <Footer/>
      
    </div>
  )
}

export default App;
