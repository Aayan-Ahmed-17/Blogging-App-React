import React from "react";
import { Link } from "react-router-dom";

const Navbar = (isLoggedIn) => {
  return (
    <>
      <div className="bg-[#7749F8] text-white font-semibold py-1 flex justify-between px-16 items-center w-full fixed left-0 top-0">
        <h1 className="text-xl">Personal Blogging App</h1>
        <h3>SignUp</h3>
      </div>
      <div className="flex gap-4">
        <p><Link to={'/'}>home</Link></p>
        <p><Link to={'/Dashboard'}>Dashboard</Link></p>
        <p><Link to={'/Signup'}>Signup</Link></p>
        <p><Link to={'/Login'}>Login</Link></p>
        <p><Link to={'/Profile'}>Profile</Link></p>
      </div>
    </>
  );
};

export default Navbar;
