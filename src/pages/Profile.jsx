import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import {
  changePassword,
  getUserInfo,
} from "../configs/firebase/firebasemethods";
import { auth } from "../configs/firebase/firebaseConfig";
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle2 } from "lucide-react";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  // const newPassword = useRef()
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setCurrentUser(auth.currentUser.uid);
  }, []);

  useEffect(() => {
    getUserInfo("users", "uid", setUserInfo)
  }, []);

  useEffect(()=>{
    console.log(userInfo)
  }, [userInfo])

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const result = await changePassword(currentPassword, newPassword);

      if (result.success) {
        setSuccess("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8">
      <Navbar/>
      <Header title={"Profile"} />
      {/* <div className="bg-white grid place-items-center"> */}
      {currentUser ? (
        <div className="w-[40rem] bg-white min-h-[35rem] min-w-96 ml-32 p-5 mt-32 shadow-lg z-10">
          <img
            src="../src/assets/images/profile-image1.png"
            alt="profile image"
            className="w-1/4 mb-11"
          />
          {userInfo && <p className="text-xl font-semibold mb-6 -mt-8">{userInfo.firstName.toUpperCase()} {userInfo.lastName.toUpperCase()}</p>}
          <p className="text-2xl font-semibold">Password</p>

          {error && (
            <div className="alert alert-error">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <CheckCircle2 className="w-5 h-5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <div className="input-group flex">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="btn btn-square"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <div className="input-group flex">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="btn btn-square"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>
              <div className="input-group flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="btn btn-square"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="card-actions justify-end">
              <button
                type="submit"
                className={`btn btn-primary w-full ${
                  isLoading ? "loading" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Changing Password..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1>LOADING....</h1>
      )}
      {/* </div> */}
    </div>
  );
};

export default Profile;
