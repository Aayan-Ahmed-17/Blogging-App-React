import React, {useRef} from 'react'
import Header from '../components/Header'
import { loginUser } from '../configs/firebase/firebasemethods'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import Navbar from '../components/Navbar'

const Login = () => {
  const email = useRef()
  const password = useRef()

  // const Email = email.current.valu

  const navigate = useNavigate()
  const handleLogin = async () => {
    const result = await loginUser(email.current.value, password.current.value);
    if (result.success) {
        console.log(result)
        navigate('/dashboard');
    }
};

  return (
    <>
    <Navbar authText='Sign Up' />
    <Form name={"Login User"} onSubmitFunc={handleLogin} emailRef={email} passwordRef={password}/>
    </>
  )
}

export default Login
