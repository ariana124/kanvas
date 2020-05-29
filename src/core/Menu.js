import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// If the history and pathname match then it will change the color of the link to inidicate that it's active. 
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#000" };
        else return { color: "#fff" };
}

// This is a functional component, not a class component since it doesn't need to have a state.
const Menu = ({history}) => (
    <div>
        {/* <Link> will render the components dynamically as opposed to <a href> tag which reloads the entire page. */}
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
            </li>
        </ul>
    </div>
);

/* withRouter is a higher order component and all that means is it takes in another component as an argument.
   It will also give us access to props which in turn gives us access to the history object. */
export default withRouter(Menu);
