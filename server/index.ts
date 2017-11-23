const express = require("express");
const app = express();
const passport = require('passport');
const expressSession = require('express-session');
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const session = require("cookie-session");

//const allEntries = require("./connexion.ts");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const p = require('./config/passport.ts');
p.pass(passport);

app.use(cookieParser());
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