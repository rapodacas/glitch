var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:in", function (request, response) {
  var input = request.params.in;
  var isNumber = /^\d+$/.test(input); 
  var date = new Date(isNumber ? Number(input)*1000 : input);
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var month = months[date.getUTCMonth()];
  response.send({
    unix: date.getTime()/1000,
    natural: month ? `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}` : null
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
