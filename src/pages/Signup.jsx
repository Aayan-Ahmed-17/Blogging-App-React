import React, { useRef, useState } from 'react'
import Form from '../components/Form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUpUser } from '../configs/firebase/firebasemethods'
import Navbar from '../components/Navbar'

const Signup = () => {
  const [error, setError] = useState(false)

  const fullName = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
 
  const navigate = useNavigate()

  const handleRegistration = async () => {
    
    const result = await signUpUser(email.current.value, password.current.value, fullName.current.value);
    
    // result is obj returned thr signUpUser func
    if (result.success) {
        console.log("User registered:", result);

        // Navigate to dashboard
        navigate('/dashboard');
    } else {
        //! Show error message to user
        setError(result.error);
    }
};

  return (
    <div className='-mt-8'>
    <Navbar authText='Login' />
    <Form name={"Register User"} onSubmitFunc={handleRegistration} emailRef={email} passwordRef={password} showConfirmPassword={true} confirmPasswordRef={confirmPassword}/>
    </div>
  )
}

export default Signup
