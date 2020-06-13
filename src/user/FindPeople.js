import React, { Component } from 'react';
import { findPeople, follow } from './apiUser';
import DefaultProfile from '../images/profilepic.jpg';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import '../styling/users.scss';


class FindPeople extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                });
            }
        });
    };

    renderUsers = (users) => (
        <div className="row">
            {/* This takes each user name and displays it on the user page. Will have to update the response nodeapi
            /controllers/users.js allUsers method once KP merges the backend.*/}
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                    {/* If there's an error when displaying the user's profile image, it displays the default image instead. */}
                    <img 
                        className="img-thumbnail"
                        style={{height: "300px", width: "300px"}}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                    {/*    <p className="card-text">The user's bio or short self intro would go here.</p>  */}
                        <Link to={`/user/${user._id}`} className="viewProfileBtn">View Profile</Link>
                    </div>
                </div>
            ))}
        </div>
    )

    render() {
        const {users} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Find People</h2>
                {this.renderUsers(users)}
            </div>
        )
    }
}

export default FindPeople;