import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {BrowserRouter, Routes, Route} from "react-router-dom"

import './index.css'

import Navbar from './landing_Page/Navbar.jsx'
import Footer from './landing_Page/Footer.jsx'
import Home from './landing_Page/home/Home.jsx'
import BecomeApartner from './landing_Page/becomeapartner/BecomeApartner.jsx'
import MyBookingPage from './landing_Page/mybookings/MyBookingPage.jsx'
import Login from './landing_Page/Login.jsx'
import Signup from './landing_Page/Signup.jsx'
import NotFound from './landing_Page/NotFound.jsx'
import SupportPage from './landing_Page/support/Support.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/support" element={<SupportPage/>}/>
    <Route path="/becomeapartner" element={<BecomeApartner/>}/>
    <Route path="/mybookings" element={<MyBookingPage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="*" element={<NotFound/>}/>
   
  </Routes>
  <Footer/>
  </BrowserRouter>
)
