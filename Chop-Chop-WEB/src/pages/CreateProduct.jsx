import React from "react"
import { HeaderMenu } from "./components/HeaderMenu.jsx"
import "./CreateProduct.css"

function CreateProduct() {

    return (
        <>
        <HeaderMenu />
        <br />
        <h1>Create Product</h1>
        <form>
            <p>Product Name:</p>
            <input type="text" id="product-name" name="product-name" required />
            <p>Product Description:</p>
            <textarea id="product-description" name="product-description" required></textarea>
            <p>Product Price:</p>
            <input type="number" id="product-price" name="product-price" required />
            <p>Product Image URL:</p>
            <input type="url" id="product-image" name="product-image" required />
            <br />
            <br />
            <button className="button-style-cp" type="submit">Create Product</button>
        </form>
        </>
    )
}

export default CreateProduct