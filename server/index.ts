const express = require("express");
const session = require("cookie-session");
const bodyParser = require("body-parser");

const passport = require('passport');
const expressSession = require('express-session');

//const allEntries = require("./connexion.ts");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const p = require('./config/passport.ts');
p.pass(passport);

const urlencodedParser = bodyParser.urlencoded({ extended: true });
const app = express();

app.use(expressSession({ secret: 'mySecretKey' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const route = require('./app/routes.ts');
route.allRoutes(app, passport, urlencodedParser);

app.use((req, res, next) => {
    res.setHeader("Content-Type", "text/html");
    /*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
    res.status(404).send('Page introuvable ! Contactez l\'administrateur du site');
    next();
});

app.listen(9300);