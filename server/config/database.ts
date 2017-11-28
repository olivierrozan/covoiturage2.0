export let initDatabase = (Sequelize) => {

    const db = new Sequelize('covoiturage', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    
    db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    return db;
}