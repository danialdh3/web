let axios = require("axios");

axios.post('http://127.0.0.1:8037/x', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log("SUCCESS status:", response.status);
    console.log("SUCCESS headers:", response.headers);
    console.log("SUCCESS data:", response.data);
})
  .catch(function (error) {
    console.log("ERROR:", error);
  });