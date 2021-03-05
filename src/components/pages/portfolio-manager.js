import React, { useState, useEffect }from 'react';
import axios from 'axios'

export default function PortfolioManager() {

    const [portfolioItems, changePortfolioItems] = useState("");

    const getPortfolioItems = () => {
        axios
        .get("https://joshuaangelo.devcamp.space/portfolio/portfolio_items", {withCredentials: true})
        .then(response => {
            const apiCallData = response.data.portfolio_items
            console.log(apiCallData)
            changePortfolioItems([{this: "testing data"}])
            console.log("state section: ", portfolioItems)
        }).catch(err => {
            console.log("error in response", err)
        });
    };

    handleData = () => {
        
    }

    useEffect( () => {
        getPortfolioItems()
        console.log(portfolioItems)
    }, [])

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
                    <h1>Portfolio sidebar....</h1>
                    
                </div>
            </div>
        </div>
    )
}