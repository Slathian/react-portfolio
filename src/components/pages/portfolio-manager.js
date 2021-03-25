import React, { useState, useEffect }from 'react';
import axios from 'axios'

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
// import PortfolioForm from '../portfolio/portfolio-form';
import CopyPortfolioForm from '../portfolio/form-follow-along';

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
        
    });

    const handleSuccessfulFormSubmission = (portfolioData) => {
        changeLoad(false);
        setPortfolio({
            portfolioItems: [portfolio].concat(portfolioData)
        })
        console.log("After the trigger" ,portfolio)
    }

    const handleFormSubmissionError = (error) => {
        console.log("Handle form submission error:", error)
    } 

    const handleDeleteClick = (item) => {
        console.log(item);
        axios
        .delete(`https://api.devcamp.space/portfolio/portfolio_items/${item.id}`, {withCredentials: true}
        ).then(response => {
            console.log("response from delete:", response)
        }).catch(error => {
            console.log("delete error:", error)
        })
    }
    

    return (
        <div>
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                        {/* <PortfolioForm  */}
                        <CopyPortfolioForm
                        handleSuccessfulFormSubmission={handleSuccessfulFormSubmission} 
                        handleFormSubmissionError={handleFormSubmissionError}
                        /> 
                </div>

                <div className="right-column">
                    <PortfolioSidebarList 
                    apiData={portfolio} 
                    isLoaded={loaded} 
                    handleDeleteClick={handleDeleteClick}
                    key={"side-bar-list"}/>
                </div>
            </div>
        </div>
    )
};