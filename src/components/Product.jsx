import React, { useEffect, useState, useRef } from 'react';

const Product = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Page state for pagination

  const boxRef = useRef(null); // Reference to the box element

  // Function to fetch data
  const fetchData = (page) => {
    setLoading(true); // Set loading state
    fetch(`https://fakestoreapi.com/products?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          setHasMore(false); // If no data is returned, stop further requests
        } else {
          setData((prevData) => [...prevData, ...res]); // Add new data to the existing state
        }
      })
      .finally(() => {
        setLoading(false); // Reset loading state after fetch is complete
      });
  };

  // Set up IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the box is in the viewport
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            // Trigger fetch if the box is in the viewport and we have more data to load
            setPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchData(nextPage); // Fetch data for the next page
              return nextPage; // Update the page
            });
          }
        });
      },
      { threshold: 1 } // Observe when 100% of the element is in the viewport
    );

    //Observing the box element 
    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    // cleanup of the observer 
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading]); // Dependencies: hasMore and loading state

  return (
    <div>
    
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              border: '5px solid whitesmoke',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              width: '50%',
            }}
          >
            <img src={item.image} alt={item.title} style={{ width: '100%' }} />
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
              {item.title}
            </p>
            <p>{item.description}</p>
            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>${item.price}</p>
          </div>
        ))}
      </div>

      {/* This is the element we observe */}
      <div
        ref={boxRef}
        style={{
          width: '100%',
          height: '100px',
          backgroundColor: 'grey',
          marginTop: '20px',
        }}
      >
        {loading && <p>Loading more products...</p>}
        {!hasMore && <p>No more products to load.</p>}
      </div>
    </div>
  );
};

export default Product;

