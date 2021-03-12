import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Uploader from './image-uploader';


import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default function PortfolioForm () {

    const {register, handleSubmit } = useForm();

    const [isLoading, changeLoad] = useState(true)
    const [componentConfig, updateComponentConfig] = useState(null);
    const [djsConfig, updateDsjConfig] = useState(null)

    // use this to update error calls

    useEffect(() => {
        updateDsjConfig({
            addRemoveLinks: true,
            maxFiles: 1
        })

        updateComponentConfig ({
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postURL: "https://httpbin.org/post"
        })


    }, [])

    function onSubmit(data) {
        axios.post("https://joshuaangelo.devcamp.space/portfolio/portfolio_items",
            data,
            { withCredentials: true }
        ).then((response) => {
            console.log(response);
        })
            .catch((error) => {
                console.log("Portfolio Submit error", error);
            });
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                    ref={register}
                    name={"portfolio-item-name"}
                    placeholder={"Portfolio Item Name"}
                    type="text"
                    />

                    <input 
                    ref={register}
                    name={"url"}
                    placeholder={"URL"}
                    type="text"
                    />
                </div>

                <div>
                    <input 
                    ref={register}
                    name={"position"}
                    placeholder={"Position"}
                    type="number"
                    />

                    <select 
                    ref={register}
                    name={"category"}
                    mode="onChange"
                    >
                        <option value="Blog">Blogs</option>
                        <option value="Enterprise">Enterprises</option>
                        <option value="Project">Projects</option>
                    </select>

                </div>
                
                <div>
                <textarea 
                ref={register}
                name={"description"}
                placeholder={"Description"}
                type="text"
                />
                </div>

                {isLoading === true ? null : <Uploader componentConfig={componentConfig} djsConfig={djsConfig}/>}
                

                <div>
                    <button type="submit">Save</button>
                </div>

            </form>
        </div>
    )
};