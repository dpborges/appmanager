const express = require('express');

var dpbutils  = require("./utils/dpbutils");
var apm       = require("./bo/AppManager");


var app = express();

// THIS IS MIDDLEWARE THAT ALSO GETS THE API GATEWAY EVENT CONTEXT
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
app.use(awsServerlessExpressMiddleware.eventContext())


app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.post('/application/settings', (req, res) => {
  var data = "";
  console.log("LOGMESSAGE: " + "Creating AppManager Object");
  var appMan = new apm.AppManager("db0011");
  appMan.createSettings("Home Maintenance Checklist").then(function (data) {
    console.log("LOGMESSAGE: " + "In the Create Settings THEN Block");
    console.log(data);
    res.send(data);
  });
});



// sample code used to get gateway event context
app.get('/gatewaycontext', (req, res) => {
  var event   = req.apiGateway.event;
  var context = req.apiGateway.context;
  console.log("API GATEWAY CONTEXT");
  res.json(event);
})

app.listen(3000);

module.exports = app
