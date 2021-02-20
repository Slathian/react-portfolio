import React from 'react';
import Login from '../auth/login';
import AltLogin from '../auth/RHFLogin';

import loginImg from '../../../static/assets/images/auth/login.jpg';

export default function() {
    return (
        <div>
            <div className="auth-page-wrapper">
            <div className="left-column" 
                style={{
                    backgroundImage: `url(${loginImg})`
                }}
            />

            <div className="right-column">
                {/* <Login /> */}
                <AltLogin />
            </div>

            </div>
        </div>
    )
};