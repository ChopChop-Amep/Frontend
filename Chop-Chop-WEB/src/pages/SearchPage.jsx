import React from "react"
import { HeaderMenu } from "./components/HeaderMenu.jsx"
import { Box } from "./utiles/Box.jsx"
import { useEffect, useState } from "react"

function SearchPage() {
    const query = new URLSearchParams(window.location.search).get("query");
    const API_URL = 'http://127.0.0.1:8000/products?query=' + query

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            setProducts(Array.isArray(data) ? data : [data]);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    }, [API_URL]);

    return (
        <main>
            <HeaderMenu />
            <h1>Search Results</h1>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <div className="spinner" />
                    <style>
                        {`
                        .spinner {
                            width: 48px;
                            height: 48px;
                            border: 6px solid #ccc;
                            border-top: 6px solid #0078d4;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                        }
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                        `}
                    </style>
                </div>
            ) : products.length > 0 ? (
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

export default SearchPage