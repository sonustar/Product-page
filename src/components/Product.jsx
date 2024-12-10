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
    fetch(`https://randomuser.me/api?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.results.length === 0) {
          setHasMore(false); // If no data is returned, stop further requests
        } else {
          setData((prevData) => [...prevData, ...res.results]); // Add new data to the existing state
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
        console.log(entries)
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

  useEffect(() => {
    console.log(data); // Logs the data whenever it's updated
  }, [data]);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {data.map((item) => (
          <div
            key={item.login.uuid} // Use unique UUID for key
            style={{
              border: '5px solid whitesmoke',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              width: '50%',
            }}
          >
            <img src={item.picture.thumbnail} alt={`${item.name.first} ${item.name.last}`} style={{ width: '100%' }} />
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
              {item.name.title} {item.name.first} {item.name.last}
            </p>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: 'black' }}>{item.email}</p>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: 'black' }}>{item.location.city}, {item.location.country}</p>
          </div>
        ))}
      </div>

      <div
        ref={boxRef}
        style={{
          width: '100%',
          height: '100px',
          marginTop: '20px',
        }}
      >
        {loading && <Loading />}
        {!hasMore && <p>No more users to load.</p>}
      </div>
    </div>
  );
};

function Loading() {
  return <h1>Loading .. 🔥🔥</h1>;
}

export default Product;
