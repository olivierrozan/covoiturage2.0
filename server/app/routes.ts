const nodemailer = require('nodemailer');

export let allRoutes = (app, passport, urlencodedParser) => {

    app.post('/signup', (req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }
        console.log("body parsing", req.body);

        passport.authenticate('local-signup', (err, user) => {
            console.log('*-register-*', user);
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({ message: 'Duplicate' });
            } else {
                nodemailer.createTestAccount((err, account) => {

                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: account.smtp.host,
                        port: account.smtp.port,
                        secure: account.smtp.secure,
                        auth: {
                            user: account.user,
                            pass: account.pass
                        },
                        logger: false,
                        debug: false // include SMTP traffic in the logs
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"No reply" <noreply@covoit.fr>', // sender address
                        to: '"Olivier Rozan" <rozan.olivier@gmail.com>', // list of receivers
                        subject: 'Inscription réussie', // Subject line
                        text: "Félicitations ! Vous êtes mantenant inscrit. Cliquez sur le lien suivant pour accéder à l'application", // plain text body
                        html: "<h3>Félicitations !<h3>" +
                            "<div>Vous êtes mantenant inscrit.</div>" +
                            "<div>Cliquez sur le lien suivant pour accéder à l'application:</div>"
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log('error sending mail');
                            console.log(error.message);
                            //return process.exit(1);
                        }
                        console.log('Message sent: %s', info.messageId);
                        // Preview only available when sending through an Ethereal account
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        // only needed when using pooled connections
                        transporter.close();
                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    });
                });

                return res.json({ message: 'Created' });
            }
        })(req, res, next);
    });

    app.post('/connexion', (req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }
        console.log("body parsing", req.body);

        passport.authenticate('local-login', (err, user) => {
            console.log('--user--', user.id);
            req.logIn(user, function (err) { // <-- Log user in
                return res.redirect('http://localhost:9200/#!/home');
            });
        })(req, res, next);
    });

    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            console.log("BYE");
            //res.clearCookie('connect.sid');
            res.redirect('http://localhost:9200/#!/signup');
        });
    });

    app.get("/home", isLoggedIn);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("TRY HOME", req.isAuthenticated());
        res.json({ session: true });
        return next();
    } else {
        console.log("NOT authenticated", req.isAuthenticated(), req.user);
        res.writeHead(302, {
            Location: 'http://localhost:9200/#!/signup'
        });
        res.end();
    }
}