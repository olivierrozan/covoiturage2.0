const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

export let pass = (passport, seq, Sequelize) => {
    
    const User = require('../models/Users').initUserModel(seq, Sequelize);
    
    User.sync({ force: false }).then(() => {
        console.log('Nice! Database looks fine');
    }).catch(function (err) {
        console.log(err, "Something went wrong with the Database Update!")
    });

    passport.serializeUser((user, done) => {
        console.log('**SER**', user.id);
        done(null, user.id);
    });

    passport.deserializeUser((user, done) => {
        console.log('**DESER**', user.id);
        // User.findById(user.id).then((user) => {
            done(false, user);
        // });
    });

    passport.use('local-register', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => {
        let generateHash = (password) => {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        User.findOne({ where: { email: req.body.email } }).then((user) => {

            if (user) {
                return done(null, false, { message: 'Oops! Wrong password.' });
            } else {
                // if there is no user with that username
                // create the user
                let userPassword = generateHash(req.body.password);
                let newUserMysql = {
                    email: req.body.email,
                    password: userPassword,
                    nom: req.body.lastname,
                    prenom: req.body.firstname,
                    adresse: '',
                    codePostal: '',
                    ville: '',
                    tel: '',
                    voiture: '',
                    places: 4
                };

                User.create(newUserMysql).then((newUser, created) => {
                    return done(null, newUser ? newUser : false);
                });
            }
        });
    })
    );

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        User.findOne({ where: { email: email } }).then((user, err) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!bcrypt.compareSync(password, user.get().password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            return done(null, user.get());
        }).catch((err) => {
            console.log("Error:", err);
            return done(null, false, { message: 'Something went wrong with your Signin' });
        });
    }));
}