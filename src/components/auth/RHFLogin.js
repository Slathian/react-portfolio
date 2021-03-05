import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { sha256, sha224 } from 'js-sha256';
import axios from 'axios';


export default function(props) {

    const {register, handleSubmit} = useForm();

    const [errorText, updateError] = useState("")

    const onSubmit =  data => {
        // data.password = sha256(data.password); --------> If I built the backend myself or this was not a class session, this line of code would be implemented so that we wouldn't store our users data. the first time we do this is if we were building out a registration application!
        // console.log(data);
        axios.post("https://api.devcamp.space/sessions",
        {
            client: {
                email: data.email,
                password: data.password
            }
        },
            { withCredentials: true }
        )
        .then(response =>{

            // console.log("response", response)
            
            if (response.data.status === 'created') {
                console.log(`Welcome in Josh`)
                props.handleSuccessfulAuth();
            } else {
                updateError("Wrong email or password")
                props.handleUnsuccessfulAuth();
                // console.log(props);
                resetValue()
            }
        })
        .catch(error => {
            console.log(`%cSome Error Occurred %c${error}`, "color: green; font-size: 1.5rem; font-weight: bold", "color: Red; font-size: 1.2rem; ");
            updateError("An error occured");
            props.handleUnsuccessfulAuth();
            // console.log(props);
            resetValue()
        })


    };

    const resetError = () => {
        updateError("")
    }

    const resetValue = () => {
        const _email = document.querySelector("body > div > div > div > div:nth-child(2) > div > div.right-column > div > form > input[type=email]:nth-child(1)")
        _email.value = ""

        const _password = document.querySelector("body > div > div > div > div:nth-child(2) > div > div.right-column > div > form > input[type=password]:nth-child(2)")
        _password.value = ""
    }

    return (
        <div>
            <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
            <h2>{errorText}</h2>


            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                ref={register}
                name="email"
                placeholder="Email"
                type="email"
                onChange ={resetError}
                />
                <input 
                ref={register}
                name="password"
                placeholder="password"
                type="password"
                onChange ={resetError}
                />

                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}