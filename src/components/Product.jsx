import React from 'react'

const Product = ({product}) => {
  return (
    
    <>
    <div style={{display:'flex', alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                {product.map((product)=>(
                  <div style={{
                    border: '5px solid whitesmoke', // Proper border style
                    padding: '10px', // Add some padding for spacing
                    marginBottom: '15px', // Add space between each product block
                    borderRadius: '8px', // Rounded corners
                    backgroundColor: '#f9f9f9', // Light background for each product card
                    width:'50%'
                    }} 
                    key={product.id}
                    >

                      <div style={{margin:5, padding:2}}>
                           <img src={product.image_link} alt="" />
                          
                    <p style={{  color: 'black', fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                      {product.name}
                    </p>
                      </div >
                      <p style={{color:'black'}}>{product?.description}</p>
                    <p style={{ fontSize: '16px', color: '#333', fontWeight: 'bold' }}>
                      ${product.price}
                    </p>
                    </div>
                ))}
      </div>
    </>
  )
}

export default Product