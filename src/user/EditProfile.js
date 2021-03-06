import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './apiUser';
import { Redirect } from 'react-router-dom';
import DefaultProfile from '../images/profilepic.png';


class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            error: "",
            redirectToProfile: false,
            fileSize: 0,
            loading: false,
            about: ""
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
        // This redirects the user to the signin component if they're not authenticated. 
            if (data.error) {
                this.setState({ redirectToProfile: true })
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                    error: ""
                 });
            }
        })
    };

    // A lifecycle method (?), when this component mounts we get the userId to make a GET request to the backend.
    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    };

    isValid = () => {
        const { name, email, password, fileSize } = this.state;
        if (name.length === 0) {
            this.setState({ error: "Name is required.", loading: false });
            return false;
        }
        // Checks if email is valid using a regular expression: email@domain.com.
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ error: "A valid email is required.", loading: false });
            return false;
        }
        // Makes sure the password length is at least 6 characters long.
        if (password.length >= 1 && password.length <= 5) {
            this.setState({ error: "Password must be at least 6 characters long.", loading: false });
            return false;
        }
        // Checks to make sure the file size is less than 200 KB.
        if (fileSize > 200000) {
            this.setState({ error: "File size is too big, must be less than 200 KB.", loading: false });
            return false;
        }
        return true;
    }

    // This is a higher order function: a function that returns another function. We need this to handle events.
    handleChange = name => event => {
        // Clears the error when the user changes any of the input.
        this.setState({ error: "" })
        // If the name matches the photo then we want to get the file, otherwise it grabs the event.target.value
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        // If the name is photo then we get the file size, otherwise the default file size is 0.
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        // Sets the userData with the new updated information so we can send it to the backend.
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        // By default when the user clicks the submit button the page refreshes so that's why we're disabling it.
        event.preventDefault();
        this.setState({ loading: true});

        if (this.isValid()) {      
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    updateUser(data, () => {
                        this.setState({ redirectToProfile: true });
                    });
                }
            });
        }

    };

    signupForm = (name, email, password, about) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input onChange={this.handleChange("photo")} className="form-control" type="file" accept="image/*"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} className="form-control" type="text" value={name}/>
            </div>

            <div className="form-group">
                <label className="text-muted">About</label>
                <input onChange={this.handleChange("about")} className="form-control" type="text" value={about}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} className="form-control" type="email" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} className="form-control" type="password" value={password}/>
            </div>
            <button onClick={this.clickSubmit} className="postBtn">Update</button>
        </form> 
    )

    render() {
        const {
            id,
            name,
            email,
            password,
            error,
            redirectToProfile,
            loading,
            about
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`}/>;
        }

        // If the user has a profile picture then it displays that photo, otherwise it displays the default profile photo.
        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

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
                    src={photoUrl}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    alt={name}
                />

                {this.signupForm(name, email, password, about)}
            </div>
        )
    }
}

export default EditProfile;
