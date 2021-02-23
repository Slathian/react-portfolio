import React, { useState, useEffect } from 'react';
import Login from '../auth/login';
import AltLogin from '../auth/RHFLogin';

import loginImg from '../../../static/assets/images/auth/login.jpg';

export default function(props) {

    const handleSuccessfulAuth = () => {
        props.handleSuccessfulLogin();
        props.history.push('/');
    }
    const handleUnsuccessfulAuth = () => {
        props.handleUnsuccessfulLogin();
    }

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
                <AltLogin 
                handleSuccessfulAuth={handleSuccessfulAuth}
                handleUnsuccessfulAuth={handleUnsuccessfulAuth}
                />
            </div>

            </div>
        </div>
    )
};