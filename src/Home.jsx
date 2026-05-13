import React, { useEffect, useState } from 'react'
import { backendURL } from './App';
import axios from 'axios';

const Home = ({ setToken }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userData = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
           

            if (response.status === 200 && response.data?.user) {
                setUser(response.data.user);
            } else {
                setError('Unexpected response from server.');
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err.response?.data?.message || 'Failed to fetch user data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        userData();
    }, []);

    return (
        <div>
            <div className='w-[430px] bg-white p-9 rounded-2xl shadow-lg'>
                <h1 className='text-4xl font-bold text-center'>Welcome to the Home Page!</h1>
                <p className='text-center mt-4'>You have successfully logged in.</p>

                {loading && <p className='text-center mt-4'>Loading user data...</p>}
                {error && !loading && <p className='text-center mt-4 text-red-600'>{error}</p>}

                {user && !loading && (
                    <div className='mt-6 space-y-3'>
                        {Object.entries(user).map(([key, value]) => (
                            <div key={key} className='flex justify-between border-b pb-2'>
                                <span className='font-semibold text-gray-700'>{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className='text-gray-500'>{String(value)}</span>
                            </div>
                        ))}
                    </div>
                )}

                <button className='block mx-auto mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Go to Dashboard</button>
                <button className='block mx-auto mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600' onClick={() => setToken("")}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Home