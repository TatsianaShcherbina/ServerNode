'use strict'

const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');

const db=require('./src/models');


const HTTP_PORT = 8000,
    CORS_OPTIONS = {
    origin: "http://localhost:8081"
};

app.use(cors(CORS_OPTIONS));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(upload.array());//теперь метод добавляния в один и тот же метод принимает и json и formdata
app.use(express.static('public'));

db.connect;

require('./src/api/user.routes')(app);

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});



