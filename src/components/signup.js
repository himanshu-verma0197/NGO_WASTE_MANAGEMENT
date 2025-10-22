import React, { useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Signup = () => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name, email, password })

        });
        const json = await response.json();
        if (json.authtoken) {
            localStorage.setItem('token', json.authtoken);
            history.push("/");
        } else {
            alert("Invali signup");
        }

    };
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Enter your name" />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange} placeholder="name@example.com" />
            </div>

            <div className="mb-3">
                <label htmlFor="Password" className="form-label">Password</label>
                <input type="password" id="Password5" className="form-control" name="password" minLength={5} required placeholder="Password" onChange={onChange} aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be atleast 5 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="cPassword5" className="form-label">Confirm Password</label>
                <input type="password" id="cPassword5" className="form-control" placeholder="Confirm Password" name="cpassword" onChange={onChange} />
            </div>

            <div className="mt-3">
                <button type="submit" className="btn btn-primary mb-3">SignUp</button>
            </div>
        </form>
    );
};

export default Signup;

