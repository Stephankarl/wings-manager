import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

export default function AppRouter() {
  return (
    <Routes>
        <Route>
            <Route path="/" element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
        </Route>
    </Routes>
  )
}
