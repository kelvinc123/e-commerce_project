
# User Management Service

## Run

`npm start`

## API

---

### Signup

POST endpoint: `/signup`

Header:
```
Content-Type: application/json
```

Body:
```
{
    "username": "JoeDo2@gmail.com",
    "password": "12345678",
    "first_name": "Joe2",
    "last_name": "Do",
    "address": "Los Angeles"
}
```

Returns:

```
{
    "message": "Successfully created user!",
    "username": "JoeDo2@gmail.com"
}
```


---

### Login

POST endpoint: `/login`


Header:
```
Content-Type: application/json
```

Body:
```
{
    "username": 
    "password": 
}
```

Returns:

```
{
    "access_token": "..."
    "username": "..."
}
```

