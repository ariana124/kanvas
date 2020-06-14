export const getJobs = (searchterm, place) => {
  if (searchterm === "") {
    searchterm = "javascript"
  }
  if (place === "") {
    place = "san+francisco"
  }

  searchterm = searchterm.split(" ").join("+")
  place = place.split(" ").join("+")

  return (
    fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ searchterm, place })
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};
