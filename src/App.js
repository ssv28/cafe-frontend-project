import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dash from './pages/Dash';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Table from './pages/Table';
import Reservation from './pages/Reservation';
import Client from './pages/Client';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/admin" element={<Dash />} />
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/table" element={<Table />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/client" element={<Client />} />
            </Routes>
        </div>
    )
}

export default App
