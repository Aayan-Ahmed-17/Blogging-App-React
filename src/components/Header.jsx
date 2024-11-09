import React from 'react'

const Header = ({title}) => {
  return (
    <div className='bg-white text-gray-800 text-3xl font-bold px-16 py-4'>
     <h1>{title}</h1> 
    </div>
  )
}

export default Header
