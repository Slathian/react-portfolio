import React, { useState } from 'react';
import axios from 'axios';
import DropzoneComponent from "react-dropzone-component";

export default function PortfolioForm (props) {

    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [position, setPosition] = useState("")
    const [category, setCatagory] = useState("Blog")
    const [description, setDescription] = useState("")

    const handleSubmit = event => {
        event.preventDefault();
        alert(`Submitting Name ${name, url, position, category, description}`)
    }
    
    return (
        <form onSubmit={handleSubmit} className="portfolio-form-wrapper">
            <div className="two-column">
                <input 
                    type="text"
                    placeholder="Portfolio Item Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder="URL"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
            </div>

            <div className="two-column">
                <input 
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                />

                <select>
                    <option value="Blog"> Blogs</option>
                    <option value="Enterprise"> Enterprise</option>
                    <option value="Project"> Projects</option>
                </select>
            </div>

            <div className="one-column">
                <textarea
                type="text"
                placeholder="Description"
                onChange={e => setDescription(e.target.value)}
                />
            </div>

                
                <div>
                    <button type="submit" value="Submit">Save</button> 
                </div>

        </form>
    )
};