import React, { useEffect } from 'react'
import Blog from '../components/Blog'
import { getAllData } from '../configs/firebase/firebasemethods'

const Home = () => {

  useEffect(()=>{
    getAllData("blogs")
  }, [])

  return (
    <>
    <h1>
      Home
    </h1>
    </>
  )
}

export default Home
