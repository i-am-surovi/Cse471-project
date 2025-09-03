// src/components/Navbar.jsx
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate()

  const {setShowRecruiterLogin} = useContext(AppContext)

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="cursor-pointer" />
        </Link>

        {isSignedIn ? (
          <div className="flex items-center gap-3">
              <>
                <Link to="/applications">Applied Jobs</Link>
                <p>|</p>
                <p className="max-sm:hidden">
                  Hi, {user.firstName} {user.lastName}
                </p>
                <Link
                  to="/profile"
                  className="ml-4 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  My Profile
                </Link>
              </>
            <UserButton />
          </div>
        ) : (
          // When not signed in
          <div className="flex gap-4 max-sm:text-xs items-center">
            <button
              onClick={()=> setShowRecruiterLogin(true)}
              className="text-gray-600">
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;