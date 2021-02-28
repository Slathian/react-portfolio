import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

    const NavigationComponent = (props) => {

        const dynamicLink = (route, linkText) => {
            return (
            <div className="nav-link-wrapper">
                <NavLink to="/blog" activeClassName="nav-link-active">
                    Blog
                </NavLink>
            </div>
        );    
    };

        console.log("Status:" + props.loggedInStatus)
        return (
            <div className="nav-wrapper">
                <div className="left-side-wrapper">

                    <div className="nav-link-wrapper">
                        <NavLink exact to="/" activeClassName="nav-link-active">
                            Home
                        </NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink to="/About-me" activeClassName="nav-link-active">
                            About
                        </NavLink>
                    </div>

                    <div className="nav-link-wrapper">
                        <NavLink to="/Contact-me" activeClassName="nav-link-active">
                            Contact
                        </NavLink>
                    </div>

                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/blog", "Blog") : null}

                    
                </div>
                <div>
                    JOSHUA HUNTER
                </div>
            </div>
        );
    }

    export default NavigationComponent