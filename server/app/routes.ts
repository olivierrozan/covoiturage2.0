export let allRoutes = (app, passport, urlencodedParser) => {
    // app.post("/connexion", urlencodedParser, (req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     try {
    //         req.body = JSON.parse(Object.keys(req.body)[0]);
    //     } catch (err) {
    //         req.body = req.body;
    //     }

    //     // allEntries.getAll(seq, req.body).then((response) => {
    //     //     res.send(JSON.stringify(response));
    //     // });
    // }, passport.authenticate('local-login', {
    //     successRedirect: 'http://localhost:9200/#!/home',
    //     failureRedirect: 'http://localhost:9200/#!/signup',
    //     failureFlash: true
    // }(req, res, next) => {
    //     res.redirect('/home');
    // }));

    app.post('/signup', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }
        console.log("body parsing", req.body);

        passport.authenticate('local-signup', function (err, user) {
            if (err) { 
                return next(err); 
            }
            if (!user) { 
                return res.json({ message: 'Duplicate' }); 
            } else {
                return res.json({ message: 'Created' }); 
            }
        })(req, res, next);
    });

    app.post('/connexion', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }
        console.log("body parsing", req.body);

        passport.authenticate('local-login', {
            successRedirect: 'http://localhost:9200/#!/home', // redirect to the secure home section
            failureRedirect: 'http://localhost:9200/#!/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })(req, res, next);
    });

    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            console.log("BYE");
            res.redirect('http://localhost:9200/#!/signup');
            // res.writeHead(302, {
            //     Location: 'http://localhost:9200/#!/signup'
            // });
        });
        //req.logout();
        //res.redirect('http://localhost:9200/#!/signup');

    });
}

// route middleware to make sure
let isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}