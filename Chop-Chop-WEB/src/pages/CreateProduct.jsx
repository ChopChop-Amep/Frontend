import React from "react"
import { HeaderMenu } from "./components/HeaderMenu.jsx"
import "./CreateProduct.css"

//   "type": "verified",
//   "sku": "string",
//   "name": "string",
//   "description": "string",
//   "stock": 0,
//   "price": 0,
//   "image": "string",
//   "category": "artesanal"

function CreateProduct() {

    const [formData, setFormData] = React.useState({
        type: "verified",
        sku: "",
        name: "",
        description: "",
        stock: 0,
        price: 0,
        image: "",
        category: "artesanal"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "stock" || name === "price" ? Number(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here
        console.log(formData);
    };

    return (
        <>
            <HeaderMenu />
            <br />
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <p>SKU:</p>
                <input type="text" id="sku" name="sku" className="input-style-cp" value={formData.sku} onChange={handleChange} required />
                <p>Product Name:</p>
                <input type="text" id="name" name="name" className="input-style-cp" value={formData.name} onChange={handleChange} required />
                <p>Product Description:</p>
                <textarea id="description" name="description" className="input-style-cp" value={formData.description} onChange={handleChange} required />
                <p>Stock:</p>
                <input type="number" id="stock" name="stock" className="input-style-cp" value={formData.stock} onChange={handleChange} min="0" required />
                <p>Product Price:</p>
                <input type="number" id="price" name="price" className="input-style-cp" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
                <p>Product Image (URL):</p>
                <input type="url" id="image" name="image" className="input-style-cp" value={formData.image} onChange={handleChange} required />
                <p>Category:</p>
                <select id="category" name="category" className="input-style-cp" value={formData.category} onChange={handleChange} required>
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
                <button className="button-style-cp" type="submit">Create Product</button>
            </form>
        </>
    )
}

export default CreateProduct