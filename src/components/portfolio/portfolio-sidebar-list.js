import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


const PortfolioSidebarList = props => {

    if (props.isLoaded === true ) {
        // console.log(props.apiData.portfolioItems)
        const PortfolioList = props.apiData.portfolioItems.map((item) => {
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

export default PortfolioSidebarList