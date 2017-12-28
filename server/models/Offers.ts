export let initOffersModel = (seq, Sequelize) => {

    return seq.define('offers', {
        idUser: {
            type: Sequelize.INTEGER
        },
        jour: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
        heure: {
            type: Sequelize.STRING
        },
        adresseDepart: {
            type: Sequelize.STRING
        },
        codePostalDepart: {
            type: Sequelize.STRING
        },
        villeDepart: {
            type: Sequelize.STRING
        },
        adresseArrivee: {
            type: Sequelize.STRING
        },
        codePostalArrivee: {
            type: Sequelize.STRING
        },
        villeArrivee: {
            type: Sequelize.STRING
        },
        nombreDePlaces: {
            type: Sequelize.INTEGER
        },
        date_publication: {
            type: Sequelize.DATE
        }
    }, {
            freezeTableName: true,
            timestamps: false
        });
}