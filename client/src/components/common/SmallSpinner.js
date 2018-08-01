import React from 'react';

import './SmallSpinner.css';

const SmallSpinner = () => (
    <div style={{ position: 'relative;' }}>
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    </div>
);

export default SmallSpinner;