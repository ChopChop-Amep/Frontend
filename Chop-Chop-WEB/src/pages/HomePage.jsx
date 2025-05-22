import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Box } from "./utiles/Box.jsx";
import LoadingAnimation from "./utiles/LoadingAnimation.jsx";
import { HeaderMenu } from "./components/HeaderMenu.jsx";
import Characteristics from "./components/Characteristics.jsx";


function HomePage() {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_URL = "http://127.0.0.1:8000/products?page=0&min_price=0";
  
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const API_URL_POPULAR = "http://127.0.0.1:8000/products?page=0&rating=3&min_price=0"

  useEffect(() => {
    fetch(API_URL_POPULAR)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  }, []);


  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProducts = getRandomProducts(products, 5);

  return (
    <>
      <HeaderMenu />
      <ul className="container-home-page">
        <Characteristics />
        <br />
        {loading ? (
          <LoadingAnimation />
        ) : (
          <span >
            <main className="products-shown">
              {randomProducts.map((product) => (
                <div key={product.id}>
                  <a href={`/product?id=${product.id}`}>
                    <Box title={product.name} image={product.image} />
                  </a>
                </div>
              ))}
            </main>
            <hr className="line" />
            <h2 className="popular-products">Popular Products</h2>
            <div className="products-shown">
              {popularProducts.slice(0, 5).map((product) => (
                <div key={product.id}>
                  <a href={`/product?id=${product.id}`}>
                    <Box title={product.name} image={product.image} />
                    <p style={{ color: "yellow" }}>★ {product.rating}</p>
                  </a>
                </div>
              ))}
            </div>
          </span>
        )}
      </ul>
    </>
  );
}

export default HomePage;
