import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


export default function(props) {

    const [emailInput, stateEmail] = useState("");
    const [passwordInput, statePassword] = useState("");

    const handleSubmit = (event) => {
        console.log(event);
    }



    return (
        <div>
            <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>


            <form onSubmit={handleSubmit()}>
                <input 
                type="email"
                name="emailInput"
                placeholder="your email"
                value={emailInput}
                onChange={event => stateEmail(event.target.value)}
                />
                <input 
                type="password"
                name="passwordInput"
                placeholder="password"
                value={passwordInput}
                onChange={event => statePassword(event.target.value)}
                />

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}