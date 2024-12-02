import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom';
import './App.css'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/admin/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default App
