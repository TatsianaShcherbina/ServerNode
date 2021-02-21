    const md5 = require('md5'),
        query = require('../models/db.query'),
        config = require('../config/db.config'),

        create = (db) => {
        db.run(query.CREATE_USER,
            (err) => {
                if (err) {
                    console.log('Table already created')
                } else {
                    db.run(query.INSERT_USER, ["Tatsiana", "Shcherbina", "admin@example.com", new Date()])
                    db.run(query.INSERT_USER, ["Alex", "Ivanov", "user@example.com", new Date()])

                    console.log(query.createTable(config.table_user, config.columns_user, config.constraint_user))
                }
            });
    }

    module.exports = {create}


