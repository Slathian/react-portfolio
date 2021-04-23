import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default function PortfolioForm (props) {

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [position, setPosition] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [thumb_image, changeThumb] = useState("");
    const [banner_image, changeBanner] = useState("");
    const [logo, changeLogo] = useState("");
    const [editMode, changeEditMode] = useState(false);
    const [apiUrl, editApiUrl] = useState("https://joshuaangelo.devcamp.space/portfolio/portfolio_items")
    const [apiAction, changeApiAction] = useState("post");

    const thumbRef = React.useRef();
    const bannerRef = React.useRef();
    const logoRef = React.useRef();

    useEffect(() => {
        if (props.trigger.current === true) {
            console.log("TRIGGER ACTIVATED IN FORM", props.trigger);
            let {
                id,
                name,
                description,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = props.portfolioEditItem.portfolioToEdit;

            // console.log(
            // "ID: ", id,
            // " Name: ", name,
            // " Description: ", description,
            // " Category: ", category,
            // " Position: ", position,
            // " URL: ", url
            // )

            setName(name || "");
            setUrl(url || "");
            setPosition(position || "");
            setCategory(category || "");
            setDescription(description || "");
            changeEditMode(true);
            editApiUrl(`https://joshuaangelo.devcamp.space/portfolio/portfolio_items/${id}`);
            changeApiAction("patch");
        }
    });

    const handleSubmit = event => {
        event.preventDefault();
        
        axios({
            method: apiAction,
            url: apiUrl,
            data: buildForm(),
            withCredentials: true
        })
        .then(response => {
            console.log(response)
            props.handleSuccessfulFormSubmission(response.data.portfolio_item);

            setName("");
            setUrl("");
            setPosition("");
            setDescription("");
            changeThumb("");
            changeBanner("");
            changeLogo("");

            [thumbRef, bannerRef, logoRef].forEach(ref => {
                ref.current.dropzone.removeAllFiles();
            });
        })
        .catch(error => {
            console.log("Portfolio form handleSubmit error:", error);
        });
    }

    const buildForm = () => {

        console.log(name, description, url, category, position)


        let formData = new FormData();
        formData.append("portfolio_item[name]", name);
        formData.append("portfolio_item[description]", description);
        formData.append("portfolio_item[url]", url);
        formData.append("portfolio_item[category]", category);
        formData.append("portfolio_item[position]", position);
    
        if (thumb_image) {
          formData.append("portfolio_item[thumb_image]", thumb_image);
        }
    
        if (banner_image) {
          formData.append("portfolio_item[banner_image]", banner_image);
        }
    
        if (logo) {
          formData.append("portfolio_item[logo]", logo);
        }
        
        return formData;
    }
    
    const componentConfig = () => {
        return {
          iconFiletypes: [".jpg", ".png"],
          showFiletypeIcon: true,
          postUrl: "https://httpbin.org/post"
        };
    }
    
    const djsConfig = () => {
        return {
        addRemoveLinks: true,
        maxFiles: 1
        };
    }

    const handleThumbDrop = () => {
        // console.log(thumb_image)
        return {
            addedfile: file => changeThumb(file)
        };
    }
    
    const handleBannerDrop = () => {
        // console.log(banner_image)
        return {
            addedfile: file => changeBanner(file)
        };
    }
    
    const handleLogoDrop = () => {
        // console.log(logo)
        return {
            addedfile: file => changeLogo(file)
        };
    }
    
    return (
        <form onSubmit={handleSubmit} className="portfolio-form-wrapper">
            <div className="two-column">
                <label>
                    <input 
                        type="text"
                        placeholder="Portfolio Item Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>

                <label>
                    <input 
                        type="text"
                        placeholder="URL"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                </label>
            </div>

            <div className="two-column">
                <label>
                    <input 
                        type="text"
                        placeholder="Position"
                        value={position}
                        onChange={e => setPosition(e.target.value)}
                    />
                </label>

                <select
                    onChange={e => setCategory(e.target.value)}
                    value={category}
                >
                    <option value="Blog"> Blogs</option>
                    <option value="Enterprise"> Enterprise</option>
                    <option value="Project"> Projects</option>
                </select>
            </div>

            <label>
                <div className="one-column">
                    <textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
            </label>

            <label>
                <div className="image-uploaders">
                    <DropzoneComponent
                        ref={thumbRef}
                        config={componentConfig()}
                        djsConfig={djsConfig()}
                        eventHandlers={handleThumbDrop()}
                    >
                        <div className="dz-message">Thumbnail</div>
                    </DropzoneComponent>

                    <DropzoneComponent
                        ref={bannerRef}
                        config={componentConfig()}
                        djsConfig={djsConfig()}
                        eventHandlers={handleBannerDrop()}
                    >
                        <div className="dz-message">Banner</div>
                    </DropzoneComponent>

                    <DropzoneComponent
                        ref={logoRef}
                        config={componentConfig()}
                        djsConfig={djsConfig()}
                        eventHandlers={handleLogoDrop()}
                    >
                        <div className="dz-message">Logo</div>
                    </DropzoneComponent>
                    </div>
                </label>
                <div>
                <button className="btn" type="submit">Save</button>
                </div>

        </form>
    )
};