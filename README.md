# cs6650-ecommerce

### Port
 * Gateway: 3000
 * Catalog: 6000
 * Purchase: 7100
 * User Management: 8000

### Services Endpoint
 * POST `/login`
 * PUT `/signup`

### Database
 * Username: `main_user`
 * Password: `cs6650123456`
 * URI: `mongodb+srv://<username>:<password>@cluster0.haxd9of.mongodb.net/<db_name>?retryWrites=true&w=majority`

Replace `<username>` with username, `<password>` with password, and `<db_name>` with the database name (case sensitive)

### Rabbit
URL: `amqps://vflvhudl:rW2MR7JIOxxJ4wkceDzwzGH_jwih3Kmh@beaver.rmq.cloudamqp.com/vflvhudl`
Exchange: `payment`