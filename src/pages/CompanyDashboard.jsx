import React, { useState, useEffect } from "react";
import axios from 'axios';

const CompanyDashboard = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemName.trim() !== '' && quantity.trim() !== '' && price.trim() !== '') {
            const newItem = { itemName, quantity, price };
            setMenuItems([...menuItems, newItem]);
            setItemName('');
            setQuantity('');
            setPrice('');
        } else {
            setError('Please fill in all fields.');
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
        .then(response => {
            console.log('Menu items fetched successfully:', response.data);
            const { name } = response.data; // Extract the company name from response.data
            setCompanyName(name || 'Default Company Name'); // Set the company name state variable
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
            setError('Error fetching menu items. Please try again.');
        });
    }, []);

    // Function to handle posting menu items to the backend
    const handlePostMenu = () => {
        axios.post('/company-dashboard', {
            companyName,
            closingTime,
            menuItems
        })
        .then(response => {
            console.log('Menu posted successfully:', response.data);
            setMenuItems([]);
            setError('');
        })
        .catch(error => {
            console.error('Error posting menu:', error);
            setError('Error posting menu. Please try again.');
        });
    };

    return (
        <div style={{
            backgroundImage: `url('https://media.wbur.org/wp/2023/08/FGTB-3000x2000-Community-1920x1280.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            padding: '20px'
        }}>
            <h1>{companyName} Dashboard</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add Item</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handlePostMenu} style={styles.button}>Post Menu</button>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <span>{item.itemName}</span> - <span>{item.quantity}</span> - <span>${item.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    input: {
        width: '80%',
        maxWidth: '300px',
        padding: '10px',
        margin: '5px',
        borderRadius: '20px',
        border: 'none',
        outline: 'none',
    },
    button: {
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
    }
}

export default CompanyDashboard;
