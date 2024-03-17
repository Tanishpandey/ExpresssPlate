import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component

export default function IndividualDashboard() {
    const [dashboards, setDashboards] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/menus');
                const data = response.data.reverse().slice(0, 5); // Reverse the array and take the first 5 items
                setDashboards(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="individual-dashboard">
            {dashboards.map((dashboard, index) => (
                <Link key={index} to={`/checkout/${dashboard._id}`}>
                    <CompanyDashboard dashboardData={dashboard} />
                </Link>
            ))}
        </div>
    );
}

function CompanyDashboard({ dashboardData }) {
    const { companyName, closingTime, menuItems } = dashboardData;
    const [error, setError] = useState('');

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h1>{companyName} Dashboard</h1>
                <p>Closing Time: {closingTime}</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="menu-items">
                    {menuItems.map((item, index) => (
                        <div key={index} className="menu-item">
                            <h3>{item.itemName}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
