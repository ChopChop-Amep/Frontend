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

  const token = localStorage.getItem("authToken"); 
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null; 
  const API_URL = 'http://127.0.0.1:8000/my/purchases/'

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
  }, [API_URL]);

  //console.log('Invoices:', invoices);

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

  // Modal para mostrar detalles de la compra seleccionada
  const selectedInvoice = modalInvoiceIndex !== null ? invoices[modalInvoiceIndex] : null;

  // Guardar todas las facturas originales para poder filtrar varias veces
  const [allInvoices, setAllInvoices] = useState([]);

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
          setAllInvoices(data); // Guardar todas las facturas
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching invoices:', error);
      });
  }, [API_URL]);

  const HandleDatePick = (date) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
      // Filtrar siempre desde todas las facturas originales
      const filteredInvoices = allInvoices.filter(inv => {
        const invoiceDate = new Date(inv.date);
        return invoiceDate.toDateString() === date.toDateString();
      });
      setInvoices(filteredInvoices);
    }
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
              onSelect={HandleDatePick}
              onClickOutside={() => setShowCalendar(false)}
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

      <div className="invoice-list-container">
        <ul className="invoice-list">
          {invoices.map((inv, index) => (
            <li
              key={inv.id || index}
              className='invoice-item'
              onClick={() => setModalInvoiceIndex(index)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') setModalInvoiceIndex(index);
              }}
            >
              <span>Compra día: {inv.date ? new Date(inv.date).toLocaleDateString('es-ES') : 'dd/mm/yyyy'}</span>
            </li>
          ))}
        </ul>
      </div>

      {selectedInvoice && (
        <div className="invoice-modal-overlay" onClick={() => setModalInvoiceIndex(null)}>
          <div className="invoice-modal-content" onClick={(e) => e.stopPropagation()}>
            <section id="printable-area">
              <div className="invoice-header">
                <div className="invoice-meta">
                  <p>Invoice number: #{selectedInvoice.id || '0000'}</p>
                  <p>Invoice Date: {selectedInvoice.date ? new Date(selectedInvoice.date).toLocaleDateString('es-ES') : 'dd/mm/yyyy'}</p>
                  <p>Order Nº: #{selectedInvoice.id || '0000'}</p>
                </div>
              </div>

              <div className="invoice-buyer">
                <p><strong>BUYER</strong></p>
                <p>{decodedToken.user_metadata.name} {decodedToken.user_metadata.surname}</p>
                <p>{decodedToken.user_metadata.email}</p>
              </div>

              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Product ID</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(selectedInvoice.items) ? (
                    selectedInvoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.count}</td>
                        <td>{item.product_id}</td>
                        <td>
                          {item.paid && item.count
                            ? `$${(item.paid / item.count).toFixed(2)}`
                            : item.paid}
                        </td>
                        <td>
                          {item.paid
                            ? `$${item.paid.toFixed(2)}`
                            : item.paid}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>{selectedInvoice.items.count}</td>
                      <td>{selectedInvoice.items.product_id}</td>
                      <td>
                        {selectedInvoice.items.paid && selectedInvoice.items.count
                          ? `$${(selectedInvoice.items.paid / selectedInvoice.items.count).toFixed(2)}`
                          : selectedInvoice.items.paid}
                      </td>
                      <td>
                        {selectedInvoice.items.paid
                          ? `$${selectedInvoice.items.paid.toFixed(2)}`
                          : selectedInvoice.items.paid}
                      </td>
                    </tr>
                  )}
                  <tr className="total-row">
                    <td colSpan="2"></td>
                    <td>Total</td>
                    <td>
                      {Array.isArray(selectedInvoice.items)
                        ? `$${selectedInvoice.items.reduce((sum, item) => sum + (item.paid || 0), 0).toFixed(2)}`
                        : selectedInvoice.items.paid
                        ? `$${selectedInvoice.items.paid.toFixed(2)}`
                        : selectedInvoice.items.paid}
                    </td>
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