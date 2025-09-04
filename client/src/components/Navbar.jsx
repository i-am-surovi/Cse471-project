import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  //whenever user is logged in below fun will give user data
  const { user } = useUser();

  const navigate = useNavigate();

  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="w-[50px] h-auto 
            sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[150px] cursor-pointer max-w-full"
        />
        {user ? (
          <div className="flex gap-3 items-center">
            <Link to={"/applications"}>Applied Jobs</Link>
            <p> | </p>
            <p className="max-sm:hidden">
              Hii, {user.firstName + " " + user.lastName}
            </p>
            <UserButton></UserButton>
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 cursor-pointer"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer"
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
