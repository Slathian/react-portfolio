import React, { useState, useEffect }from 'react';
import axios from 'axios'

export default function PortfolioManager() {

    const [data, changeData] = useState("");

    return (
        <div>
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <h1>Portfolio form....</h1>
                </div>

                <div className="right-column">
                    <h1>Portfolio sidebar....</h1>
                </div>
            </div>
        </div>
    )
}