import React, { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUpUser } from '../configs/firebase/firebasemethods'

const Signup = () => {
  const [error, setError] = useState(false)

  const fullName = useRef()
  const email = useRef()
  const password = useRef()
 
  const navigate = useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault();
    
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
    <main className='bg-green-300 min-h-screen flex justify-center items-center'>
      <div className='max-w-[18rem] bg-red-200 pt-10 min-h-[21rem] box-border rounded-md'>
        <form className='flex flex-wrap gap-2 justify-center' onSubmit={handleRegistration}>
        {/* <input type="text" placeholder="First Name" className="min-h-8 text-sm px-2 rounded border border-gray-400 w-4/5 max-w-xs " ref={firstName}/> */}
        <input type="text" placeholder="Last Name" className="min-h-8 text-sm px-2 rounded border border-gray-400 w-4/5 max-w-xs" ref={fullName}/>
        <input type="email" placeholder="Email" className="min-h-8 text-sm px-2 rounded border border-gray-400 w-4/5 max-w-xs" ref={email}/>
        <input type="password" placeholder="Password" className="min-h-8 text-sm px-2 rounded border border-gray-400 w-4/5 max-w-xs" ref={password}/>
        {/* <input type="password" placeholder="Repeat Password" className="min-h-8 text-sm px-2 rounded border border-gray-400 w-4/5 max-w-xs ml-2" ref={repeatPassword}/> */}
        <br />
        <button type="submit" className='bg-indigo-500 text-white text-lg px-4 py-1 rounded-lg mt-2'>Signup</button>
        </form>
      </div>
    </main>
  )
}

export default Signup
