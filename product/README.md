
# Product Service

## Run

`PORT=<port> DB_USER=<db_user> DB_PASSWORD=<db_password> node server.js`

## API

---

### Get a product

GET endpoint: `/api/products/:id`

Returns:
```
{
    "_id": String,
    "title": String,
    "description": String,
    "category": String,
    "image": String,
    "price": Number,
    "quantity": Number,
}
```

---

### Get all products

GET endpoint: `/api/products`

Returns:

```
[
    {
        "_id": String,
        "title": String,
        "description": String,
        "category": String,
        "image": String,
        "price": Number,
        "quantity": Number,
    },
    ...
]
```

---

### Decrease a product's quantity

PUT Endpoint: `/api/products/:id/decrease`

Header:
```
Content-Type: application/json
```

Body:
```
{
    "quantity": Number that user bought
}
```

Returns:

```
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
