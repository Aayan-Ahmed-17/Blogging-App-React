import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({authText, userName = null}) => {
  return (
    <>
      <div className="bg-[#7749F8] text-white font-semibold py-1 flex justify-between px-16 items-center w-full fixed left-0 top-0 z-10">
        <h1 className="text-xl"><Link to={'/'}>Personal Blogging App</Link></h1>
      <div className="flex gap-4">
        <p><Link to={'/'}>home</Link></p>
        <p><Link to={'/Dashboard'}>Dashboard</Link></p>
        <p><Link to={'/Signup'}>Signup</Link></p>
        <p><Link to={'/Login'}>Login</Link></p>
        <p><Link to={'/Profile'}>Profile</Link></p>
      </div>
        <div className="flex gap-5 items-center">
          {userName && <a className="cursor-pointer tracking-tighter text-md font-normal">{userName.fullName}</a>}
          <a className="cursor-pointer font-bold text-lg"><Link to={`${authText ? '/signup' : '/login'}`}>{`${authText ? 'SignUp' : 'Login'}`}</Link></a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
