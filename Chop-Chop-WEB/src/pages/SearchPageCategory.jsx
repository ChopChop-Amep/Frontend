import { HeaderMenu } from "./components/HeaderMenu.jsx"
import { Box } from "./utiles/Box.jsx"
import LoadingAnimation from "./utiles/LoadingAnimation.jsx"
import { useEffect, useState } from "react"

function SearchPageCategory() {
    const category = new URLSearchParams(window.location.search).get("category");
    const API_URL = `http://127.0.0.1:8000/products?category=${category}`

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setProducts(Array.isArray(data) ? data : [data]);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            setProducts([]);
            setLoading(false);
        });
    }, [API_URL])

    return (
        <main>
            <HeaderMenu />
            <h1>Search Results</h1>
            {loading ? (
                <LoadingAnimation />
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

export default SearchPageCategory