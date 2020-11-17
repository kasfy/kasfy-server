#!/usr/bin/env node
/* The NodeJS Framework for Smart Back-End
   ▄█   ▄█▄    ▄████████    ▄████████    ▄████████ ▄██   ▄   
  ███ ▄███▀   ███    ███   ███    ███   ███    ███ ███   ██▄ 
  ███▐██▀     ███    ███   ███    █▀    ███    █▀  ███▄▄▄███ 
 ▄█████▀      ███    ███   ███         ▄███▄▄▄     ▀▀▀▀▀▀███ 
▀▀█████▄    ▀███████████ ▀███████████ ▀▀███▀▀▀     ▄██   ███ 
  ███▐██▄     ███    ███          ███   ███        ███   ███ 
  ███ ▀███▄   ███    ███    ▄█    ███   ███        ███   ███ 
  ███   ▀█▀   ███    █▀   ▄████████▀    ███         ▀█████▀  
  ▀ Author : S.Katheeskumar [https://katheesh.github.io] */

const express = require('express');
const cors    = require('cors');
const bodyParser = require("body-parser");
const chalk   = require('chalk');
const flash   = require('express-flash');
const moment  = require('moment');

const routes = require('../../../routes/web');
const env = require('dotenv').config({ path: '../../../.env' });

let app = express();

let public = __dirname.substring(0, __dirname.length-3) + 'public';

let app_root = '/';

app.use(cors());

//app.use(flash());

app.use(express.static(public));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use('/', routes);

app.use(function (request, response, next) {;
    request.helper  = helper;
  next();
});
app.disable('x-powered-by');

app.listen(process.env.PORT || 5050 || 5051, (err) => {
    
    console.log(chalk.green(`🌍 opshit development server started on http://127.0.0.1:${process.env.PORT}`));

    if (process.env.DB_TYPE == 'mysql'){
        console.log(chalk.blue('🛢  selected database type : mysql'));
        const mysql = require('../config/mysql')
    }

    if (process.env.DB_TYPE == 'mongodb'){
        console.log(chalk.blue('🛢  selected database type : mongodb'));
        const mongodb = require('../config/mongodb')
    }
});

module.exports = app;