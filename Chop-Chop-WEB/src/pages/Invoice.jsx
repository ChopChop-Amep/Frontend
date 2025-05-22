import React, { useState, useEffect } from 'react';
import { HeaderMenu } from './components/HeaderMenu';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './Invoice.css';

registerLocale('es', es);

const CalendarIcon = ({ width = 24, height = 24 }) => (
  <svg
    className="calendar-icon"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 2C6.4477 2 6 2.4477 6 3V4H5C3.89543 4 3 4.8954 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.8954 20.1046 4 19 4H18V3C18 2.4477 17.5523 2 17 2C16.4477 2 16 2.4477 16 3V4H8V3C8 2.4477 7.5523 2 7 2ZM5 8H19V19H5V8Z" />
  </svg>
);

function Product_Invoice() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalInvoiceIndex, setModalInvoiceIndex] = useState(null);
  const [invoices, setInvoices] = useState([]);

  const API_URL = 'http://127.0.0.1:8000/purchase/my_purchases'

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInvoices(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching invoices:', error);
      });
  }, [API_URL]); // da error 422

  console.log('Invoices:', invoices);

  const printSection = () => {
    const printContent = document.getElementById('printable-area');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <link rel="stylesheet" href="Invoice.css" />
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

      <div className="calendar-container">
        <button className="calendar-btn" onClick={() => setShowCalendar(!showCalendar)}>
          <CalendarIcon />
        </button>

        {showCalendar && (
          <div className="calendar-popup">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowCalendar(false);
              }}
              locale="es"
              inline
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              dateFormat="dd MMM yyyy"
            />
          </div>
        )}
      </div>

      <div className="invoice-grid">
        {invoices.map((inv, index) => (
          <div key={index} className="invoice-card" onClick={() => setModalInvoiceIndex(index)}>
            <p className="factura-title">Factura {inv}</p>
            <p>Número: #{inv}0000</p>
            <p>Fecha: {selectedDate ? selectedDate.toLocaleDateString('es-ES') : 'dd/mm/yyyy'}</p>
          </div>
        ))}
      </div>

      {modalInvoiceIndex !== null && (
        <div className="invoice-modal-overlay" onClick={() => setModalInvoiceIndex(null)}>
          <div className="invoice-modal-content" onClick={(e) => e.stopPropagation()}>
            <section id="printable-area">
              <div className="invoice-header">
                <div className="invoice-seller">
                  <p><strong>SELLER</strong></p>
                  <p>*company name*</p>
                  <p>*Address*</p>
                  <p>*Phone number*</p>
                </div>
                <div className="invoice-meta">
                  <p>Invoice number: #{invoices[modalInvoiceIndex]}0000</p>
                  <p>Invoice Date: {selectedDate ? selectedDate.toLocaleDateString('es-ES') : 'dd/mm/yyyy'}</p>
                  <p>Order Nº: #{invoices[modalInvoiceIndex]}0000</p>
                </div>
              </div>

              <div className="invoice-buyer">
                <p><strong>BUYER</strong></p>
                <p>*name*</p>
                <p>*Address*</p>
                <p>*Phone number*</p>
              </div>

              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>Product A</td>
                    <td>$10.00</td>
                    <td>$20.00</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Product B</td>
                    <td>$15.00</td>
                    <td>$15.00</td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan="2"></td>
                    <td>Total</td>
                    <td>$35.00</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <button className="btn-download" onClick={printSection}>Download Invoice</button>
            <button className="btn-close" onClick={() => setModalInvoiceIndex(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Product_Invoice;