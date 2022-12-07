
# Purchase Service

## Run

`npm start`


### Make a purchase

POST Endpoint: `/api/purchase`

Header:
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

Body:
```
{
    "products": [
        {
            "id": <product_id>
            "quantity": <quantity_purchased>
        },
        {
            "id": <product_id>
            "quantity": <quantity_purchased>
        },
    ],
    "cardNumber": <credit_card_number>
}
```

Returns:

```
{
    "message": "Successfully purchased the product",
    "purchaseData": {
        "user": <user_mongo_id>,
        "username": <username>,
        "first_name": <first_name>,
        "last_name": <last_name>,
        "address": <address>,
        "cardNumber": <credit_card_number>,
        "products": [
            {
                "id": "638a8c40dee05a998fc72860",
                "price": 64,
                "quantity": 5
            },
            {
                "id": "638a8c40dee05a998fc72861",
                "price": 109,
                "quantity": 20
            }
        ],
        "totalAmount": 2500
    }
}
```