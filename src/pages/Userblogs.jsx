import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Blog from '../components/Blog'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db , auth} from '../configs/firebase/firebaseConfig';
import { getUserInfo } from '../configs/firebase/firebasemethods';

const Userblogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState()
  const { id } = useParams();

  const getUserBlogs = async (uid) => {
    try {
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ ...doc.data(), docid: doc.id });
      });
      
      setUserBlogs(blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      setLoading(false);
    }
  };

  useEffect(()=>{
    getUserInfo("users", "uid", auth.currentUser.uid, setUserInfo)
  }, [])

  useEffect(() => {
    if (id) {
      getUserBlogs(id);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Header title={"< Back to all blogs"}/>
      {userInfo && <div className="flex justify-between mt-32 pr-16">
      <h2 className=" text-2xl mb-2 -mt-7 ml-16 font-semibold">{`All from ${userInfo.fullName}`}</h2>
        <div className="w-3/5 mt-4 -ml-16">
          {/* <h2 className='text-2xl mb-2 font-semibold'>My Blogs</h2> */}
          {userBlogs.length > 0 &&
            userBlogs.map((e, i) => {
              return (
                <Blog key={i} title={e.title} description={e.description} />
              );
            })}
        </div>
        <div className=' relative'>
          <p className='text-sm mt-2 -mb-5 text-right text-[#152536] font-semibold tracking-tighter'>{userInfo.email}</p>
          <p className='text-3xl my-5 text-right text-[#7749F8] tracking-wider'>{userInfo.fullName}</p>
          <img src="../src/assets/images/profile-image1.png" alt="profile image" className='w-44 absolute right-0'/>
        </div>
      </div>}
    </>
  )
}

export default Userblogs
