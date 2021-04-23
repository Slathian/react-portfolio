import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef }from 'react';


export default function PortfolioSidebarList (props) {

    const useLoad = useRef(props.loaded.current);

    useEffect(()=> {
        if (props.loaded.current === true) {
            console.log("called after data fetch")
        }
    })
    
    if (props.isLoaded === true) {
        console.log(props.apiData.current.portfolioItems)
        const PortfolioList = props.apiData.current.portfolioItems.map((item) => {
            return (
                <div key={item.id} className="portfolio-item">
                    <img src={item.thumb_image_url}/>
                    <div className="title-card">
                        <h1>{item.name}</h1>
                        <div className="actions">
                            <a className="edit-icon" onClick={() => props.handleEditClick(item)}>
                                <FontAwesomeIcon icon="edit" />
                            </a>  
                            <a className="delete-icon" onClick={() => props.handleDeleteClick(item)}>
                                <FontAwesomeIcon icon="trash" />
                            </a>    
                        </div>
                        
                    </div>
                    
                </div>
                )
        });

        return (
            <div className="portfolio-items-wrapper">
                {PortfolioList}
            </div>  
        )
    }

    return (
        <div>
            Loading...
        </div>
    )
}