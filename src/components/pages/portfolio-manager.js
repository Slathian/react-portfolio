import React, { useState, useEffect, Suspense }from 'react';
import axios from 'axios'

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';

export default function PortfolioManager() {

    const [portfolio, setPortfolio] = useState([]);
    const [loaded, changeLoad] = useState(false);

    useEffect( () =>{
        async function fetchData() {
            await axios
            .get("https://joshuaangelo.devcamp.space/portfolio/portfolio_items", {withCredentials: true})
            .then(response => {
                setPortfolio({portfolioItems: [...response.data.portfolio_items]})
                changeLoad(true);
            })
            .catch(error => {
                console.log("axios data collection error: ", error);
            });
        };

        fetchData()
        
    }, []);

    

    return (
        <div>
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <form>
                        <input>
                        </input>
                        
                    </form>
                </div>

                <div className="right-column">
                    <PortfolioSidebarList apiData={portfolio} isLoaded={loaded}/>
                </div>
            </div>
        </div>
    )
};