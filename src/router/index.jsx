import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cabins from '../pages/Cabins'
import Reservations from '../pages/Reservations'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Reservations />} />
      <Route path="/cabins" element={<Cabins />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router