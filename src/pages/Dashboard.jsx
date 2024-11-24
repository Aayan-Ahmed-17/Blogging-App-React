import React, { useRef, useState , useEffect } from 'react'
import { deleteData, editData, getData, logoutUser , sendData , getUserInfo} from '../configs/firebase/firebasemethods'
import { useNavigate } from 'react-router-dom';
import { auth } from '../configs/firebase/firebaseConfig';
import Blog from '../components/Blog';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [data, setData] = useState([])
  const [dbDocId, setDbDocId] = useState(null);
  const [loading, setLoading] = useState()
  const [mode, setMode] = useState("modify")
  const [userInfo, setUserInfo] = useState()

  const title = useRef()
  const description = useRef()

  useEffect(()=>{
    getUserInfo("users", "uid", auth.currentUser.uid, setUserInfo)
  }, [])

  const navigate = useNavigate()

  //* logic to logout user 
  const handleLogout = async () => {

    //* logoutUser() returns object
    const result = await logoutUser();
    if (result.success) {
        navigate('/login');
        console.log(result)
    } else {
        console.log(result.error);
      }
    };
    
    //* Logic to store blog in firestore
    const handleSendData = async (event) => {
      event.preventDefault();
      let obj = {
        title: title.current.value,
        description: description.current.value,
        uid: auth.currentUser.uid,
      }
      const result = await sendData("blogs", obj, setLoading, setData)
      if (result.success){
        console.log(result.message)
      } else {
        console.log(result.error);
      }
    }
    
    useEffect(() => {
      getData("blogs", "uid", auth.currentUser.uid, setData)
      console.log("Data updated:", data);
      console.log(data)
    }, []);

    const handleDeleteBlog = async(docid) => {
      let result = await deleteData("blogs", docid.docid)
      data.splice(docid.index, 1)
      setData([...data])
      console.log(result)
    }

    
  return (
    <div className='bg-[#f8f9fa] min-h-screen'>
    {/* <h1>Dashboard</h1>
    <button type="button" onClick={handleLogout}>Logout</button> */}
    <Navbar />
    <Header title={"Dashboard"}/>
    <div className='grid place-items-center'>

    <div className='bg-white shadow-lg w-3/5 -ml-12 px-28 py-8 mt-36'>
      <form onSubmit={handleSendData} className='flex flex-col gap-4 justify-center items-center'>
        <input type="text" placeholder="title [25-50]" minLength={5} maxLength={50} className="input input-bordered w-full rounded" ref={title}  required/>
        <textarea className="textarea textarea-bordered min-h-44 max-h-72 w-full rounded" minLength={5} placeholder="What is in your mind? [ 100 > ]" ref={description} required></textarea>

        <button type='submit' className="btn btn-primary self-start" > {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Publish Blogs'}</button>
      </form>
    </div>

    <div className='w-3/5 mt-4'>

      <h2 className='text-2xl mb-2 font-semibold'>My Blogs</h2>
      {data.length > 0 && data.map((e , i)=> {
        return <Blog key={i} title={e.title} description={e.description} mode={mode} dbDocId={dbDocId} setDbDocId={setDbDocId} docId={e.docid} e={e} index={i} handleDeleteBlog={handleDeleteBlog}/>
      }
    )}
    </div>
    </div>
      
    </div>
  )
}

export default Dashboard
