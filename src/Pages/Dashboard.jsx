import ImageQueryComponent from "../components/ImageGeneration"
import Navbar from "../components/Navbar"


const Dashboard = () => {
  return (
    <div className="container px-20">
      <Navbar/>

      <ImageQueryComponent/>
    </div>
  )
}

export default Dashboard