const express = require("express");
const app = express();
const passport = require('passport');
const expressSession = require('express-session');
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser('mySecretKey'));
app.use(expressSession({
    secret: 'mySecretKey',
    resave: true, 
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

const flash = require('connect-flash');
require('./config/passport.ts').pass(passport);

app.use(flash());

const route = require('./app/routes.ts');
route.allRoutes(app, passport, urlencodedParser);

app.use((req, res, next) => {
    res.setHeader("Content-Type", "text/html");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    res.status(404).send('Page introuvable ! Contactez l\'administrateur du site');
    next();
});

app.listen(9300);