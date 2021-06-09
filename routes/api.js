const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const router = express.Router();

const { spawn } = require('child_process');

// connection test
router.get('/test', function (req, res, next) {
  console.log('get /test');
  res.send({ status: "OK" });
});


////////////////////

// panen
router.get('/panen', function (req, res, next) {
  console.log('get /panen', req.query)
  res.send([1.1, 1.2, 1.3, 1.4, 1.9]);
});



router.get('/harga', function (req, res, next) {
  console.log('get /harga', req.query);
  if (typeof req.query.crop == "undefined" || typeof req.query.kota == "undefined") {
    res.status(422).send({error: "Wilayah/crop tidak ditemukan"});
  } else {
    var result  = [];
    var path = req.query.kota + "_" + req.query.crop + ".csv";
    var bucket_path = "gs://panenin/" + path;
    console.log(bucket_path);
    var fetch =  spawn('gsutil', ['cp', bucket_path, '.'])
    fetch.on('exit', () => {
      console.log("fecthing bucket done");
      if (fs.existsSync(path)) {
        console.log("file exist");
        fs.createReadStream(path)
        .pipe(csv())
        .on('data', (row) => {
          if (typeof req.query.tahun == "undefined") {
            result.push(row);
            console.log(row);
          } else {
            if (row['tahun'] == req.query.tahun ) {
              result.push(row);
              console.log(row);
            }
          };
        })
        .on('end', () => {
          res.send(result);
        });
      } else {
        console.log("file does not exists");
        res.status(422).send({error: "Wilayah/crop tidak ditemukan"});
      }
    });
  }
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
