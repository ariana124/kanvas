export const read = (userId, token) => {
    return fetch (`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        // This returns the json response with the user's information.
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
