import React from 'react';
import './Box.css';

export function Box ({ title, image }) {
    return (
        <div className="box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <img src={image} alt={title} style={{ width: '100px' }} />
            <h2 style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{title}</h2>
        </div>
    );
}