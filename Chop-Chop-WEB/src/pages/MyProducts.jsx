import React from "react"
import { HeaderMenu } from './components/HeaderMenu.jsx'
import './MyProducts.css'
import './utiles/Authenticator.jsx'



export default function MyProducts() {

  const token = localStorage.getItem('authToken'); // Cambia 'authToken' por el nombre de tu token
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decodifica el token JWT

  //Llamada a la API para obtener los productos del usuario
  // const [products, setProducts] = useState([])
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch('http://localhost:8000/api/myproducts')
  //     const data = await response.json()
  //     setProducts(data)
  //   }
  //   fetchProducts()
  // }, [])

  return (
    <>
      <HeaderMenu />
      <h1>{decodedToken.user_metadata?.name || ''}'s products</h1>
      <p>This are your products.</p>
    </>
  )
}
