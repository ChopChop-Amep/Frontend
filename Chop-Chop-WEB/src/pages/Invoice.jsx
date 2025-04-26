import React from 'react'
import { HeaderMenu } from './components/HeaderMenu';
import './Invoice.css'

function Product_Invoice () {

    //decoded token
    //const token = localStorage.getItem('authToken'); // Cambia 'authToken' por el nombre de tu token
    //const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decodifica el token JWT

    //falta la llamada a la API para obtener los productos que ha comprado el usuario
    // const [products, setProducts] = useState([])
    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     const response = await fetch('http://localhost:8000/api/boughtproducts')
    //     const data = await response.json()
    //     setProducts(data)
    //   }
    //   fetchProducts()
    // }, [])

    const printSection = () => {
        const printContent = document.getElementById('printable-area');
        
        // Create a new window for printing to avoid layout issues
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Invoice</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        .invoice-table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        .invoice-table .row {
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #ddd;
                            padding: 8px 0;
                        }
                        .invoice-table .header {
                            font-weight: bold;
                        }
                        .invoice-table .total-row {
                            font-weight: bold;
                            border-top: 2px solid #000;
                        }
                        .FACTURA, .invoice_data, .invoice_db, .seller, .buyer {
                            margin-bottom: 20px;
                        }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <> 
        <HeaderMenu />

        <button className="btn-download" onClick={printSection} >
            Download Invoice
        </button>

        <section id="printable-area" >
            <p className='FACTURA'>   
                COMMERCIAL INVOICE 
            </p>

            <p className='invoice_data'>
                Invoice number: <br/> 
                Invoice Date: <br/> 
                Order Nº: <br/> 
            </p> 

            <p className='invoice_db'> 
                #00000 <br/> 
                dd/mm/yyyy <br/> 
                #00000
            </p>

            <p className='seller'>
                <strong>SELLER</strong><br/> 
                *company name* <br/> 
                *Address* <br/> 
                *company phone number* <br/> 
            </p>

            <p className='buyer'>
                <strong>BUYER</strong><br/> 
                *name* <br/> 
                *Address* <br/> 
                *phone number* <br/> 
            </p>

            <main className="invoice-table">
                <div className="row header">
                    <p>Qunatity</p>
                    <p>Description</p>
                    <p>Unit Price</p>
                    <p>Amount</p>
                </div>

                <div className="row">
                    <p>2</p>
                    <p>Product A</p>
                    <p>$10.00</p>
                    <p>$20.00</p>
                </div>

                <div className="row">
                    <p>1</p>
                    <p>Product B</p>
                    <p>$15.00</p>
                    <p>$15.00</p>
                </div>

                <div className="row total-row">
                    <p></p> {/* columna buida */} 
                    <p></p> {/* columna buida */} 
                    <p>Total</p>
                    <p>€35.00</p>
                </div>
            </main>
        </section>
        </>
    );
    
}

export default Product_Invoice; 
