import React, { useState } from 'react';

export default function (props) {
    // Data that we'll need:
    // - background image: thumb_image_url
    // - banner image: banner_image_url
    // - logo: logo_url
    // - description: description
    // - id: id
    const { id, description, thumb_image_url, logo_url } = props.item;

    const [itemClass, changeItemClass] = useState("");

    const handleMouseEnter = () => {
        changeItemClass("image-blur")
    };

    const handleMouseLeave = () => {
        changeItemClass("")
    };

        
    return (
        <div className="portfolio-item-wrapper"
            onMouseEnter={() => { handleMouseEnter() }}
            onMouseLeave={() => { handleMouseLeave() }}
        >
            <div
                className={"portfolio-img-bg " + itemClass}
                style={{
                    backgroundImage: `url("${thumb_image_url}")`
                }}
            />
            <div className="img-text-wrapper">
                <div className="logo-wrapper">
                    <img src={logo_url} />
                </div>
                <div className="subtitle">{description}</div>
            </div>

        </div>
    )
}
