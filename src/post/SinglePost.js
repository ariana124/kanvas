import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { singlePost } from './apiPost'
import DefaultPost from '../images/castle.jpg';

class SinglePost extends Component {
    state = {
        post: ''
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({post: data})
            }
        })
    }

    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
        const posterName = post.postedBy ? post.postedBy.name : " Unknown"

        return (
            <div className="card-body">
                <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title} onError={i => i.target.src = `${DefaultPost}`}
                    className="img-thumbnail mb-3"
                    style={{ height: "300px", width: "100%", objectFit: 'cover' }}
                />
                <p className="card-text">{post.body}</p>
                <br/>
                <p className="font-italic mark">
                    Posted By <Link to={`${posterId}`}>{posterName}{" "}</Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <Link to={`/`} className="btn btn-raised btn-sm btn-primary">Back to Posts</Link>
            </div>
        )
    }
    render() {
        const {post} = this.state
        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
                {this.renderPost(post)}
            </div>
        )
    }
}

export default SinglePost
