const express = require("express");
const app = express();
const passport = require('passport');
const expressSession = require('express-session');
const bodyParser = require("body-parser");

const Sequelize = require('sequelize');
const seq = require('./config/database').initDatabase(Sequelize);

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
require('./config/passport.ts').pass(passport, seq, Sequelize);

app.use(flash());

const route = require('./app/routes.ts');
route.allRoutes(app, passport, urlencodedParser, seq, Sequelize);

app.use((req, res, next) => {
    
    res.status(404).send('Page introuvable ! Contactez l\'administrateur du site');
    next();
});

app.listen(9300);