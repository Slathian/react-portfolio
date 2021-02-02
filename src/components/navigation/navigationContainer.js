import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class NavigationComponent extends Component {
    render() {
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

                    <div className="nav-link-wrapper">
                        <NavLink to="/blog" activeClassName="nav-link-active">
                            Blog
                        </NavLink>
                    </div>

                    <div className="nav-link-wrapper">
                        {false ? <button>Add Blog</button> : null}
                    </div>
                </div>
                <div>
                    JOSHUA HUNTER
                </div>
            </div>
        );
    }
}