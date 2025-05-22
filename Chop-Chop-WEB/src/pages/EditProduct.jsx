import React from "react"
import { HeaderMenu } from "./components/HeaderMenu.jsx"
import "./EditProduct.css"

//   "name": "string",
//   "description": "string",
//   "stock": 0,
//   "price": 0,
//   "image": "string",
//   "category": "artesanal"

function EditProduct() {

    const [form, setForm] = React.useState({
        name: "",
        description: "",
        price: "",
        image: "",
        stock: "",
        category: "artesanal"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add update logic here (e.g., API call)
        console.log("Updated product:", form);
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
            </form>
        </>
    )
}

export default EditProduct