export const read = (userId, token) => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      // This returns the json response with the user's information.
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};

// user in this case is actually the userData from the EditProfile component.
export const update = (userId, token, user) => {
  console.log("USER DATA UPDATE: ", user);
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const remove = (userId, token) => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      // This returns the json response with the user's information.
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};

export const list = () => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "GET",
    })
      // This returns the json response with the user's information.
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};

export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};

export const follow = (userId, token, followId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, followId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const unfollow = (userId, token, unfollowId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, unfollowId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
