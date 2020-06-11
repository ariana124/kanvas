export const create = (userId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = () => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "GET",
    })
      // This returns the json response with the user's information.
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};


export const singlePost = (postId) => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "GET",
    })
      // This returns the json response with the post information.
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};

export const listByUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const remove = (postId, token) => {
  return fetch (`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "DELETE",
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

export const update = (postId, token, post) => {
  return fetch (`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
      },
      body: post
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

// Like and unlike
export const like = (userId, token, postId) => {
  return fetch (`${process.env.REACT_APP_API_URL}/post/like`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, postId})
  })
      .then(response => {
          return response.json()
      })
      .catch(err => console.log(err))
}

export const unlike = (userId, token, postId) => {
  return fetch (`${process.env.REACT_APP_API_URL}/post/unlike`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, postId})
  })
      .then(response => {
          return response.json()
      })
      .catch(err => console.log(err))
}

// Comment and uncomment
export const comment = (userId, token, postId, comment) => {
  return fetch (`${process.env.REACT_APP_API_URL}/post/comment`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, postId, comment})
  })
      .then(response => {
          return response.json()
      })
      .catch(err => console.log(err))
}

export const uncomment = (userId, token, postId, comment) => {
  return fetch (`${process.env.REACT_APP_API_URL}/post/uncomment`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      // We need the comment id to remove the correct comment.
      body: JSON.stringify({userId, postId, comment})
  })
      .then(response => {
          return response.json()
      })
      .catch(err => console.log(err))
}
