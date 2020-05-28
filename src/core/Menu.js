import React from 'react';
import { Link } from 'react-router-dom';

// This is a functional component, not a class component since it doesn't need to have a state.
const Menu = () => (
    <div>
        {/* <Link> will render the components dynamically as opposed to <a href> tag which reloads the entire page. */}
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
    </div>
);

export default Menu;