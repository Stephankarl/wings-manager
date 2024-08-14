import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import NavigationMenu from './NavigationMenu'
import ProfilePage from '../pages/ProfilePage'
import AddContract from './contracts/AddContract'
import ContractPage from '../pages/ContractPage'
import TestPage from '../pages/TestPage'

export default function AppRouter() {
  return (
    <Routes>
        <Route element={<NavigationMenu />}>
            <Route path="/" element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/testPage' element={<TestPage />} />
        </Route>
        <Route path='/contract' element={<NavigationMenu />}>
            <Route path='new' element={<AddContract />} />
            <Route path=':id' element={<ContractPage />} />
            <Route path=':id/edit' element={<AddContract />} />
        </Route>
    </Routes>
  )
}
