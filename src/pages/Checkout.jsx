import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
  const { id } = useParams(); // Retrieve the id parameter from the route
  const [data, setData] = useState(null); // State to store the fetched data

  useEffect(() => {
    // Fetch data based on the id parameter
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/menus/${id}`);
        setData(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [id]); // Include id in the dependency array to refetch data when id changes

  // Render loading state while data is being fetched
  if (!data) {
    return <div>Loading...</div>;
  }

  // Render the fetched data once available
  return (
    <div>
      {/* Display the fetched data here */}
      <h2>{data.itemName}</h2>
      <p>Quantity: {data.quantity}</p>
      <p>Price: ${data.price}</p>
    </div>
  );
}

export default Checkout;
