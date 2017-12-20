const headers = require('../config/header');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');

export let postRegister = (app, seq, Sequelize, passport) => {

    app.post('/register', (req, res, next) => {

        headers.setHeaders(res);

        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }
        console.log("body parsing", req.body);

        passport.authenticate('local-register', (err, user) => {
            console.log('*-register-*', user.dataValues);
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
                        } else {
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        }

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
}