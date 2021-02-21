module.exports = app => {
    const router = require('express').Router(),
        users=require('../services/user.service');

    router.get('/test', users.test);

    router.get('/', users.findAll);

    router.get('/:id', users.findOne);

    router.post('/', users.create)

    router.patch('/:id', users.update )

    router.delete('/:id', users.deleteOne)

    router.get('*', users.notfound);

    app.use('/api/users', router);
};
