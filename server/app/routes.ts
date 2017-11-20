export function allRoutes(app, passport, urlencodedParser) {
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

    app.post('/connexion', urlencodedParser, passport.authenticate('local-login', {
        successRedirect: 'http://localhost:9200/#!/home', // redirect to the secure profile section
        failureRedirect: 'http://localhost:9200/#!/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }), (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

    app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}