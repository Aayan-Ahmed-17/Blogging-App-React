import React from 'react'
import { logoutUser } from '../configs/firebase/firebasemethods'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate()
  const handleLogout = async () => {
    const result = await logoutUser();
    // setLoading(false);
    
    if (result.success) {
        navigate('/login');
    } else {
        setError(result.error);
    }
};

  return (
    <>
    <h1>
      Dashboard
    </h1>
    <button type="button" onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Dashboard
