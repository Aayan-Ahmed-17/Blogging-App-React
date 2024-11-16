import React, {useRef} from 'react'
import Header from '../components/Header'
import { loginUser } from '../configs/firebase/firebasemethods'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form'

const Login = () => {
  const email = useRef()
  const password = useRef()

  const navigate = useNavigate()
  const handleLogin = async () => {
    const result = await loginUser(email.current.value, password.current.value);
    if (result.success) {
        console.log(result)
        navigate('/dashboard');
    }
};

  return (
    // <main className='min-h-screen flex justify-center items-center'>
    //   <div className='max-w-[18rem] bg-red-200 pt-10 min-h-[21rem] box-border rounded-md'>
    //     <form className='flex flex-wrap gap-2 justify-center' onSubmit={handleLogin}>
    //     <input type="email" placeholder="Email" className="min-h-8 text-sm px-2 rounded border border-gray-400 w-4/5 max-w-xs" ref={email}/>
    //     <input type="password" placeholder="Password" className="min-h-8 text-sm px-2 rounded border border-gray-400 w-4/5 max-w-xs" ref={password}/>
    //     <br />
    //     <button type="submit" className='bg-indigo-500 text-white text-lg px-4 py-1 rounded-lg mt-2'>Signup</button>
    //     </form>
    //   </div>
    // </main>
    <Form name={"Login User"} onSubmitFunc={handleLogin} emailRef={email} passwordRef={password}/>
  )
}

export default Login
