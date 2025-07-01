import ExploreOurProducts from "../components/ExploreOurProducts"
import ImageCarousel from "../components/Image Carousel"
import Navbar from "../components/Navbar"
import MeetTheOwner from '../components/MeetTheOwner'
import ContactUs from '../components/ContactUs'
import { Route, Routes } from "react-router-dom"
import Fans from "../components/Products/Fans"
import Footer from "../components/Footer"

function HomePage(){
  return (
    <>
      <ImageCarousel/>
      <ExploreOurProducts/>
      <MeetTheOwner/>
      <ContactUs/>
    </>
  )
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Products/Fans" element={<Fans/>} />
      </Routes>
      </div>
      <Footer/>
      
    </div>
  )
}

export default App;
