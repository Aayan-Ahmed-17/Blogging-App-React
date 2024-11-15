import React from 'react'

const Header = ({title}) => {
  return (
    <div className='bg-white text-3xl font-bold px-28 py-5 fixed top-9 left-0 w-full border-b-2 border-slate-400'>
     <h1 className='text-3xl text-[#343A40] font-semibold'>{title}</h1> 
    </div>
  )
}

export default Header
