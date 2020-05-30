import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// If the history and pathname match then it will change the color of the link to inidicate that it's active. 
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#000" };
        else return { color: "#fff" };
}


// We use next(a method) and another callback to redirect the user to another page such as login or home when they sign out.
export const signout = (next) => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    // Will eventually change to environment variable.
    return fetch("http://local:8080/signout", {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


// Will check if the user is authenticated, this means that there's a JSON web token in the localStorage.
export const isAuthenticated = () => {
    // This is just good practice, check that there's a window.
    if (typeof window == "undefined") return false;

    // We use getItem to get JSON web token because it contains the user information: username, email, etc.
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        // This means that the user is not authenticated.
        return false;
    }
}


// This is a functional component, not a class component since it doesn't need to have a state.
const Menu = ({history}) => (
    <div>
        {/* <Link> will render the components dynamically as opposed to <a href> tag which reloads the entire page. */}
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>
            {/* If the user is not authenticated then we only display the sign in and sign up components. */}
            {!isAuthenticated() && (
                <> {/* This is a react fragment. */}
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>
                </>
            )}
            {/* If the user is authenticated then we display the sign out component. */}
            {isAuthenticated() && (
                <li className="nav-item">
                    {/* We use the a tag because we're not trying to navigate the user to another component. */}
                    <a href className="nav-link" style={(isActive(history, "/signup"), {cursor: "pointer"})} onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                </li>
            )}
        </ul>
    </div>
);

/* withRouter is a higher order component and all that means is it takes in another component as an argument.
   It will also give us access to props which in turn gives us access to the history object. */
export default withRouter(Menu);
