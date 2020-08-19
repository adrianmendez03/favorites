import React from 'react';
import { ReactComponent as Planet } from '../../images/planet.svg'
import { ReactComponent as LogoText } from '../../images/logo_text.svg'

import GoogleAuth from '../GoogleAuth'

const FavoriteHome = () => {
    return (
        <div>
            <Planet id="planet"/>
            <div className="grid-home">
                <div className="grid-home-left">
                    <LogoText id="logo-text"/>
                </div>
                <div className="grid-home-right">
                    <GoogleAuth home={true}/>
                </div>
            </div>
        </div>
    )
}

export default FavoriteHome;