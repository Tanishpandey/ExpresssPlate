import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import CompanyDashboard from '../src/pages/CompanyDashboard';
import IndividualDashboard from '../src/pages/IndividualDashboard';
import Checkout from '../src/pages/Checkout'
import Navbar from './components/Navbar'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true

function App() {

  return (
    <>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/individual-dashboard" element={<IndividualDashboard />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Routes>
    </>
  )
}

export default App;
