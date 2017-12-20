const headers = require('../config/header');

export let getMyOffers = (app, seq, Sequelize) => {
    const Offer = require('../models/Offers').initOffersModel(seq, Sequelize);
    
    app.get("/profile/myoffers", (req, res) => {
        
        headers.setHeaders(res);
        
        console.log('** MES OFFRES **');
        Offer.findAll({ where: { idUser: 5 } }).then( offers => {
            return res.json({ offers: offers });
        });
    });
}