import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from '../src/pages/Home'
import ProtectRoute from '../src/middlewars/validateRoute'

export default function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route element= {<ProtectRoute/>}>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/success/:token' element={<Home/>}/>
            </Route>
            
        </Routes>
      </BrowserRouter>

    </>
  )
}


