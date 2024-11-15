import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <div className="bg-red-400 min-h-screen pb-8">
      <Navbar />
      <Header title={"Profile"} />
      {/* <div className="bg-white grid place-items-center"> */}
        <div className="w-3/5 bg-orange-400 min-h-[35rem] ml-32 p-5 mt-36">
          <img src="../src/assets/images/profile-image1.png" alt="profile image" className="w-1/4 mb-11"/>
          <p className="text-2xl font-semibold mb-3">Inzamam Malik</p>
          <p className="text-2xl font-semibold">Password</p>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Profile;
