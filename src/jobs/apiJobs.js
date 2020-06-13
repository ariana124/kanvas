export const getJobs = () => {
  return (
    fetch(`https://jobs.github.com/positions.json?description=python&location=new+york`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};
