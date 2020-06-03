import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import DefaultProfile from '../images/profilepic.jpg';
import DeleteUser from './DeleteUser';


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

    /* This redirects the user to their profile page when viewing another user's profile page and they decide to
       click the link to their own profile. */
    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    };

    render() {
        const {redirectToSignin, user} = this.state;
        if (redirectToSignin) return <Redirect to="/signin "/>;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                            <img 
                                className="card-img-top" 
                                src={DefaultProfile} 
                                alt={user.name}
                                style={{ width: '100%', height: '25vw', objectFit: 'cover' }}
                            />
                    </div>
                    <div className="col-md-6">
                        <div className="lead mt-2">
                            <p> Hello {user.name}</p>
                            <p> Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {/* This checks if the user is authenticated and it matches the current user it will display the edit and delete buttons. */}
                        {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block mt-5">
                                {/* Might need to add the /api route later. */}
                                <Link to={`/user/edit/${user._id}`} className="btn btn-raised btn-success mr-5">
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={user._id} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
