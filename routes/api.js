const fs = require('fs');
const express = require('express');
const router = express.Router();

const { spawn } = require('child_process');

// connection test
router.get('/test', function (req, res, next) {
  res.send({ status: "OK" });
});


////////////////////
// sample
router.get('/sample', function (req, res, next) {
  console.log('get /sample', req.query)
  res.send({
    sample1: "OK1",
    sample2: "OK2",
  });
});

////////////////////

// ml agent
// router.get('/map/', function (req, res, next) {
//   var dataToSend;
//   console.log('get /map', req.query)
//   // res.send("OK")
//   if (req.query.q == "H") {
//     console.log("Henon")
//     var python = spawn('python3', ['./mapgen/generateHenonMap.py', req.query.width, req.query.height]);
//   } else if (req.query.q == "A") {
//     console.log("Arnold")
//     var python = spawn('python3', ['./mapgen/generateArnoldMap.py', req.query.width, req.query.iteration]);
//   }
//
//   python.stdout.on('data', function (data) {
//     console.log('Pipe data from python script ...');
//     // dataToSend = data.toString();
//   });
//
//   python.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // send data to browser
//     a = fs.readFileSync("./out.txt", "utf8")
//     res.send(a)
//   });
// });
module.exports = router;
