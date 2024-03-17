import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import signUpImage from '../imgs/signup.jpeg'; // Import the image

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        streetaddress: '',
        zipcode: '',
        isCompany: false, // Include isCompany in the data object
    });


    const handleToggle = () => {
        setData({ ...data, isCompany: !data.isCompany }); // Update isCompany in data
    };

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password, streetaddress, zipcode, isCompany } = data;
        try {
            const response = await axios.post('/register', {
                name, email, password, streetaddress, zipcode, isCompany
            });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({});
                toast.success('Registration successful. Welcome!');
                if (isCompany) {
                    navigate(`/company-dashboard`);
                } else {
                    navigate(`/individual-dashboard/`);
                }
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('An error occurred during registration.');
        }
    };

    return (
        <div style={{ backgroundImage: `url(${signUpImage})`, backgroundSize: 'cover', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '20%', maxWidth: '1200px', textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontFamily: 'Arial', fontSize: '32px', marginBottom: '20px' }}>Create Your Account</h1>
                <form onSubmit={registerUser}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <input type='text' style={{ borderRadius: '50px', padding: '10px', width: '300px' }} placeholder="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input type='email' style={{ borderRadius: '50px', padding: '10px', width: '300px' }} placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input type='password' style={{ borderRadius: '50px', padding: '10px', width: '300px' }} placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input type='text' style={{ borderRadius: '50px', padding: '10px', width: '300px' }} placeholder="Street Address" value={data.streetaddress} onChange={(e) => setData({ ...data, streetaddress: e.target.value })} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input type='text' style={{ borderRadius: '50px', padding: '10px', width: '300px' }} placeholder="Zip Code" value={data.zipcode} onChange={(e) => setData({ ...data, zipcode: e.target.value })} />
                        </div>

                        {/* Toggle button */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px' }}>Register as:</label>
                            <button type="button" style={{ borderRadius: '50px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }} onClick={handleToggle}>
                                {data.isCompany ? "Company" : "Individual"}
                            </button>
                        </div>
                        <button type="submit" style={{ borderRadius: '50px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
