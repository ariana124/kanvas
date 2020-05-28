import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Signin extends Component {
    // Local state will hold user input such as email, password, etc.
    constructor () {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        };
    }

    // This is a higher order function: a function that returns another function. We need this to handle events.
    handleChange = name => event => {
        // When there's a change happening in user signin input it will clear the old errors.
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    // jwt = JSON word token, next = the callback function
    authenticate (jwt, next) {
        // Checks if the window object is available when the component is done rendering and mounting. (?)
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    };

    clickSubmit = event => {
        // By default when the user clicks the submit button the page refreshes so that's why we're disabling it.
        event.preventDefault()
        this.setState({loading: true})
        const { email, password } = this.state;
        const user = { email, password };

        // This handles errors when the user is signing in.
        this.signin(user).then(data => {
            if (data.error) {
                this.setState({error: data.error, loading: false})
            } else {
                // Authenticates the user and redirect user to another page.
                this.authenticate(data, () => {
                    this.setState({redirectToReferer: true})
                })
            }
        });

    };

    signin = user => {
        // Another way to send an API request to the backend aside from axios.
        return fetch("http://localhost:8080/signin", {
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
            // Else we return an error if the user wasn't created.
            .catch(err => console.log(err))
    }

    signinForm = (email, password) => (
        <form>
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
    )

    render () {
        const {email, password, error, redirectToReferer, loading} = this.state;
        
        // If user was able to sign in successfully then it redirects them to the home page.
        if (redirectToReferer) {
            return <Redirect to="/"/>
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Sign In</h2>

                {/* This div will display error messages if there are issues when the user is signing in. */}
                <div className="alert alert-danger" style={{ display: error ? "" :" none" }}>{error}</div>

                {/* If loading is true then it displays loading..., else it returns an empty string(nothing). */}
                {loading ? <div className="jumbotron text-center">
                    <h3>Loading...</h3>
                </div> :""}

                {this.signinForm(email, password)}
            </div>
        );
    }
}

export default Signin;
