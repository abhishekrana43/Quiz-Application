import React from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import Signup from './components/SignUp'
import MyResult from './components/MyResult'

// private protected route

function RequiredAuth({children}){
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  if(!isLoggedIn){
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return children;
}
const App = () => {
  return (
    <Routes>
     <Route path='/' element={<HomePage />} />
     
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />

     <Route 
     path='/results'
     element ={
     <RequiredAuth>
     <MyResult />
     </RequiredAuth>

     } />
    </Routes>
  )
}

export default App
