const headers = require('../config/header');

export let getMyOffersDetails = (app, seq, Sequelize) => {
    const Offers = require('../models/Offers').initOffersModel(seq, Sequelize);
    const Steps = require('../models/Steps').initStepsModel(seq, Sequelize);
    const Users = require('../models/Users').initUserModel(seq, Sequelize);

    const Offers2Steps = seq.define('offers2steps', {
        offerId: {
            type: Sequelize.INTEGER
        },
        stepId: {
            type: Sequelize.INTEGER
        }
    }, {
            freezeTableName: true,
            timestamps: false
        });

    const Steps2Users = seq.define('steps2users', {
        stepId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        }
    }, {
            freezeTableName: true,
            timestamps: false
        });

    app.get("/profile/myoffersdetails", (req, res) => {

        headers.setHeaders(res);
        console.log('** DETAILS **', req.query.id);

        Offers.belongsToMany(Steps, { through: Offers2Steps });
        Steps.belongsToMany(Offers, { through: Offers2Steps });

        Users.belongsToMany(Steps, { through: Steps2Users });
        Steps.belongsToMany(Users, { through: Steps2Users });

        Offers.findAll({
            include: [{
                model: Steps,
                include: [{
                    model: Users
                }]
            }]
        }, { where: { id: req.query.id } }).then(offers => {
            let o = {};
            offers.map((el, index, array) => {
                if (el.dataValues.id == req.query.id) {
                    o =  el;
                } else {
                    delete el.dataValues;
                }
            });
            return res.json({ offers: o });
        });
    });
}