var express = require("express");
var session = require("cookie-session");
var bodyParser = require("body-parser");
const Sequelize = require('sequelize');

var allEntries = require("./connexion.ts");

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var app = express();

const seq = new Sequelize('covoiturage', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

seq
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app
    .post("/connexion", urlencodedParser, function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        try{
            req.body = JSON.parse(Object.keys(req.body)[0]);
        }catch(err){
            req.body = req.body;
        }
        
        allEntries.getAll(seq, req.body).then((response) => {
            res.send(JSON.stringify(response));
        });
    })

    .use((req, res, next) => {
        res.setHeader("Content-Type", "text/html");
        res.header("Access-Control-Allow-Origin", "*");
        res.status(404).send('Page introuvable ! Contactez l\'administrateur du site');
    });

app.listen(9300);