import React from "react"
import { HeaderMenu } from "./components/HeaderMenu.jsx"
import { Box } from "./utiles/Box.jsx"
import { useEffect, useState } from "react"

export default function SearchPageCategory() {
    console.log("SearchPageCategory")
    const category = new URLSearchParams(window.location.search).get("category");
    const API_URL = 'http://127.0.0.1:8000/products?category=' + category

    console.log(category)

    const [products, setProducts] = useState([]);
      
    useEffect(() => {
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            setProducts(Array.isArray(data) ? data : [data]); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [API_URL])

    console.log(products)

    return (
        <main>
            <HeaderMenu />
            <h1>Search Results</h1>
            {products.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', justifyContent: 'center', margin: '1rem auto', maxWidth: '1200px' }}>
                    {products.map((product) => (
                        <a href={`/product?id=${product.id}`} key={product.id}>
                            <Box title={product.name} image={product.image} />
                        </a>
                    ))}
                </div>
            ) : (
                <>
                    <p style={{ textAlign: 'center', marginTop: '2rem' }}>No products found with the given name.</p>
                    <p style={{ textAlign: 'center', marginTop: '2rem' }}>Try searching for something else.</p>
                </>
            )}
        </main>
    );
}