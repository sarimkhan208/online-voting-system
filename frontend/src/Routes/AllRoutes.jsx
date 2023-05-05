import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AdminSignin from '../pages/AdminSignin'
import AdminDashboard from '../pages/AdminDashboard'
import VoterSignup from '../pages/VoterSignup'
import VoterDashboard from '../pages/VoterDashboard'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='adminsignin' element={<AdminSignin/>} ></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>} ></Route>
        <Route path='/signup' element={<VoterSignup/>} ></Route>
        <Route path='/voterdashboard' element={<VoterDashboard/>} ></Route>
    </Routes>
  )
}

export default AllRoutes
