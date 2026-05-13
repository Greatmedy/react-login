import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendURL } from '../App';

const Login = ({ setToken }) => {

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!isLoginMode) {
                // Validate passwords match
                if (password !== confirmPassword) {
                    toast.error('Passwords do not match');
                    return;
                }
                const response = await axios.post(`${backendURL}/api/user/register`, {
                    name,
                    email,
                    password
                });
                if (response.status === 201) {
                    setToken(response.data.token);
                    toast.success(response.data.message);
                } else {
                    toast.error(`Registration failed: ${response.data.message}`);
                }
                
            } else {
                const response = await axios.post(`${backendURL}/api/user/login`, {
                    email,
                    password
                });
                if (response.status === 200) {
                    setToken(response.data.token);
                    toast.success(response.data.message);
                } else {
                    toast.error(`Login failed: ${response.data.message}`);
                }
            }
        } catch (error) {
                console.error('Error submitting form:', error);
                toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
            }
            // Handle form submission logic here
        };
    return (
        <div className="w-[430px] bg-white p-9 rounded-2xl shadow-lg">
            {/* Header title */}
            <div className='flex justify-center mb-4'>
                <h2 className='text-3xl font-semibold text-center'>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
            </div>
            {/* Tab controls */}
            <div className='relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden'>
                <button onClick={()=> setIsLoginMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? 'text-white' : 'text-black'}`}>
                    Login
                </button>
                <button onClick={()=> setIsLoginMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? 'text-white' : 'text-black'}`}>
                    Sign Up
                </button>
                <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 viaa-cyan-600 to-cyan-200 ${isLoginMode ? 'left-0' : 'left-1/2'}`}></div>
            </div>
                {/* Form section */}
                <form className='space-y-4' onSubmit={handleFormSubmit}>
                    {!isLoginMode && (
                        <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required className='w-full p-3 border-b-2 border-gray-300 outline-nonefocus:border-cyan-500 placeholder-gray-400' />
                    )}
                    {/* shared fields */}
                    <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required className='w-full p-3 border-b-2 border-gray-300 outline-nonefocus:border-cyan-500 placeholder-gray-400' />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required className='w-full p-3 border-b-2 border-gray-300 outline-nonefocus:border-cyan-500 placeholder-gray-400' />
                    {/* Sign up field */}
                    {!isLoginMode && (
                        <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className='w-full p-3 border-b-2 border-gray-300 outline-nonefocus:border-cyan-500 placeholder-gray-400' />
                    )}
                    {/* Forget password for login field */}
                    {isLoginMode && (
                        <div className='text-right'>
                            <p className='tect-cyan-600 hover:underlione'>Forgot password?</p>
                        </div>
                    )}
                    {/* shared fields */}
                    <button type='submit' className='w-full p-3 bg-gradient-to-r from-blue-700 viaa-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition'>
                        {isLoginMode ? 'Login' : 'Sign Up'}
                        </button>
                    {/* switch mode */}
                    <p className='text-center text-gray-600'>
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                        <a href='#' onClick={(e) => {e.preventDefault(); setIsLoginMode(!isLoginMode)}} className='text-cyan-600 hover:underline'>
                            {isLoginMode ? 'Sign Up' : 'Login'}
                        </a>
                    </p>

                </form>
        </div>
    )
}

export default Login;