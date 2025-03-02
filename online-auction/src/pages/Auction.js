import React, { useState, useEffect } from 'react';

const Auction = () => {
  // State to store auction items, loading status, and error messages
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch auction items when the component is mounted
  useEffect(() => {
    // Fetch the JSON data from the public/data/items.json file
    fetch('/data/items.json')  // Make sure the file is in the 'public/data/' directory
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();  // Parse the response as JSON
      })
      .then((data) => {
        setItems(data.items);  // Set the items from JSON in state
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message || 'Something went wrong');
        setLoading(false);  // Set loading to false after error
      });
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Display loading indicator while data is being fetched
  if (loading) {
    return <div>Loading auction items...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return (
      <div>
        <h2>Error fetching auction items!</h2>
        <p>{error}</p>
        {/* Optionally, add a retry button */}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Display a message when no items are available
  if (items.length === 0) {
    return <div>No auction items available at the moment.</div>;
  }

  return (
    <div>
      <h1>Auction Items</h1>
      <div className="auction-items">
        {items.map((item) => (
          <div key={item.id} className="auction-item">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auction;
