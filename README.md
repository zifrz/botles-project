# Project Documentation

A microservices-based application consisting of:
- Hooks service (webhook handler)
- Primary backend (core API)
- Processor (event processor) 
- Worker (background jobs)
- Frontend (user interface)

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Setting Up PostgreSQL Database](#setting-up-postgresql-database)
- [Running Kafka Queue](#running-kafka-queue)
- [Developer Requirements](#developer-requirements)

----------

## Installation

1. **Install dependencies** for each service (hooks, primary-backend, processor, and worker):
    
    ```bash
    npm i
    ```
    
2. **Setup PostgreSQL Database**: Follow the instructions in the [Setting Up PostgreSQL Database](#setting-up-postgresql-database) section.
    
3. **Generate Prisma Client**: Run the following in each of the services:
    
    ```bash
    npx prisma generate
    ```
    

----------

## Running the Application

### 1. Start Kafka Queue

Follow the steps in the [Running Kafka Queue](#running-kafka-queue) section.

### 2. Start the Services

Run the services (`hooks`, `primary-backend`, `processor`, and `worker`) using:

```bash
npm run dev
```

### 3. Access API Endpoints

- The hooks service can be accessed via the following endpoint:
    
    ```bash
    http://localhost:3000/hooks/catch/1/<ID of Zap>/
    ```
    

----------

## Setting Up PostgreSQL Database

There are two methods to set up the PostgreSQL database:

### 1. Use an Online Service

You can use a managed PostgreSQL service like:

- [Neon Tech](https://neon.tech/)
- [Aiven](https://aiven.io/postgresql)

After setting up the database, use the provided connection string.

### 2. Use a Local PostgreSQL Docker Container

1. Run the following Docker command to start a PostgreSQL container:
    
    ```bash
    docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -d postgres
    ```
    
2. Use the following connection string in the `.env` files for all services:
    
    ```bash
    DATABASE_URL="postgresql://johndoe:mysecretpassword@localhost:5432/mydb?schema=public"
    ```
    
### 3. Seeding PostgreSQL Database

Use the following command to seed the database, which must executed from `primary-backend` service:

```bash    
npx prisma db seed
```

----------

## Running Kafka Queue

To run Kafka locally, follow these steps:

1. **Start Kafka Container**: Run the following Docker command to start Kafka:
    
    ```bash
    docker run --name kafka -p 9092:9092 -u root apache/kafka:3.9.0
    ```
    
2. **Access Kafka Container**: To access the Kafka container:
    
    ```bash
    docker exec -it <CONTAINER_ID> /bin/bash
    ```
    
3. **Create a Kafka Topic**: Navigate to Kafka's bin directory:
    
    ```bash
    cd /opt/kafka/bin
    ```
    
    Then create a topic:
    
    ```bash
    ./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
    ```
    
4. **Start Kafka Consumer**: Run the following command to start a consumer:
    
    ```bash
    ./kafka-console-consumer.sh --topic zap-events --from-beginning --bootstrap-server localhost:9092
    ```
    
    > **Note:**
    > - You only need to create the topic once, per each Docker Kafka Container.
    > - The consumer will be automatically managed by the worker service, so no need to manually start it through the shell.

For more information on Kafka, refer to the [Kafka Quick Start Guide](https://kafka.apache.org/quickstart).

----------

## Other Requirements

Developers/Contributors will need the following additional setup:

1. **SMTP Configuration**:
   - Required for email functionality in the worker service
   - Add these credentials to `worker/.env`:
     ```bash
     SMTP_ENDPOINT=your_smtp_server
     SMTP_USERNAME=your_smtp_username
     SMTP_PASSWORD=your_smtp_password
     ```
   - For local development, you can use:
     - [Mailtrap](https://mailtrap.io/) (testing)
     - [SendGrid](https://sendgrid.com/) (production-like)
     - AWS SES (for production environments)

2. **Solana Wallet Private Key**:
   - Required for blockchain interactions
   - Add to `worker/.env`:
     ```bash
     SOLANA_PRIVATE_KEY=your_wallet_private_key
     ```
   - For development, you can use:
     - A test wallet from Phantom or Solflare
     - A wallet generated specifically for development

----------
> **Note:**
> If you are NOT using Google's Project IDX, make sure to change the backend URL at `frontend/app/login/page.tsx` to `http://localhost:3000`