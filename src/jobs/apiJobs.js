export const getJobs = () => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};
