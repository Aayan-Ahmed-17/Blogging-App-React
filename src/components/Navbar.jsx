import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../configs/firebase/firebasemethods";
import { auth } from "../configs/firebase/firebaseConfig";
import { Menu } from "lucide-react";
import HamburgerMenu from "./NavIcon";

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if(auth?.currentUser?.uid){
      getUserInfo("users", "uid", auth.currentUser.uid, setUserInfo)
    }
  }, []);

  return (
    <>
      <div className="bg-[#7749F8] text-white font-semibold py-3 flex justify-between px-16 items-center w-full fixed left-0 top-0 z-20">
        <h1 className="text-2xl">
          <Link to={"/"}>Personal Blogging App</Link>
        </h1>
        <div className="flex gap-5 items-center">
          {userInfo && (
            <p className="cursor-pointer tracking-wide text-md font-medium">
              <Link to={'/profile'}>{userInfo.firstName.toUpperCase()} {userInfo.lastName.toUpperCase()}</Link>
            </p>
          )}
          <HamburgerMenu />
        </div>
      </div>
    </>
  );
};

export default Navbar;
