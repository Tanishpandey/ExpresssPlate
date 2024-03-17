import React, { useState } from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import loginBackground from '../imgs/login.jpeg'; // Import the image

export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const loginUser = async (e) => {
        e.preventDefault()
        const { email, password } = data
        try {
            const response = await axios.post('/login', {
                email,
                password
            });
    
            console.log('Login Response:', response.data); // Log the response data
    
            if (response.data.error) {
                toast.error(response.data.error)
            } else {
                // Redirect to the appropriate dashboard based on the user's role and _id
                if (response.data.isCompany) {
                    navigate(`/company-dashboard/`);
                } else {
                    navigate(`/individual-dashboard/`);
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('An error occurred during login.');
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <div style={{ backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={loginUser} style={{ padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <label style={{ fontWeight: 'bold', display: 'block' }}>Email</label>
                <input
                    type='email'
                    name='email'
                    placeholder="Enter Email...."
                    value={data.email}
                    onChange={handleInputChange}
                    style={{ borderRadius: '20px', padding: '10px', marginBottom: '20px', width: '300px', fontWeight: 'bold' }}
                />
                <label style={{ fontWeight: 'bold', display: 'block' }}>Password</label>
                <input
                    type='password'
                    name='password'
                    placeholder="Enter Password...."
                    value={data.password}
                    onChange={handleInputChange}
                    style={{ borderRadius: '20px', padding: '10px', marginBottom: '20px', width: '300px', fontWeight: 'bold' }}
                />
                <button type='submit' style={{ borderRadius: '50%', padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'block', margin: '0 auto' }}>Login</button>
                <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                    <a href="#" style={{ color: '#4CAF50' }}>Forgot Password</a>
                </div>
            </form>
        </div>
    )
}
