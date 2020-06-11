import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { singlePost, remove, like, unlike } from './apiPost'
import DefaultPost from '../images/castle.jpg';
import { isAuthenticated } from '../auth';

class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false,
       // redirectToSignin: false,
        like: false,
        likes: 0
    }

    // Function that prevents the user from liking the same post more than once.
    checkLike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id
        // indexOf looks for the user in the likes array and if the user is found then it's a match.
        let match = likes.indexOf(userId) !== -1
        return match; // Returns true or false.
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes)
                })
            }
        })
    }

    // likeToggle function sends a PUT request to the backend when the like button is clicked.
    likeToggle = () => {
        // If the post is liked then when the user clicks, they unlike it, otherwise the user clicks and adds a like to the post.
        let callApi = this.state.like ? unlike : like

        const userId = isAuthenticated().user._id
        const postId = this.state.post._id
        const token = isAuthenticated().token

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    /* If it was true then it becomes false, and if it was false then it becomes true.
                       This is how it toggles the like unlike feature. */
                    like: !this.state.like, 
                    likes: data.likes.length
                })
            }
        })
    }

    deletePost = () => {
        const postId = this.props.match.params.postId
        const token = isAuthenticated().token
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToHome: true})
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?")
        if (answer) {
            this.deletePost();
        }
    };

    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
        const posterName = post.postedBy ? post.postedBy.name : " Unknown"

        const {like, likes} = this.state

        return (
            <div className="card-body">
                <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title} onError={i => i.target.src = `${DefaultPost}`}
                    className="img-thumbnail mb-3"
                    style={{ height: "300px", width: "100%", objectFit: 'cover' }}
                />

                <h3 onClick={this.likeToggle}>{likes} Like</h3>

                <p className="card-text">{post.body}</p>
                <br/>
                <p className="font-italic mark">
                    Posted By <Link to={`${posterId}`}>{posterName}{" "}</Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-sm btn-primary mr-5">Back to Posts</Link>
                    {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id &&
                    <>
                        <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-sm btn-warning mr-5">Update Post</Link>
                        <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger mr-5">Delete Post</button>
                    </>
                    }
                </div>
            </div>
        )
    }
    render() {
        if (this.state.redirectToHome) {
            return <Redirect to={`/`} />
        }
        const {post} = this.state
        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
                {/* If loading is true then it displays loading..., else it returns the post */}
                {!post ? <div className="jumbotron text-center">
                    <h6>Loading...</h6>
                </div> : (this.renderPost(post))}
            </div>
        )
    }
}

export default SinglePost
