const headers = require('../config/header');

export let getMyOffersDetails = (app, seq, Sequelize) => {
    const Offer = require('../models/Offers').initOffersModel(seq, Sequelize);

    app.get("/profile/myoffersdetails", (req, res) => {

        headers.setHeaders(res);
        console.log('** DETAILS **', req.query.id);

        Offer.findOne({ where: { id: req.query.id } }).then(offers => {
            return res.json({ offers: offers });
        });
    });
}