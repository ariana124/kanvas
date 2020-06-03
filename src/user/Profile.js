import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';

class Profile extends Component {
    constructor() {
        super()
        this.state= {
            user: "",
            redirectToSignin: false
        };
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
        // This redirects the user to the signin component if they're not authenticated. 
            if (data.error) {
                this.setState({ redirectToSignin: true })
            } else {
                this.setState({ user: data });
            }
        })
    };

    // A lifecycle method (?), when this component mounts we get the userId to make a GET request to the backend.
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    };

    render() {
        const {redirectToSignin, user} = this.state;
        if (redirectToSignin) return <Redirect to="/signin "/>;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5 mb-5">Profile</h2>
                            <p> Hello {isAuthenticated().user.name}</p>
                            <p> Email: {isAuthenticated().user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                    </div>
                    <div className="col-md-6">
                        {/* This checks if the user is authenticated and it matches the current user it will display the edit and delete buttons. */}
                        {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block mt-5">
                                {/* Might need to add the /api route later. */}
                                <Link to={`/user/edit/${user._id}`} className="btn btn-raised btn-success mr-5">
                                    Edit Profile
                                </Link>
                                <button className="btn btn-raised btn-danger">
                                    Delete Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;