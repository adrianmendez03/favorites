import React from 'react';

import { ReactComponent as LogoText } from '../../images/text.svg';

const LoadingFavorites = () => {
    return (
        <div className="loading-favorites-container">
            <div className="loading-favorites-content">
                <LogoText id="loading"/>
            </div>
        </div>
    )
}

export default LoadingFavorites;