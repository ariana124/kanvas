import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read } from './apiUser';


class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: ""
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
        // This redirects the user to the signin component if they're not authenticated. 
            if (data.error) {
                this.setState({ redirectToSignin: true })
            } else {
                this.setState({ id: data._id, name: data.name, email: data.email });
            }
        })
    };

    // A lifecycle method (?), when this component mounts we get the userId to make a GET request to the backend.
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    };

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
            </div>
        )
    }
}

export default EditProfile;
