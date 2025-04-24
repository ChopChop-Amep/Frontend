import React, { useState } from 'react';
import './Invoice.css'

function Product_Invoice () {
    return (
        <> 
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

        <div className="invoice-table">
            <div className="row header">
                <div>Qty</div>
                <div>Description</div>
                <div>Unit Price</div>
                <div>Amount</div>
            </div>

            <div className="row">
                <div>2</div>
                <div>Product A</div>
                <div>$10.00</div>
                <div>$20.00</div>
            </div>

            <div className="row">
                <div>1</div>
                <div>Product B</div>
                <div>$15.00</div>
                <div>$15.00</div>
            </div>
            <div className="row total-row">
                <div></div> {/* columna buida */}
                <div></div> {/* columna buida */}
                <div>Total</div>
                <div>€35.00</div>
            </div>
            </div>
        </>
    ); 
    
}

export default Product_Invoice; 
