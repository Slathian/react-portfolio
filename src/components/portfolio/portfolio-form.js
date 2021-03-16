import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { DevTool } from "@hookform/devtools";

import Drop from './drop-hook';

// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// import { useDropzone } from "react-dropzone";
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// function Dropzone(props) {
//     const { onChange } = props;
//     const { getRootProps, getInputProps } = useDropzone();
  
//     return (
//       <div {...getRootProps()}>
//         <input {...getInputProps({ onChange })} />
//         <p>- Drag 'n' Drop file here -</p>
//       </div>
//     );
//   }

export default function PortfolioForm () {

    const {register, control, handleSubmit } = useForm({
        // mode: 'onSubmit',
        // reValidateMode: 'onChange',
        // defaultValue: {},
    });

    const [isLoading, changeLoad] = useState(true)
    const [thumbImage, changeThumb] = useState({thumb_image_url: []})
    const [bannerImage, changeBanner] = useState({banner_image_url: []})
    const [logoImage, changeLogo] = useState({logo_url: []})
    
    

    function onSubmit(data) {
        const mergedData = {
            ...data,
            ...thumbImage,
            ...bannerImage,
            ...logoImage
        };

        axios.post("https://joshuaangelo.devcamp.space/portfolio/portfolio_items",
            mergedData,
            { withCredentials: true }
        ).then((response) => {
            console.log(mergedData);
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
                    name={"name"}
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
                    <Controller
                    name="thumb_image_url"
                    control={control}
                    render={({ onChange }) => <Drop 
                            name={"Thumb Image"} 
                            dataCollection={getImageData} 
                            onChange={onChange} 
                            change={changeThumb}
                            keyName={"thumb_image_url"}
                        />}
                    />
                    <Controller
                    name="banner_image_url"
                    control={control}
                    render={({ onChange }) => <Drop 
                            name={"Banner Image"} 
                            dataCollection={getImageData} 
                            onChange={onChange}
                            change={changeBanner}
                            keyName={"banner_image_url"}
                        />}
                    />
                    <Controller
                    name="logo_url"
                    control={control}
                    render={({ onChange }) => <Drop 
                            name={"Logo"} 
                            dataCollection={getImageData} 
                            onChange={onChange}
                            change={changeLogo}
                            keyName={"logo_url"}
                        />}
                    />
                </div>

                <div>
                    <button type="submit">Save</button>
                    <DevTool control={control} />
                </div>

            </form>
        </div>
    )
};