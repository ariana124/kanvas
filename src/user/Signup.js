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
    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
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
                    <button className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Signup;
