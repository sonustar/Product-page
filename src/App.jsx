import { useEffect, useState ,Suspense, lazy} from 'react'
import axios from "axios"
import './App.css'



const Product = lazy(() => delayForDemo(import('./components/Product.jsx')));

async function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

function App() {
  const [ product , setProduct] = useState([])
  
  useEffect(()=>{
    
    const fetchData = async () => {
      
      await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline").then((response)=>{
        console.log(response.data)
        setProduct(response.data)
      })
      
    }
    
    
    
    fetchData();
    
  },[])
  
  return (
    <>
      <h1> Welcome to the Product Page !!</h1>

      <Suspense fallback={<Loading/>}>

         <Product product={product} />
     </Suspense>
    </>
  )
}

function Loading(){
  return(
    <h1> Loading .. 🔥🔥 </h1>
  )
}

export default App
