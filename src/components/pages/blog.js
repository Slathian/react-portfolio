import React from 'react';
import { Link } from "react-router-dom"

export default function() {
    return (
        <div>
            <div>
                <h2>Blog</h2>
            </div>
            <div>
                <Link to="/about-me"> Read more about me!</Link>
            </div>
        </div>
    )
}