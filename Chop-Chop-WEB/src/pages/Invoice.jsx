import React from 'react'
import { HeaderMenu } from './components/HeaderMenu';
import './Invoice.css'

function Product_Invoice () {
    return (
        <> 
        <HeaderMenu />

        <p className='FACTURA'>   
        COMMERCIAL INVOICE 
        </p>

        <p className = 'invoice_data'>
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
        </>
    ); 
    
}

export default Product_Invoice; 
