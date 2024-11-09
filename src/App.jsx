import React from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Userblogs from './pages/Userblogs'

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Dashboard />
      <Home />
      <Login />
      <Profile />
      <Signup />
      <Userblogs />
    </>
  )
}

export default App
