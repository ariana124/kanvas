import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../images/profilepic.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
    };
  }

  // a method to check follow
  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ user: data, following: !this.state.following });
        }
      });
  };

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      // This redirects the user to the signin component if they're not authenticated.
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
      }
    });
  };

  // A lifecycle method (?), when this component mounts we get the userId to make a GET request to the backend.
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  /* This redirects the user to their profile page when viewing another user's profile page and they decide to
       click the link to their own profile. */
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin " />;

    // If the user has a profile picture then it displays that photo, otherwise it displays the default profile photo.
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              className="img-thumbnail"
              style={{ height: "300px", width: "auto" }}
              src={photoUrl}
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
          </div>
          <div className="col-md-6">
            <div className="lead mt-2">
              <p> Hello {user.name}</p>
              <p> Email: {user.email}</p>
              <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>
            {/* This checks if the user is authenticated and it matches the current user it will display the edit and delete buttons. */}
            {isAuthenticated().user &&
              isAuthenticated().user._id === user._id ? (
                <div className="d-inline-block">
                  {/* Might need to add the /api route later. */}
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${user._id}`}
                  >
                    Edit Profile
                  </Link>
                  <DeleteUser userId={user._id} />
                </div>
              ) : (
                  <FollowProfileButton
                    following={this.state.following}
                    onButtonClick={this.clickFollowButton}
                  />
                )}
          </div>
        </div>

        <div className="row">
          <div className="col md-12 mt-4">
            <hr />
            <p className="lead">{user.about}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
