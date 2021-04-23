import React, { useState, useEffect, useRef }from 'react';
import axios from 'axios'

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default function PortfolioManager() {

    // const [portfolio, setPortfolio] = useState([]);
    const portfolio = useRef([]);
    // const [loaded, changeLoad] = useState(false);
    const loaded = useRef(false);
    const [portfolioEdit, setPortfolioEdit] = useState({portfolioToEdit: {}})
    // const [triggerSwitch, changeTriggerSwitch] = useState(false)
    const triggerSwitch = useRef(false);
    const initialMount = useRef(true);

    useEffect( () =>{
        async function fetchData() {
            await axios
            .get("https://joshuaangelo.devcamp.space/portfolio/portfolio_items", {withCredentials: true})
            .then(response => {
                // setPortfolio({portfolioItems: [...response.data.portfolio_items]})
                portfolio.current = {portfolioItems: [...response.data.portfolio_items]};
                loaded.current = true;
                console.log("Data has been fetched", portfolio.current, " | ", loaded.current);
            })
            .catch(error => {
                console.log("axios data collection error: ", error);
            });
        };

        fetchData()
        

        if (triggerSwitch.current === true) {
            console.log("TRIGGER STATEMENT ACTIVE");
            console.log("after the statement call", portfolioEdit)
            triggerSwitch.current = false;
        }
    });

    const handleSuccessfulFormSubmission = (portfolioData) => {
        triggerSwitch.current = false;
        setPortfolio({
            portfolioItems: [portfolio.current].concat(portfolioData)
        })
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

    const handleEditClick = (portfolioItem) => {
        setPortfolioEdit({
            portfolioToEdit: portfolioItem
        })
        triggerSwitch.current = true;
    };
    
    const clearPortfolioToEdit = () => {
        setPortfolioEdit({
            portfolioToEdit: {}
        })
    }

    return (
        <div>
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                        <PortfolioForm 
                        handleSuccessfulFormSubmission={handleSuccessfulFormSubmission} 
                        handleFormSubmissionError={handleFormSubmissionError}
                        clearPortfolioToEdit={clearPortfolioToEdit}
                        portfolioEditItem={portfolioEdit}
                        trigger={triggerSwitch}
                        />

                        {/* <CopyPortfolioForm
                        handleSuccessfulFormSubmission={handleSuccessfulFormSubmission} 
                        handleFormSubmissionError={handleFormSubmissionError}
                        clearPortfolioToEdit={clearPortfolioToEdit}
                        portfolioToEdit={portfolioEdit}
                        />  */}
                </div>

                <div className="right-column">
                    <PortfolioSidebarList 
                    apiData={portfolio}
                    loaded={loaded}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                    key={"side-bar-list"}/>
                </div>
            </div>
        </div>
    )
};