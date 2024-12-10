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


  return (
    <>
      <h1> Welcome to the Product Page !!</h1>

      <Suspense fallback={<Loading/>}>

      <Product />

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
