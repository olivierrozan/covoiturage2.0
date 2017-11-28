const LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

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

export let pass = (passport) => {
    const User = seq.define('user', {
        email: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        adresse: {
            type: Sequelize.STRING
        },
        codePostal: {
            type: Sequelize.STRING
        },
        ville: {
            type: Sequelize.STRING
        },
        tel: {
            type: Sequelize.STRING
        },
        voiture: {
            type: Sequelize.STRING
        },
        places: {
            type: Sequelize.INTEGER
        }
    }, {
            freezeTableName: true,
            timestamps: false
        });

    User.sync({ force: false }).then(() => {
        console.log('Nice! Database looks fine');
    }).catch(function (err) {
        console.log(err, "Something went wrong with the Database Update!")
    });

    passport.serializeUser((user, done) => {
        console.log('**SER**', user.id);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('**DESER**', id);
        User.findById(id).then((user) => {
            done(null, user.get());
        });
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
                    username: 'aaa',
                    password: userPassword,
                    nom: req.body.lastname,
                    prenom: req.body.firstname,
                    adresse: 'aaa',
                    codePostal: 'aaa',
                    ville: 'aaa',
                    tel: 'aaa',
                    voiture: 'aaa',
                    places: 66
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