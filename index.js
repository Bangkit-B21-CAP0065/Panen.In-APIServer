const express = require('express');

// set up express app
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');

// get local ip
var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}


//app.use(function(req, res, next) {
//      if ((req.get('X-Forwarded-Proto') !== 'https')) {
//        res.redirect('https://' + req.get('Host') + req.url);
//      } else
//        next();
//    });

// use body-parser middleware
app.use(express.json({ limit: '100MB'}));

// route handler
app.use('/api', require('./routes/api'));

// redirect `/` to `/api/test`
app.get('/', (req, res) => {
	  res.redirect('/api/test');
});

// error handling
app.use(function(err, req, res, next){
  console.log(err);
  res.status(422).send({error: err.message});
});

// Start server
app.listen(process.env.port || 80, function(){
        console.log('HTTP server running on port 80\n');
});
console.log("\nLocal IP:")
console.log(addresses);
