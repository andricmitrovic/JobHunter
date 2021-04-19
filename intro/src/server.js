// const http = require('http');
// const app = require('./app.js');

// const port = process.env.PORT || 3000;

// try{

//   const server = http.createServer(app);

//   server.listen(port, () => {
//     console.log(`Aplikacija je aktivna na adresi http://localhost:${port}`);
//   });
// }
// catch(error)
// {
//   console.log('Server neuspesno pokrenut')
//   console.error(error);
// }

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pzveb:<password>@cluster0.r6adq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



// var mongoose = require('mongoose')
// var express = require('express')
// var bodyParser = require("body-parser")

// //Naziv baze
// var mongoDB = "mongodb://localhost:27017/JobHunter";

// // Unutar baza bi imamo kolekcije: student, companija...
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, response){
//   if (err){
//     console.log("Error in connection");
//   }else{

//     console.log("Connected! ");
//   }
// });

// var app = express();

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http:/localhost4200');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
//   res.setHeader('Content-Type', 'text/plain');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.end(JSON.stringify(req.body, null, 2))
// });


