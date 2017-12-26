const headers = require('../config/header');
const myOffers = require('./myOffers.ts');
const myOffersDetails = require('./myOffersDetails.ts');
const bcrypt = require('bcrypt-nodejs');

let generateHash = (password) => {
    return bcrypt.hashSync(password);
};

export let getProfile = (app, seq, Sequelize, passport, User) => {

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
    myOffersDetails.getMyOffersDetails(app, seq, Sequelize);
}