const headers = require('../config/header');

export let getMyOffersDetails = (app, seq, Sequelize) => {
    const Offer = require('../models/Offers').initOffersModel(seq, Sequelize);
    
    app.get("/profile/myoffersdetails/:id", (req, res) => {
        
        headers.setHeaders(res);
        console.log('** Detail **', req.params.id);

        Offer.findOne({ where: { id: req.params.id } }).then( offers => {
            return res.json({ offers: offers });
        });
    });
}