import { useEffect, useState } from "react";
import ImageQueryComponent from "../components/ImageGeneration"
import Navbar from "../components/Navbar"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase.config";
import { useNavigate } from "react-router-dom";
import '../styles.css'

const Dashboard = () => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [credits, setCredits] = useState(1);

  const updateCredits = (usedCredits) => {
    setCredits((prevCredits) => prevCredits - usedCredits);
  };

  useEffect(() => {
    if(!user){
      navigate("/");
    }
  }, [user])

  return (
    <div className="container px-20">
    <div className=" -z-10 fixed top-0 left-0 w-full h-full pattern"></div>
      <Navbar credits={credits}/>

      <ImageQueryComponent credits={credits} updateCredits={updateCredits}/>
    </div>
  )
}

export default Dashboard