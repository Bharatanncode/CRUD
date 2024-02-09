const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const CURD = require('./Route/Curd');
const Mongodbqurey = require('./Route/mongodbQureyPrectice');
const MulterUplodeFile = require('./Route/multerFileUplode');

const app = express();
app.use(cors());
app.use(express.json());

//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    console.log("Successfully connected to the Database");
  }).catch((error)=>{
    console.log("Could not connect to the database. Exiting now...", error);
})


app.use('/api',CURD);
app.use('/api',Mongodbqurey);
app.use('/api',MulterUplodeFile);


// const port = process.env.PORT ||8089;
// app.listen(port,()=>{
//   console.log(`server is the Running ${port}`);
// })

const port = process.env.PORT || 8089;
app.listen(port, 'localhost');
console.log('Server running at http://localhost:'+ port);
