export let initUserModel = (seq, Sequelize) => {

    return seq.define('users', {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        adresse: {
            type: Sequelize.STRING
        },
        codePostal: {
            type: Sequelize.STRING
        },
        ville: {
            type: Sequelize.STRING
        },
        tel: {
            type: Sequelize.STRING
        },
        voiture: {
            type: Sequelize.STRING
        },
        places: {
            type: Sequelize.INTEGER
        }
    }, {
            freezeTableName: true,
            timestamps: false
        });
}