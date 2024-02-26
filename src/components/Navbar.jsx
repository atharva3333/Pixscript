import { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase.config";
import { useNavigate } from "react-router-dom";
import PixscriptLogo from "../assets/pixscript-logo.svg";
// eslint-disable-next-line react/prop-types
const Navbar = ({ credits }) => {
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  
  const navigate = useNavigate();
  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithGoogle();
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully');
      // Redirect or update state as needed
    } catch (error) {
      console.error('Error signing out user', error);
    }
  };

 

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    if(!user){
      navigate("/");
    }
  }, [user]);
  return (
    <div className="container mt-8">
      <div className="flex justify-between items-center">
        <img src={PixscriptLogo} alt="logo" className="w-[200px]" />
        {!user && (
          <button
            onClick={handleSignIn}
            className="px-8 py-3 rounded-md font-bold bg-[#155724] text-white"
          >
            Sign Up
          </button>
        )}

        {user && (
          <div
            
            className="flex gap-4 items-center cursor-pointer"
          >
          <p>Available Credits : { credits }</p>
            <img
              className="rounded-full w-[40px]"
              src={user.photoURL}
              alt="user-profile"
            />
            <p className="hidden sm:block font-medium">{user.displayName}</p>

            <button
            onClick={handleSignOut}
            className="px-8 py-3 rounded-md font-bold bg-[#155724] text-white"
          >
            Sign Out
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
