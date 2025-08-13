# E-Commerce Microservices Platform

A scalable, distributed e-commerce system built with microservices architecture for CS6650 Building Scalable Distributed Systems.

## Architecture Overview

This project implements a fault-tolerant e-commerce platform using microservices architecture, designed for horizontal scalability and high availability. The system employs event-driven communication patterns to handle distributed transactions across service boundaries.

### Key Design Principles
- **Microservices Architecture**: Independent, loosely-coupled services with single responsibilities
- **Database per Service**: Each service maintains its own database for true service autonomy
- **Asynchronous Communication**: Event-driven architecture using message queuing for service decoupling
- **API Gateway Pattern**: Single entry point for client requests with intelligent routing
- **Fault Tolerance**: Built-in retry mechanisms and acknowledgment-based message processing
- **Containerization**: Docker-based deployment for consistent environments and easy scaling

## Technology Stack

- **Runtime**: Node.js with Express.js
- **Databases**: MongoDB (with Mongoose ODM)
- **Message Queue**: RabbitMQ (CloudAMQP)
- **Containerization**: Docker
- **API Gateway**: Custom Express-based gateway
- **Authentication**: JWT-based authentication

## Microservices

### 1. **API Gateway** (Port: 3000)
Central entry point for all client requests, handles routing and request forwarding to appropriate microservices.

### 2. **User Management Service** (Port: 8000)
- User registration and authentication
- JWT token generation and validation
- User profile management

### 3. **Product Catalog Service** (Port: 6100)
- Product inventory management
- Product search and retrieval
- Stock quantity tracking

### 4. **Purchase Service** (Port: 7100)
- Order processing and validation
- Publishes purchase events to message queue
- Integrates with Product service for availability checks

### 5. **Payment Service** (Port: 7200)
- Asynchronous payment processing
- Consumes purchase events from message queue
- Updates product inventory after successful payment

### 6. **Rating Service** (Port: 9000)
- Product rating management
- User review functionality
- Rating aggregation

## Getting Started

### Prerequisites
- Node.js 16+
- Docker & Docker Compose
- MongoDB Atlas account
- RabbitMQ/CloudAMQP account

### Environment Setup

Create `.env` files for each service with required configurations:

```bash
# Example .env structure
PORT=<service_port>
DB_USER=<database_username>
DB_PASSWORD=<database_password>
MONGO_URI=<mongodb_connection_string>
RABBIT_URL=<rabbitmq_connection_string>
```

### Running with Docker

1. Clone the repository:
```bash
git clone <repository_url>
cd cs6650-ecommerce
```

2. Build and run all services:
```bash
./deploy.sh
```

3. To stop all services:
```bash
./deploy.sh cleanup-only
```

### Running Locally

For each service:
```bash
cd <service_directory>
npm install
npm start
```

## 🔄 Communication Flow

```
Client → API Gateway → Microservices
                ↓
         Purchase Service
                ↓
         RabbitMQ Queue
                ↓
         Payment Service → Product Service
```

## API Documentation

### Authentication Endpoints
- `POST /signup` - User registration
- `POST /login` - User authentication

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id/decrease` - Update product inventory

### Purchase Endpoints
- `POST /api/purchase` - Create new purchase order

### Rating Endpoints
- `GET /api/ratings` - Get all ratings
- `POST /api/ratings` - Add product rating

## Security Considerations

- JWT-based authentication for secure API access
- Service-to-service communication within Docker network
- Environment-based configuration management
- Input validation and sanitization

## Scalability Features

- **Horizontal Scaling**: Each microservice can be independently scaled
- **Load Distribution**: Message queue enables work distribution across service instances
- **Stateless Services**: Services designed for easy replication
- **Database Sharding**: Ready for database-level scaling strategies

## Contributing

This is an academic project for CS6650. For questions or discussions about the architecture and design decisions, please reach out.

## License

This project is part of CS6650 coursework at Northeastern University.