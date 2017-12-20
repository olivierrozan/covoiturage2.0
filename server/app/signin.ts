const headers = require('../config/header');

export let postSignin = (app, seq, Sequelize, passport) => {
    
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
}