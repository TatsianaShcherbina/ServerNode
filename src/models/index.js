const sqlite3 = require('sqlite3').verbose(),
    config=require('../config/db.config'),
    loader = require('../loaders/data.loader');



const constructor = new sqlite3.Database(config.source, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQLite database.')
    }
});

loader.create(constructor)

const database={};

database.connect = constructor;

module.exports = database;
