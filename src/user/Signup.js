import React, { Component } from 'react';


class Signup extends Component {
    // Local state will hold user input such as username, email, password, etc.
    constructor () {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    render () {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <form>
                    <div className="signUpForm">
                        <lable className="textMuted">Name</lable>
                        <input className="formControl" type="text"/>
                    </div>
                    <div className="signUpForm">
                        <lable className="textMuted">Email</lable>
                        <input className="formControl" type="email"/>
                    </div>
                    <div className="signUpForm">
                        <lable className="textMuted">Password</lable>
                        <input className="formControl" type="password"/>
                    </div>
                    <button className="signUpBtn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Signup;
