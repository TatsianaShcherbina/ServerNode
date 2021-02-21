const query=require('../models/db.query'),
    config=require('../config/db.config'),
    md5 = require('md5'),
    database=require('../models').connect;

exports.findAll = (req, res, next) => {
    let params = []
    database.all(query.selectAll(config.table_user), params, (err, rows) => {
        if (err) {
            res.status(400).json({'error':err.message});
            return;
        }
        res.json({
            'message':'success',
            'data':rows
        })
    });
}

exports.findOne = (req, res, next) => {
    let params = [req.params.id]
    database.get(query.selectOne(config.table_user), params, (err, row) => {
        if (err) {
            res.status(400).json({'error':err.message});
            return;
        }
        res.json({
            'message':'success',
            'data':row
        })
    });
}

exports.create = (req, res, next) => {
    let errors=[]
    if (!req.body.email){
        errors.push('No email specified');
    }
    if (errors.length){
        res.status(400).json({'error':errors.join(',')});
        return;
    }
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        event_date : req.body.event_date
    },
        params =[data.first_name, data.last_name, data.email, data.event_date];
    database.run(query.INSERT_USER, params, function (err, result) {
        if (err){
            res.status(400).json({'error': err.message})
            return;
        }
        res.json({
            'message': 'success',
            'data': data,
            'id' : this.lastID
        })
    });
}

exports.update=(req, res, next) => {
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        event_date : req.body.event_date
    }

    database.run(
        query.UPDATE_USER,
        [data.first_name, data.last_name, data.email, data.event_date, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({'error': res.message})
                return;
            }
            res.json({
                message: 'success',
                data: data,
                changes: this.changes
            })
        });
}

exports.deleteOne=(req, res, next) => {
    database.run(
        query.DELETE_USER,
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({'error': res.message})
                return;
            }
            res.json({'message':'deleted', changes: this.changes})
        });
}

exports.test=(req, res, next) => {
    res.json({"message":"Ok"})
}

exports.notfound=(req, res, next) => {
    res.send(`
          404
    Page not found!
    `, 404)
}
