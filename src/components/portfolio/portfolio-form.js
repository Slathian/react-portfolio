import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'


export default function PortfolioForm () {

    const {register, handleSubmit } = useForm();

    const [apiError, resetError] = useState("");
    // use this to update error calls

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
                    name={"selection"}
                    >
                        <option>Blogs</option>
                        <option>Enterprises</option>
                        <option>Projects</option>
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

                {/* <div>
                    <input 
                    ref={register}
                    type={"file"}
                    name={"image 1"}
                    />
                    <input 
                    ref={register}
                    type={"file"}
                    name={"image 2"}
                    />
                    <input 
                    ref={register}
                    type={"file"}
                    name={"image 3"}
                    />
                </div> */}

                <div>
                    <button type="submit">Save</button>
                </div>

            </form>
        </div>
    )
};