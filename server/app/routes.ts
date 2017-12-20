
const headers = require('../config/header');

const register = require('./register.ts');
const signin = require('./signin.ts');
const profile = require('./profile.ts');

export let allRoutes = (app, passport, urlencodedParser, seq, Sequelize) => {
    
    const User = require('../models/Users').initUserModel(seq, Sequelize);
    
    register.postRegister(app, seq, Sequelize, passport);
    signin.postSignin(app, seq, Sequelize, passport);
    profile.getProfile(app, seq, Sequelize, passport, User);
}

function isLoggedIn(req, res, next) {
    
    headers.setHeaders(res);
    
    console.log("auth? ", req.isAuthenticated(), req.session);

    if (req.isAuthenticated()) {
        console.log("TRY HOME");
        return next();
    } else {
        console.log("NOT authenticated");
        res.writeHead(302, {
            Location: 'http://localhost:9200/#!/register'
        });
        res.end();
    }
    next();
}