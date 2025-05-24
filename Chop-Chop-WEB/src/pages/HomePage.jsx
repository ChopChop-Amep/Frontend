import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Box } from "./utiles/Box.jsx";
import LoadingAnimation from "./utiles/LoadingAnimation.jsx";
import { HeaderMenu } from "./components/HeaderMenu.jsx";
import Characteristics from "./components/Characteristics.jsx";

const API_URL = "http://127.0.0.1:8000/products?page=0&min_price=0";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data))
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
      <Characteristics />
      <br />
      {loading ? (
        <LoadingAnimation />
      ) : (
        <main
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1rem",
            justifyContent: "center",
            margin: "1rem auto",
            maxWidth: "1200px",
          }}
        >
          {randomProducts.map((product) => (
            <a href={`/product?id=${product.id}`} key={product.id}>
              <Box title={product.name} image={product.image} />
            </a>
          ))}
        </main>
      )}
      <hr className="line" />
      {/* Productos mejor valorados */}
    </>
  );
}

export default HomePage;
