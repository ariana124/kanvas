export const signup = user => {
    // Another way to send an API request to the backend aside from axios.
    return fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        // If post request is successful and a user is created in the backend(database) then we return the JSON response.
        .then(response => {
            return response.json();
        })
        // Else we return an error if the user wasn't created.
        .catch(err => console.log(err));
};

export const signin = user => {
    // Another way to send an API request to the backend aside from axios.
    return fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        // If post request is successful and a user is created in the backend(database) then we return the JSON response.
        .then(response => {
            return response.json();
        })
        // Else we return an error if the user wasn't created.
        .catch(err => console.log(err));
};

// We use next(a method) and another callback to redirect the user to another page such as login or home when they sign out.
export const signout = (next) => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    // Will eventually change to environment variable.
    return fetch("http://local:8080/api/signout", {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// jwt = JSON web token, next = the callback function
export const authenticate = (jwt, next) => {
    // Checks if the window object is available when the component is done rendering and mounting. (?)
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
};

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
};
