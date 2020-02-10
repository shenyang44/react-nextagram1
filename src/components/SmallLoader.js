import React from 'react';
import loader from './loaderSmall.gif';

const SmallLoader = () =>
    <div style={{ backgroundColor: '#f1f2f3', width: '100px', height: '100px', boxSizing: 'border-box' }}>
        <img src={loader} alt='loader'>
        </img>
    </div>

export default SmallLoader;