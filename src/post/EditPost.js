import React, { Component } from 'react'

class EditPost extends Component {
    render() {
        return (
            <div>
                <h2>edit post</h2>
                {this.props.match.params.postId}
            </div>
        )
    }
}

export default EditPost
