
const bcrypt = require('bcrypt-nodejs');
const headers = require('../config/header');
const myOffers = require('./myOffers.ts');
const register = require('./register.ts');

export let allRoutes = (app, passport, urlencodedParser, seq, Sequelize) => {
    
    const User = require('../models/Users').initUserModel(seq, Sequelize);
    let generateHash = (password) => {
        return bcrypt.hashSync(password);
    };

    register.postRegister(app, seq, Sequelize, passport);
    

    app.post('/connexion', (req, res, next) => {
        headers.setHeaders(res);
        
        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }
        console.log("body parsing", req.body);

        passport.authenticate('local-signin', (err, user) => {
            if (user) {
                console.log('--user--', user.id);

                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    return res.json({ message: 'success', user: user });
                });
            }
        })(req, res, next);
    });

    app.get('/logout', (req, res) => {
        headers.setHeaders(res);
        
        req.session.destroy((err) => {
            console.log("BYE");
            //res.clearCookie('connect.sid');
            res.redirect('http://localhost:9200/#!/register');
        });
    });

    app.get("/profile"/*, isLoggedIn*/, (req, res) => {
        
        headers.setHeaders(res);
        
        // console.log("---\n***auth?*** ", req.isAuthenticated(), req.session);
        User.find({ where: { email: 'AAA@gmail.com' } }).then((user) => {
            return res.json({ user: user.get() });
        });
    });

    app.post('/changePassword', (req, res, next) => {
        
        headers.setHeaders(res);
        
        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }
        console.log("**body parsing** ", req.body);
        let userPassword = generateHash(req.body.newPassword);

        User.findOne({ where: { email: 'AAA@gmail.com' } }).then((user, err) => {
            if (bcrypt.compareSync(req.body.currentPassword, user.get().password)) {
                // update sequelize
                User.update(
                    { password: userPassword }, { where: { email: 'AAA@gmail.com' } }
                ).then(() => {
                    console.log('password change ok', userPassword);
                });
                console.log('password change ok', userPassword);
                return res.json({ message: 'success' });
            } else {
                console.log('Error password change: Invalid current password: ');
                return res.json({ message: 'error' });
            }

        }).catch((err) => {
            console.log("Error:", err);
        });
    });

    app.post('/updateProfile', (req, res, next) => {
        
        headers.setHeaders(res);
        
        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }
        console.log("body parsing", req.body);

        let user = req.body;

        delete user.id;
        delete user.password;

        // update sequelize
        User.update(
            user, { where: { email: 'AAA@gmail.com' } }
        ).then(() => {
            console.log('update profile ok');
        });
        console.log('Update profile ok');
        return res.json({ message: 'success' });
    });

    myOffers.getMyOffers(app, seq, Sequelize);
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