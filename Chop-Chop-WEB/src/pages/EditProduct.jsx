import React from "react"
import { useEffect } from "react"
import { HeaderMenu } from "./components/HeaderMenu.jsx"
import "./EditProduct.css"

//   "name": "string",
//   "description": "string",
//   "stock": 0,
//   "price": 0,
//   "image": "string",
//   "category": "artesanal"

function EditProduct() {

    const productId = new URLSearchParams(window.location.search).get("id")
    const API_URL = `http://127.0.0.1:8000/product/${productId}`
    const [form, setForm] = React.useState({
        name: "",
        description: "",
        price: "",
        image: "",
        stock: "",
        category: "artesanal",
        condition: "nou"
    });

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setForm({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        image: data.image,
                        stock: data.stock,
                        category: data.category,
                        condition: data.condition
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [API_URL]);

    console.log("Form data:", form);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://127.0.0.1:8000/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    ...form,
                    type: "verified",
                    sku: productId
                })
            });
            if (response.ok) {
                alert('Product updated successfully!');
            } else {
                alert('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product.');
        }
    };

    const handleDelete = async () => {
        const authToken = localStorage.getItem('authToken');
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/product/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if (response.ok) {
                    alert('Product deleted successfully!');
                } else {
                    alert('Failed to delete product.');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product.');
            }
        }
        window.location.href = '/myProducts'
    };

    return (
        <>
            <HeaderMenu />
            <br />
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <p>Name:</p>
                <input type="text" id="product-name" name="name" className='input-style-ep' value={form.name} onChange={handleChange} required />
                <p>Description:</p>
                <textarea id="product-description" name="description" className='input-style-ep' value={form.description} onChange={handleChange} required></textarea>
                <p>Price:</p>
                <input type="number" id="product-price" name="price" className='input-style-ep' value={form.price} onChange={handleChange} required />
                <p>Product Image URL:</p>
                <img src={form.image} alt="Product" style={{ width: '100px', height: '100px' }} />
                <input type="url" id="product-image" name="image" className='input-style-ep' value={form.image} onChange={handleChange} required />
                <p>Stock:</p>
                <input type="number" id="product-stock" name="stock" className='input-style-ep' value={form.stock} onChange={handleChange} required />
                <p>Category:</p>
                <select id="product-category" name="category" className='input-style-ep' value={form.category} onChange={handleChange}>
                    <option value="artesanal">Artesanal</option>
                    <option value="antiguitats">Antiguitats</option>
                    <option value="cosmetica">Cosmètica</option>
                    <option value="cuina">Cuina</option>
                    <option value="electrodomestics">Electrodomèstics</option>
                    <option value="electronica">Electrònica</option>
                    <option value="equipament_lab">Equipament de Laboratori</option>
                    <option value="esports">Esports</option>
                    <option value="ferramentes">Ferramentes</option>
                    <option value="infantil">Infantil</option>
                    <option value="instruments">Instruments</option>
                    <option value="jardineria">Jardineria</option>
                    <option value="jocs_de_taula">Jocs de Taula</option>
                    <option value="joies_complements_accessoris">
                        Joies, Complements i Accessoris
                    </option>
                    <option value="llibres">Llibres</option>
                    <option value="mascotes">Mascotes</option>
                    <option value="mobles">Mobles</option>
                    <option value="neteja">Neteja</option>
                    <option value="roba">Roba</option>
                    <option value="sabates">Sabates</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="videojocs">Videojocs</option>
                </select>
                <br />
                <br />
                <button className="botton-cp" type="submit">Update</button>
                <br />
                <button className="botton-cp" type="button" onClick={handleDelete}>Delete</button>
            </form>
        </>
    )
}

export default EditProduct