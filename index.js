// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// app.set('json spaces',2)
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res, next) => {
  const str = req.params.date;
  if (isNaN(str)) {
    var date = new Date(str);
    if (date.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } else {
      return res.json({
        unix: date.getTime(), utc:
          date.toUTCString()
      });
    }
  }
  if (!str) {
    var date = new Date();
    return res.json({
      unix: date.getTime(), utc:
        date.toUTCString()
    })
  }

  return res.json({ unix: new Date(Number(str)).getTime(), utc: new Date(Number(str)).toUTCString() });
})
app.get("/api", (req, res, next) => {
  var date = new Date();
  return res.json({
    unix: date.getTime(), utc:
      date.toUTCString()
  })

})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
