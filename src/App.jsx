import React, { useEffect } from 'react'
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Home from './Home';


export const backendURL = "https://server-login-wjv8.onrender.com";

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
    setToken(token);
  }, [token]);

  return (
    <div className='grid w-[100%] h-screen place-items-center bg-cyan-400'>
      <ToastContainer />
      {!token ? <Login setToken={setToken} /> : <Home setToken={setToken} />}
    </div>
  )
}

export default App;