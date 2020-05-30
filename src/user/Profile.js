import React, { Component } from 'react';
import { isAuthenticated } from '../auth';


class Profile extends Component {
    constructor() {
        super()
        this.state= {
            user: "",
            redirectToSignin: false
        }
    }

    // A lifecycle method (?), when this component mounts we get the userId to make a GET request later in the backend.
    componentDidMount() {
        console.log("userid from route params: {}", this.props.match.params.userId);
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                    <p> Hello {isAuthenticated().user.name}</p>
                    <p> Email: {isAuthenticated().user.email}</p>
            </div>
        )
    }
}

export default Profile;