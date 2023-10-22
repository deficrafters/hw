const unirest = require("unirest");
const express = require('express');
const bodyText = require('body-parser')

const app = express();
app.use(bodyText.urlencoded({extended:true})); //To use body parser with post request

//include all static files so we can use CSS
app.use(express.static( __dirname + '/public'));


//main page
app.get("/", function(req,res) {
	res.sendFile(__dirname +"/public/index.html" );
});

// Display the information when there is post request
app.post("/", function(request,response) {

  //Get the weather data
  const req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

  let city = request.body.city;
  // city = city + ", USA"  //Add country if needed

  req.query({
    "q": city,
    "lang": "en",
    "units": "imperial"
  });

// Update your API keys
  req.headers({
    "x-rapidapi-key": "b0ecde0aa7msh4000c55386b3d0ap1a619djsn5b8ac1b1b077",
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "useQueryString": true
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    response.send(res.body); //Update
  });


});

let port = process.env.PORT || 8002;
app.listen(port, function() {
    console.log ("Server running on port 8002");
})
