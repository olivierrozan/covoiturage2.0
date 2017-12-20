const Sequelize = require('sequelize');
const seq = require('../config/database').initDatabase(Sequelize);
const Offer = require('../models/Offers').initOffersModel(seq, Sequelize);
const headers = require('../config/header');

export let getMyOffers = (app) => {
    
    app.get("/profile/myoffers", (req, res) => {
        
        headers.setHeaders(res);
        
        console.log('** MES OFFRES **');
        Offer.findAll({ where: { idUser: 5 } }).then( offers => {
            return res.json({ offers: offers });
        });
    });
}