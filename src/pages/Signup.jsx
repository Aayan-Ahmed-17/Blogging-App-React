import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  // use ref
  const fullName = useRef()
  const email = useRef()
  const password = useRef()
  // const profilePic = useRef()

  // use navigate
  const navigate = useNavigate()

  const registerUser = (event) => {
    event.preventDefault();


    // signUpUser({
    //   email: email.current.value,
    //   password: password.current.value,
    //   fullname: fullName.current.value
    // }).then((res) => {
    //   console.log(res)
    //   navigate('/login');

    // }).catch((err) => {
    //   console.log(err)
    // })
  }

  return (
    <main className='bg-green-300 min-h-screen flex justify-center items-center'>
      <div className='max-w-[18rem] bg-red-200 pt-10 min-h-[21rem] box-border rounded-md'>
        <form className='flex flex-wrap gap-2 justify-center' onSubmit={registerUser}>
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
