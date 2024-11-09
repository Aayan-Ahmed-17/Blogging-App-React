import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
      path: '',
      element: <Home />
    },
      {
      path: '/dashboard',
      element: <Dashboard />
    },
      {
      path: 'login',
      element: <Login />
    },
      {
      path: 'signup',
      element: <Signup />
    },
      {
      path: 'profile',
      element: <Profile />
    },
  ]
  }
])


createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
