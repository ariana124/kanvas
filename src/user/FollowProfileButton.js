import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";
import '../styling/profile.scss';


class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <div className="d-inline-block">
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className="followBtn mr-5"
          >
            Follow
          </button>
        ) : (
          <button
            onClick={this.unfollowClick}
            className="unfollowBtn"
          >
            Unfollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
