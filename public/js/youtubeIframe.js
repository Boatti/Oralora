async function redirectYT(id) {

  await fetch(`/popularityCount`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: id
  }).then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error("Popularity error", error);
  });
  sessionStorage.setItem("idYtb", id);
  window.location.href = "/";
  }
