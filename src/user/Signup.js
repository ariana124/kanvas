import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signup } from '../auth';
import '../styling/profile.scss';


class Signup extends Component {
    // Local state will hold user input such as username, email, password, etc.
    constructor () {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            redirectToSignin: false
        }
    }

    // This is a higher order function: a function that returns another function. We need this to handle events.
    handleChange = name => event => {
        // When there's a change happening in user signup input it will clear the old errors.
        this.setState({error: ""});
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        // By default when the user clicks the submit button the page refreshes so that's why we're disabling it.
        event.preventDefault()
        const { name, email, password } = this.state;
        const user = { name, email, password };
  
        // This handles errors when the user is signing up. (Eg. Email is already in use.)
        signup(user).then(data => {
            if (data.error) {
                this.setState({error: data.error});
            } else {
                this.setState ({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true,
                    redirectToSignin: true
                });
            }
        });
    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} className="form-control" type="text" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} className="form-control" type="email" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} className="form-control" type="password" value={password}/>
            </div>
            <button onClick={this.clickSubmit} className="postBtn">Join Now</button>
        </form> 
    )

    render () {
        const {name, email, password, error, open, redirectToSignin} = this.state;

        if (redirectToSignin) {
            return <Redirect to={`/signin`}/>
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create your account today!</h2>

                {/* This div will display error messages if there are issues when the user is signing up. */}
                <div className="alert alert-danger" style={{ display: error ? "" :" none" }}>{error}</div>

                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default Signup;
