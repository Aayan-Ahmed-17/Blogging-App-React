import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Blog from '../components/Blog'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db , auth} from '../configs/firebase/firebaseConfig';
import { getUserInfo } from '../configs/firebase/firebasemethods';

// const Userblogs = () => {
//   const [userBlogs, setUserBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userInfo, setUserInfo] = useState(null);
//   const { id } = useParams();
//   let time = new Date
//   let date = time.toDateString()

//   const getUserBlogs = async (uid) => {
//     try {
//       const blogsRef = collection(db, "blogs");
//       const q = query(blogsRef, where("uid", "==", uid));
//       const querySnapshot = await getDocs(q);
      
//       const blogs = [];
//       querySnapshot.forEach((doc) => {
//         blogs.push({ ...doc.data(), docid: doc.id });
//         // console.log(doc.data(), blogs)
//       });
      
//       setUserBlogs(blogs);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching user blogs:", error);
//       setLoading(false);
//     }
//   };

//   const getUserInfoLocal = async (uid) => {
//     try {
//       const blogsRef = collection(db, "users");
//       const q = query(blogsRef, where("uid", "==", uid));
//       const querySnapshot = await getDocs(q);
      
//       const info = [];
//       querySnapshot.forEach((doc) => {
//         info.push({ ...doc.data(), docid: doc.id });
//         console.log(doc.data(), info)
//       });
      
//       setUserInfo(info);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching user blogs:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // if(userInfo){

//       getUserInfoLocal(id)
//       console.log("Current userInfo state:", userInfo);
//     // }else{
//     //   console.log("not fetching")
//     // }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       getUserBlogs(id);
//     }
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <Header title={"< Back to all blogs"}/>
//       {(userInfo) ? <div className="flex justify-between mt-32 pr-16">
//       <h2 className=" text-2xl mb-2  ml-16 font-semibold">{`All from ${userInfo.firstName} ${userInfo.lastName}`}</h2>
//         <div className="w-3/5 mt-4">
//           {/* <h2 className='text-2xl mb-2 font-semibold'>My Blogs</h2> */}
//           {(userBlogs.length > 0 )?
//             userBlogs.map((e, i) => {
//               return (
//                 <Blog key={i} userName={userInfo.firstName + ' ' + userInfo.lastName} time={date} title={e.title} description={e.description} />
//               );
//             }) : <h1>No blogs Found</h1>}
//         </div>
//         <div className=' relative'>
//           <p className='text-sm mt-2 -mb-5 text-right text-[#152536] font-semibold tracking-tighter'>{userInfo.email}</p>
//           <p className='text-3xl my-5 text-right text-[#7749F8] tracking-wider'>{userInfo.fullName}</p>
//           <img src="../src/assets/images/profile-image1.png" alt="profile image" className='w-44 absolute right-0'/>
//         </div>
//       </div> : <h1 className='mt-[10rem]'>No data found</h1>}
//     </>
//   )
// }


const Userblogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // Changed initial state to null
  const { id } = useParams();
  
  // Get user info
  const getUserInfoLocal = async (uid) => {
    try {
      console.log("Fetching user info for UID:", uid); // Debug log
      
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log("No user found"); // Debug log
        setLoading(false);
        return;
      }

      // Since we expect only one user document, we can take the first one
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      console.log("Found user data:", userData); // Debug log
      
      setUserInfo(userData); // Set the user data directly, not in an array
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get user blogs
  const getUserBlogs = async (uid) => {
    try {
      console.log("Fetching blogs for UID:", uid); // Debug log
      
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ ...doc.data(), docid: doc.id });
      });
      
      console.log("Found blogs:", blogs); // Debug log
      setUserBlogs(blogs);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        console.log("Starting data fetch for ID:", id); // Debug log
        await getUserInfoLocal(id);
        await getUserBlogs(id);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Debug useEffect
  useEffect(() => {
    console.log("Current userInfo state:", userInfo);
  }, [userInfo]);

  if (loading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }
  
  if (!userInfo) {
    return <div className="mt-20 text-center">No user data found</div>;
  }

  return (
    <>
      <Navbar userName={userInfo}/>
      <Header title="< Back to all blogs" />
      <div className="flex justify-between mt-32 pr-16">
        <h2 className="text-2xl mb-2 ml-16 font-semibold">
          {`All from ${userInfo.firstName} ${userInfo.lastName}`}
        </h2>
        <div className="w-3/5 mt-14">
          {userBlogs && userBlogs.length > 0 ? (
            userBlogs.map((blog, index) => (
              <Blog
                key={blog.docid || index}
                userName={`${userInfo.firstName} ${userInfo.lastName}`}
                time={new Date().toDateString()}
                title={blog.title}
                description={blog.description}
                />
              ))
            ) : (
            <h1>No blogs Found</h1>
          )}
        </div>
        <div className="relative">
          <p className="text-sm mt-2 -mb-5 text-right text-[#152536] font-semibold tracking-tighter">
            {userInfo.email}
          </p>
          <p className="text-3xl my-5 text-right text-[#7749F8] tracking-wider">
            {`${userInfo.firstName} ${userInfo.lastName}`}
          </p>
          <img
            src="../src/assets/images/profile-image1.png"
            alt="profile image"
            className="w-44 absolute right-0"
          />
        </div>
      </div>
    </>
  );
};

  export default Userblogs