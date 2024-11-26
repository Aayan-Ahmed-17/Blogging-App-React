import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import { collection , addDoc , query, where, getDocs , doc, deleteDoc , updateDoc } from 'firebase/firestore';
import { db } from "../configs/firebase/firebaseConfig";
import { getAllData} from "../configs/firebase/firebasemethods";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useInRouterContext, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [mode, setMode] = useState('view');
  const [loading, setLoading] = useState(true);
  let time = new Date
  let date = time.toDateString()

  const navigate = useNavigate()

  useEffect(() => {
    getAllData("blogs", setData);
  }, []);

  
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (data.length > 0) {
        setLoading(true);
        try {
          // Create an array to store all user info
          let allUserInfo = [];
          
          // Process users one by one
          for (const blog of data) {
            const q = query(
              collection(db, "users"),
              where("uid", "==", blog.uid)
            );
            const querySnapshot = await getDocs(q);
            
            // Only add to allUserInfo if we found a matching user
            if (!querySnapshot.empty) {
              const userData = {
                ...querySnapshot.docs[0].data(),
                blogData: blog
              };
              allUserInfo.push(userData);
            }
          }
          
          setUserInfo(allUserInfo); // No need for spread operator here
          // console.log(data, allUserInfo);
        } catch (error) {
          console.error("Error fetching user info:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchUserInfo();
  }, [data]);
  
    // console.log(userInfo, data[0].uid)
  

  const handleUserRedirect = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Navbar />
      <Header title={"Home"} />
      <div className="grid place-items-center mt-32">
        {userInfo.length > 0 ? <div className="w-3/5 -ml-16 pt-4">
      <h2 className="place-self-start -ml-6 text-2xl mb-2 font-semibold">All Blogs</h2>
          {/* <h2 className='text-2xl mb-2 font-semibold'>My Blogs</h2> */}
          {userInfo.length > 0 &&
            userInfo.map((e, i) => {
              return (
                <Blog key={i} userName={`${e.firstName.toUpperCase()} ${e.lastName.toUpperCase()}`} time={date} mode={mode} title={e.blogData.title} description={e.blogData.description} handleUserRedirect={handleUserRedirect} e={e}/>
              );
            })}
        </div> : <h1 className="text-3xl font-bold mt-10">Loading....</h1>}
      </div>
    </div>
  );
};

export default Home;
