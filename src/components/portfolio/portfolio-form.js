import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Drop from './drop-hook';

export default function PortfolioForm () {

    const {register, handleSubmit } = useForm();

    const [isLoading, changeLoad] = useState(true)
    

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

    const getImageData = (data) => {
        console.log("Data ported back from child component",data)
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
                <div className="dropper-wrapper">
                    <Drop name={"Thumbnail"} dataCollection={getImageData}/>
                    <Drop name={"Banner"} dataCollection={getImageData}/>
                    <Drop name={"Logo"} dataCollection={getImageData}/>
                </div>

                <div>
                    <button type="submit">Save</button>
                </div>

            </form>
        </div>
    )
};