const unirest = require("unirest");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (request, response) => {
  const city = request.body.city;
  
  console.log({city})

  if (!city) {
    return response.status(400).json({ error: 'City is missing in the request body' });
  }

  const req = unirest("GET", `https://open-weather13.p.rapidapi.com/city/${city}`);
  req.query({
    "q": city,
    "lang": "en",
    "units": "imperial"
  });

  req.headers({
    "X-RapidAPI-Key": "3ff511dc1amsh2077b883c443528p124aa7jsn7c57d1e3f041",
    "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    "useQueryString": true
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    response.send(res.body);
  });
});

let port = process.env.PORT || 8002;
app.listen(port, function() {
    console.log("Server running on port " + port);
});
