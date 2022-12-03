const dao = require('../daos/payment-dao');
const http = require('http');

const jackrabbit = require('jackrabbit');
const url = "amqps://uecfmmyx:va9u_CyOs6lWamXSEcAdBOAqtdPg9qpA@chimpanzee.rmq.cloudamqp.com/uecfmmyx";
const rabbit = jackrabbit(url);
const exchange = rabbit.default();
const paymentQueue = exchange.queue({name: 'payment', durable: true});

const consume = () => {
    paymentQueue.consume(onMessage);
}

async function onMessage(data, ack, nack) {
    let payment;
    try {
        payment = JSON.parse(data);
    } catch (error) {
        console.log(error);
        return;
    }
    dao.add(payment)
        .then(() => {
            console.log("\nSaved " + JSON.stringify(payment));
            ack()
            payment['products'].forEach(product => {
                updateProduct(product['id'], product['quantity'])
            });
        })
        .catch(error => {
            console.log("\nFailed to save " + JSON.stringify(payment) + ": " + error);
            nack({
                requeue: false
            });
        });
}

const updateProduct = (id, quantity) => {
    let headers = {
        'Content-Type': 'application/json',
    };

    let options = {
        host: 'localhost',
        port: process.env.PRODUCT_PORT,
        path: `/api/products/${id}/decrease`,
        method: 'PUT',
        headers: headers
    };

    let req = http.request(options, (res) => {
        console.log('Update product: ' + id + ', STATUS: ' + res.statusCode);
    });

    req.on('error', (e) => {
        console.log("Failed to update product " + id + ": " + e);
    });

    req.write(JSON.stringify({"quantity":quantity}));
    req.end();
}

module.exports = {
    consume,
};
