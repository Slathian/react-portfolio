import React from 'react';


const PortfolioSidebarList = props => {

    if (props.isLoaded === true ) {
        // console.log(props.apiData.portfolioItems)
        const PortfolioList = props.apiData.portfolioItems.map((item) => {
            return (
                <div key={item.id} className="portfolio-item">
                    <img src={item.thumb_image_url}/>
                    <h1>{item.name}</h1>
                    <h2>ID: {item.id}</h2>
                    <h2>URL: {item.url}</h2>
                    <h2>Description: {item.description}</h2>
                    
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