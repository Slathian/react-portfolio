import React, { useState } from 'react';
import axios from 'axios';
import DropzoneComponent from "react-dropzone-component";

export default function PortfolioForm (props) {

    const [name, setName] = useState({name: ""})
    const [url, setUrl] = useState({url: ""})
    const [position, setPosition] = useState({position: ""})
    const [category, setCatagory] = useState({category: "Blog"})
    const [description, setDescription] = useState({description: ""})
    const [thumb_image, changeThumb] = useState("")
    const [banner_image, changeBanner] = useState("")
    const [logo, changeLogo] = useState("")

    const thumbRef = React.useRef();
    const bannerRef = React.useRef();
    const logoRef = React.useRef();

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .post(
                "https://joshuaangelo.devcamp.space/portfolio/portfolio_items",
                buildForm(),
                { withCredentials: true }
            )
            .then(response => {
                console.log(response)
                props.handleSuccessfulFormSubmission(response.data.portfolio_item);

                setName({name: ""});
                setUrl({url: ""});
                setPosition({position: ""});
                setDescription({description: ""});
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
        formData.append("portfolio_item[name]", "This is a string text");
        formData.append("portfolio_item[description]", description);
        formData.append("portfolio_item[url]", url);
        formData.append("portfolio_item[category]", category);
        formData.append("portfolio_item[position]", position);
    
        // if (thumb_image) {
        //   formData.append("portfolio_item[thumb_image]", thumb_image);
        // }
    
        // if (banner_image) {
        //   formData.append("portfolio_item[banner_image]", banner_image);
        // }
    
        // if (logo) {
        //   formData.append("portfolio_item[logo]", logo);
        // }
        
        // for (var value of formData.values()) {
        //     console.log(value[name][0])
        // }
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
        return {
            addedfile: file => changeThumb({ thumb_image_url: file })
        };
    }
    
    const handleBannerDrop = () => {
        return {
            addedfile: file => changeBanner({ banner_image_url: file })
        };
    }
    
    const handleLogoDrop = () => {
        return {
            addedfile: file => changeLogo({ logo_url: file })
        };
    }
    
    return (
        <form onSubmit={handleSubmit} className="portfolio-form-wrapper">
            <div className="two-column">
                <label>
                    <input 
                        type="text"
                        placeholder="Portfolio Item Name"
                        value={name.name}
                        onChange={e => setName({name: e.target.value})}
                    />
                </label>

                <label>
                    <input 
                        type="text"
                        placeholder="URL"
                        value={url.url}
                        onChange={e => setUrl({url: e.target.value})}
                    />
                </label>
            </div>

            <div className="two-column">
                <label>
                    <input 
                        type="text"
                        placeholder="Position"
                        value={position.position}
                        onChange={e => setPosition({position: e.target.value})}
                    />
                </label>

                <select
                    onChange={e => setCatagory({category: e.target.value})}
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
                        value={description.description}
                        onChange={e => setDescription({description: e.target.value})}
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
                    <button type="submit" value="Submit">Save</button> 
                </div>

        </form>
    )
};