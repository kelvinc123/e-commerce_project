
# Payment Service

## Run

`PORT=<port> DB_USER=<db_user> DB_PASSWORD=<db_password>  PRODUCT_PORT=<product_service_port> node server.js`

## Message Queue

### Consumes messages with the following format

```
{
    "user": String,
    "products": [
        {
            "id": String,
            "price": Number,
            "quantity": Number
        },
        ...
    ],
    "cardNumber": String,
    "totalAmount": Number
}
```
