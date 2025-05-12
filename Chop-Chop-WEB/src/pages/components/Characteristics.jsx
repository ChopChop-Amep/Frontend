import React, { useState } from 'react';
import './Characteristics.css';

export default function Characteristics() {
  const [open, setOpen] = useState([false, false, false]);
  const [selectedOrder, setSelectedOrder] = useState('');

  const toggle = (index) => {
    const newState = [...open];
    newState[index] = !newState[index];
    setOpen(newState);
  };

  const handleOrderChange = (event) => {
    setSelectedOrder (event.target.value);
  };
  const labels = ["Estat", "Estrelles", "Ordenat per"];

  const checkboxOptions = {
    Estat: ["Nou", "Com Nou", "Utilitzat" ],
    Estrelles: ["★ estrella", "★★ estrelles", "★★★ estrelles", "★★★★ estrelles", "★★★★★ estrelles" ],
    "Ordenat per": ["Preu ascendent", "Preu descendent"]
  }
  return (
    <div className="dropdown-container">
      {labels.map((label, i) => (
        <div key={i} className="dropdown">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggle(i);
            }}
            className="dropdown-link-CH"
          >
            {label}
          </a>
          {open[i] && (
            <div className="dropdown-content-CH">
                { label === 'Ordenat per' ? (
                  checkboxOptions[label].map((option, j) => (
                    <label key={j} style={{ textAlign: 'left', display: 'block', marginBottom: '0.5rem' }}>
                      <input 
                        type="radio" 
                        name="order" 
                        value={option} 
                        checked={selectedOrder === option} 
                        onChange={handleOrderChange} 
                      /> 
                      {option}
                    </label>
                  ))
                ) : (
                  checkboxOptions[label].map((option,j)=> (
                    <label key = {j} style= {{textAlign: 'left', display: 'block', marginBottom: '0.5rem'}}>
                      <input type="checkbox" name={label} value ={option}  /> {option}
                    </label>
                ))
              )}                  
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

