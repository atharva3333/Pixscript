import Navbar from "../components/Navbar";
import Typewriter from "typewriter-effect";
import { MdOutlineSearch } from "react-icons/md";
import { useEffect } from "react";
import { useAuthState , useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase.config";
import { useNavigate } from "react-router-dom";
import DogsImage from "../assets/Dogs.jfif"
import '../styles.css'
const Homepage = () => {

  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const navigate = useNavigate();


  const handleSignIn = event => {
        event.preventDefault();
        signInWithGoogle();
    };

  useEffect(() => {
    if(user){
      navigate("/dashboard");
    }
  }, [user])
  return (
    <div className="container px-20 text-center">
    <div className=" -z-10 fixed top-0 left-0 w-full h-full pattern"></div>
      <Navbar />
      <div className="flex flex-col mx-auto justify-between max-w-[700px] items-center mt-10 ">
      <img src={DogsImage} className="w-[400px] rounded-md" alt="Dogs playing on a Beach"/>
      <div className="flex mt-10 justify-between py-2 border-2 border-opacity-80 border-[#155724] rounded-full">
        <p className="font-semibold text-left w-[700px] text-3xl mx-10">
          <Typewriter
            options={{
              strings: [
                "Dogs playing on a beach",
                "Aliens on Earth playing football",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </p>
        <span className="mx-10"><MdOutlineSearch  className="text-4xl text-[#155724]"/></span>
        </div>
      </div>
      <button onClick={handleSignIn} className="px-8 py-3 mt-8 rounded-md font-bold bg-[#155724] text-white">Get Started</button>
    </div>
  );
};

export default Homepage;
