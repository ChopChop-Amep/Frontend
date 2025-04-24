import React from "react"
import { HeaderMenu } from "./components/HeaderMenu.jsx"
import "./EditProduct.css"

function EditProduct() {

    return (
        <>
        <HeaderMenu />
        <br />
        <h1>Edit Product</h1>
        <form>
            <p>New Name:</p>
            <input type="text" id="product-name" name="product-name" required />
            <p>New Description:</p>
            <textarea id="product-description" name="product-description" required></textarea>
            <p>New Price:</p>
            <input type="number" id="product-price" name="product-price" required />
            <p>New Product Image URL:</p>
            <input type="url" id="product-image" name="product-image" required />
            <br />
            <br />
            <button className="botton-cp" type="submit">Update</button>
        </form>
        </>
    )
}

export default EditProduct