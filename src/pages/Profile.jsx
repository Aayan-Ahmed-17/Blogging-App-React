import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-8">
      <Navbar />
      <Header title={"Profile"} />
      {/* <div className="bg-white grid place-items-center"> */}
        <div className="w-3/5 bg-white min-h-[35rem] min-w-96 ml-32 p-5 mt-36 shadow-lg">
          <img src="../src/assets/images/profile-image1.png" alt="profile image" className="w-1/4 mb-11"/>
          <p className="text-2xl font-semibold mb-3">Inzamam Malik</p>
          <p className="text-2xl font-semibold">Password</p>
          <form className="grid gap-2 mt-4">

          <input type="password" placeholder="Old Password" className="input input-bordered max-w-72 min-w-64 rounded" required/>
          <input className="input input-bordered max-w-72 min-w-64 rounded" placeholder="New Password" required/>
          <input className="input input-bordered max-w-72 min-w-64 rounded" placeholder="Repeat Password" required/>
          </form>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Profile;
