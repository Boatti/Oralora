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
    console.error("Une erreur s'est produite lors de la requête de popularité :", error);
  });
  sessionStorage.setItem("idYtb", id);
  window.location.href = "/";
  }
