import { useState, useEffect } from "react"
import { HeaderMenu } from './components/HeaderMenu.jsx'
import { Box } from './utiles/Box.jsx'
import './MyProducts.css'
import './utiles/Authenticator.jsx'



export default function MyProducts() {
  //Llamada a la API para obtener los productos del usuario
  const API_URL = 'http://127.0.0.1:8000/my/products?page=0'
  const [products, setProducts] = useState([])
  useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error('Data is not an array:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching invoices:', error);
        });
    }, [API_URL]);

  return (
    <>
      <HeaderMenu />
      <h1>Your products</h1>

      <div className="products-list">
        {products.map(product => (
          <a href={`/edit-product?id=${product.id}`} key={product.id}>
            <Box title={product.name} image={product.image} key={product.id} />
          </a>
        ))} 
      </div>
    </>
  )
}
