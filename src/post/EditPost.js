// A component to Edit Posts

import React, { Component } from 'react'
import {singlePost, update} from './apiPost'
import {isAuthenticated} from '../auth'
import { Redirect } from 'react-router-dom';
import DefaultPost from '../images/altpic.jpg';


class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            title: '',
            body: '',
            redirectToProfile: false,
            error: '',
            fileSize: 0
        }
    }

    init = (postId) => {
        singlePost(postId).then(data => {
        // This redirects the user to the signin component if they're not authenticated. 
            if (data.error) {
                this.setState({ redirectToProfile: true })
            } else {
                this.setState({
                    id: data._id,
                    title: data.title,
                    body: data.body,
                    error: "",
                    loading: false
                });
            }
        })
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId)
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 200000) {
            this.setState({ error: "File size is too big, must be less than 200kb",
            loading: false
            });
            return false;
        }

        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false});
            return false;
        }
        return true;
    };

    // This is a higher order function: a function that returns another function. We need this to handle events.
    handleChange = name => event => {
        // Clears the error when the user changes any of the input.
        this.setState({ error: "" })
        // If the name matches the photo then we want to get the file, otherwise it grabs the event.target.value
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        // If the name is photo then we get the file size, otherwise the default file size is 0.
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        // Sets the userData with the new updated information so we can send it to the backend.
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        // By default when the user clicks the submit button the page refreshes so that's why we're disabling it.
        event.preventDefault();
        this.setState({ loading: true});

        if (this.isValid()) {      
            const postId = this.state.id;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        photo: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    editPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input onChange={this.handleChange("photo")} className="form-control" type="file" accept="image/*"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={this.handleChange("title")} className="form-control" type="text" value={title}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={body}/>
            </div>
            <button onClick={this.clickSubmit} className="postBtn">Update Post</button>
        </form> 
    )

    render() {
        const {id, title, body, redirectToProfile, error, loading} = this.state

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`}/>;
        }


        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>

                <div className="alert alert-danger" style={{ display: error ? "" :" none" }}>{error}</div>

                {/* If loading is true then it displays loading..., else it returns an empty string(nothing). */}
                {loading ? (
                    <div className="jumbotron text-center">
                        <h6>Loading...</h6>
                    </div>
                    ) : ("")
                }

                <img 
                    className="img-thumbnail"
                    style={{height: "200px", width: "auto"}}
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${id}}`}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    alt={title}
                />

                {this.editPostForm(title, body)}
            </div>
        )
    }
}

export default EditPost
