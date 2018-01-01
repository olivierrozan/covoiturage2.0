export let initStepsModel = (seq, Sequelize) => {

    return seq.define('steps', {
        adresse: {
            type: Sequelize.STRING
        },
        codePostal: {
            type: Sequelize.STRING
        },
        ville: {
            type: Sequelize.STRING
        },
        date_etape: {
            type: Sequelize.DATE
        }

    }, {
            freezeTableName: true,
            timestamps: false
        });
}