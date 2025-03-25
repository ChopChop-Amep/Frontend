import React from 'react';
import './Box.css';

export function Box ({ title, image }) {
    return (
        <div className="box">
            <img src={image} alt={title} style={{ width: '100px' }} />
            <h2>{title}</h2>
        </div>
    )
}