import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
;
    const NavigationComponent = (props) => {

        const dynamicLink = (route, linkText) => {
            return (
            <div className="nav-link-wrapper">
                <NavLink to={route} activeClassName="nav-link-active">
                    {linkText}
                </NavLink>
            </div>
        );    
    };

    const handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", {withCredentials: true}).then(response => {
            if (response.status === 200) {
                props.history.push("/");
                props.handleSuccessfulLogout();
            }
            return response.data;
        }).catch((e) => {
            console.log("error signing out", e)
        })
    }

        // console.log("Status:" + props.loggedInStatus)
        return (
            <div className="nav-wrapper">
                <div className="left-side-wrapper">

                    <div className="nav-link-wrapper">
                        <NavLink exact to="/" activeClassName="nav-link-active">
                            Home
                        </NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink to="/about-me" activeClassName="nav-link-active">
                            About
                        </NavLink>
                    </div>

                    <div className="nav-link-wrapper">
                        <NavLink to="/contact-me" activeClassName="nav-link-active">
                            Contact
                        </NavLink>
                    </div>

                    <div className="nav-link-wrapper">
                        <NavLink to="/blog" activeClassName="nav-link-active">
                            Blog
                        </NavLink>
                    </div>

                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}

                    
                </div>
                <div>
                    JOSHUA HUNTER

                    {props.loggedInStatus === 'LOGGED_IN' ? <a className="sign-out-icon" onClick={handleSignOut}><FontAwesomeIcon icon="sign-out-alt" /></a> : null}
                </div>
            </div>
        );
    }

    export default withRouter(NavigationComponent)