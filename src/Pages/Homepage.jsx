import Navbar from "../components/Navbar";
import Typewriter from "typewriter-effect";
import { MdOutlineSearch } from "react-icons/md";
import { useEffect } from "react";
import { useAuthState , useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase.config";
import { useNavigate } from "react-router-dom";

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
      <Navbar />
      <div className="flex mx-auto justify-between max-w-[700px] items-center mt-20 py-2 border-2 border-opacity-80 border-[#155724] rounded-full">
        <p className="font-semibold text-3xl mx-10">
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
      <button onClick={handleSignIn} className="px-8 py-3 mt-20 rounded-md font-bold bg-[#155724] text-white">Get Started</button>
    </div>
  );
};

export default Homepage;
