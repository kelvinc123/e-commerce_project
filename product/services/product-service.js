const dao = require('../daos/product-dao');
const {param, body, validationResult} = require('express-validator');

const validate = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return false;
    }
    return true;
}

module.exports = (app) => {
    const getOne = (req, res) => {
        let ok = validate(req, res);
        if (!ok) {
            return;
        }
        dao.getOne(req.params.id)
            .then(product => res.json(product))
            .catch(error => {
                console.log(error);
                res.send(500);
            });
    }

    const getAll = (req, res) =>
        dao.getAll()
            .then(products => res.json(products))
            .catch(error => {
                console.log(error);
                res.send(500);
            });

    const decreaseQuantity = (req, res) => {
        let ok = validate(req, res);
        if (!ok) {
            return;
        }
        dao.decreaseQuantity(req.params.id, req.body['quantity'])
            .then(status => res.send(status))
            .catch(error => {
                console.log(error);
                res.send(500);
            });
    }

    app.get('/api/products/:id',
        param('id').isAlphanumeric(),
        getOne);
    app.get('/api/products',
        getAll);
    app.put('/api/products/:id/decrease',
        body('quantity').isInt({gt: 0}),
        decreaseQuantity);
};
