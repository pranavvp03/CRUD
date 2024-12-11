import { useState } from 'react';
import { Routes, Route} from "react-router-dom";
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from "react-hot-toast"
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
   
    <Toaster position='top-center' toastOptions={{duration: 3000}}/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App
