import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = ({title}) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    if (title === '< Back to all blogs') {
      navigate(-1);
    }
  };
  return (
    <div className='bg-white text-3xl font-bold px-16 py-5 fixed top-9 left-0 w-full border-b-2 border-slate-400 z-10'>
     <a className={`cursor-pointer text-3xl ${title == "< Back to all blogs" ? "text-[#7749F8]" : "text-[#343A40]"} font-semibold`} onClick={handleTitleClick}>{title}</a>
    </div>
  )
}

export default Header
