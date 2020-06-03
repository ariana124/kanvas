import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';


class Profile extends Component {
    constructor() {
        super()
        this.state= {
            user: "",
            redirectToSignin: false
        }
    }

    // A lifecycle method (?), when this component mounts we get the userId to make a GET request to the backend.
    componentDidMount() {
        const userId = this.props.match.params.userId;
        fetch (`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
            // This returns the json response with the user's information.
            .then(response => {
                return response.json();
            })

            // This redirects the user to the signin component if they're not authenticated.
            .then(data => {
                if (data.error) {
                    this.setState({ redirectToSignin: true })
                } else {
                    this.setState({ user: data });
                }
            })
    };

    render() {
        const redirectToSignin = this.state.redirectToSignin;
        if (redirectToSignin) return <Redirect to="/signin "/>;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                    <p> Hello {isAuthenticated().user.name}</p>
                    <p> Email: {isAuthenticated().user.email}</p>
                    <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
            </div>
        )
    }
}

export default Profile;
