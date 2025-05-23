import React from "react"
import { HeaderMenu } from "./components/HeaderMenu"
import { Box } from "./utiles/Box.jsx"
import LoadingAnimation from "./utiles/LoadingAnimation.jsx"
import "./SelectedCharacteristic.css"


export default function SelectedCharacteristic() {
    const searchParams = new URLSearchParams(window.location.search).get("Status") || new URLSearchParams(window.location.search).get("Stars") || new URLSearchParams(window.location.search).get("order")

    let API_URL = "";
    if (new URLSearchParams(window.location.search).has("Status")) {
        API_URL = `http://127.0.0.1:8000/products?page=0&condition=${searchParams}&min_price=0`;
    } else if (new URLSearchParams(window.location.search).has("Stars")) {
        API_URL = `http://127.0.0.1:8000/products?page=0&rating=${searchParams}&min_price=0`;
    } else if (new URLSearchParams(window.location.search).has("order")) {
        API_URL = `http://127.0.0.1:8000/products?page=0&min_price=0`;
    }

    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => {
                console.error("Error:", error);
            })
            .finally(() => setLoading(false));
    }, [API_URL]);

    let filteredProducts = products;
    if (new URLSearchParams(window.location.search).has("Stars")) {
        const selectedStars = Number(new URLSearchParams(window.location.search).get("Stars"));
        filteredProducts = products.filter(product => 
            Number(product.rating) >= selectedStars && Number(product.rating) < selectedStars + 1
        );
    }

    if (new URLSearchParams(window.location.search).has("order")) {
        const sortOrder = new URLSearchParams(window.location.search).get("order");
        filteredProducts = [...products].sort((a, b) => {
            if (sortOrder === "Price ascendent") {
                return a.price - b.price;
            } else if (sortOrder === "Price descendent") {
                return b.price - a.price;
            }
            return 0;
        });
    }

    return (
    <>
        <HeaderMenu />
        <h1 style={{marginTop: "4rem"}}>Products as: {searchParams} </h1>
        {loading ? (
            <LoadingAnimation />
        ) : filteredProducts.length > 0 ? (
            <ul className="container-selected-characteristic">
                {filteredProducts.map((product) => (
                    <div key={product.id}>
                        <a href={`/product?id=${product.id}`}>
                            <Box title={product.name} image={product.image} />
                        </a>
                        {new URLSearchParams(window.location.search).has("Stars") && (
                            <p style={{ color: "yellow" }}>★ {product.rating}</p>
                        )}
                        {new URLSearchParams(window.location.search).has("order") && (
                            <p className='price-shown'>Price: ${product.price}</p>
                        )}
                    </div>
                ))}
            </ul>
        ) : (
            <p>No products found.</p>
        )}
    </>
    );
}
