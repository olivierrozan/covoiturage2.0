const Sequelize = require('sequelize');
const seq = require('../config/database').initDatabase(Sequelize);
const Offer = require('../models/Offers').initOffersModel(seq, Sequelize);

export let getMyOffers = (app) => {
    
    app.get("/profile/myoffers", (req, res) => {
        // res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        console.log('** MES OFFRES **');
        Offer.findAll({ where: { idUser: 5 } }).then( offers => {
            return res.json({ offers: offers });
        });
    });
}