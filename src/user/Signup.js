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

    // This is a higher order function: a function that returns another function. We need this to handle events.
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        // By default when the user clicks the submit button the page refreshes so that's why we're disabling it.
        event.preventDefault()
        const { name, email, password } = this.state;
        const user = { name, email, password };

        // Another way to send an API request to the backend aside from axios.
        fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            // If post request is successful and a user is created in the backend(database) then we return the JSON response.
            .then(response => {
                return response.json()
            })
            // Else we return an error if there was one.
            .catch(err => console.log(err))
    };

    render () {
        const {name, email, password} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
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
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Signup;
