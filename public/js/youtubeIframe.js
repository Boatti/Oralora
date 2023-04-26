function redirectYT(id) {

  fetch(`/popularityCount`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: id
  });
  sessionStorage.setItem("idYtb", id);
  window.location.href = "/";
  }
