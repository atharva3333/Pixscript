import { useEffect, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase.config";
import { useNavigate } from "react-router-dom";
import PixscriptLogo from "../assets/pixscript-logo.svg";
const Navbar = () => {
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithGoogle();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
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
            onClick={toggleDropdown}
            className="flex gap-4 items-center cursor-pointer"
          >
            <img
              className="rounded-full w-[40px]"
              src={user.photoURL}
              alt="user-profile"
            />
            <p className="hidden sm:block font-medium">{user.displayName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
