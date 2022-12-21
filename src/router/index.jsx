import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Cabins from '../pages/Cabins'
import Reservations from '../pages/Reservations'
import Login from '../pages/Login'
import { useSelector } from 'react-redux'
import Customers from '../pages/Customers'
import Settings from '../pages/Settings'

const Router = () => {
  const authState = useSelector((state) => state.auth)
  const isAuth = authState.accessToken;
  return (
    <Routes>
      {isAuth &&
        <>
          <Route path="/" element={<Navigate to="/reservations" replace />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/cabins" element={<Cabins />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
        </>
      }
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
  )
}

export default Router