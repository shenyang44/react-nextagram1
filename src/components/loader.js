import React from 'react';
import loader from './loaderGif.gif';

const Loader = () =>
    <div style={{ backgroundColor: 'white', width: '100vw', height: '100vh', boxSizing: 'border-box' }}>
        <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} src={loader} alt='loader'>
        </img>
    </div>

export default Loader;