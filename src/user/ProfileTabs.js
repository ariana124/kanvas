import React, { Component } from 'react';

class ProfileTabs extends Component {
    render() {
        const {following, followers} = this.props
        return (
            <div>
                <div>following
                    {JSON.stringify(following)}
                </div> 
                <div>followers
                    {JSON.stringify(followers)}
                </div>
            </div>
        );
    }
}

export default ProfileTabs;