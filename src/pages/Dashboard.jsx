import React, { useRef, useState , useEffect } from 'react'
import { getData, logoutUser , sendData} from '../configs/firebase/firebasemethods'
import { useNavigate } from 'react-router-dom';
import { auth } from '../configs/firebase/firebaseConfig';

const Dashboard = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState()

  const title = useRef()
  const description = useRef()

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
        uid: auth.currentUser.uid
      }
      const result = await sendData("blogs", obj, setLoading, setData)
      if (result.success){
        console.log(result.message)
      } else {
        console.log(result.error);
      }
    }
    
    useEffect(() => {
      getData("blogs", "uid", auth.currentUser.uid)
      console.log("Data updated:", data);
    }, [data]);


  return (
    <>
    <h1>
      Dashboard
    </h1>
    <button type="button" onClick={handleLogout}>Logout</button>
    <form onSubmit={handleSendData} className='flex flex-col gap-4 justify-center items-center'>
        <input type="text" placeholder="title [25-50]" minLength={5} maxLength={50} className="input input-bordered w-full max-w-xs" ref={title}  required/>
        <textarea className="textarea textarea-bordered w-[20rem]" minLength={5} placeholder="What is in your mind? [ 100 > ]" ref={description} required></textarea>

        <button type='submit' className="btn btn-primary" > {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Publish Blogs'}</button>
      </form>
    </>
  )
}

export default Dashboard
