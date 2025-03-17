# Project Documentation

This project consists of multiple services, including a hooks service, a processor, and a worker, all running Node.js API servers and communicating with a PostgreSQL database and Kafka queue. Below are the steps for setting up and running these services.

## Table of Contents

-   [Installation](https://chatgpt.com/#installation)
-   [Running the Application](https://chatgpt.com/#running-the-application)
-   [Setting Up PostgreSQL Database](https://chatgpt.com/#setting-up-postgresql-database)
-   [Running Kafka Queue](https://chatgpt.com/#running-kafka-queue)

----------

## Installation

1.  **Install dependencies** for each service (hooks, primary-backend, processor, and worker):
    
    ```bash
    npm i
    ```
    
2.  **Setup PostgreSQL Database**: Follow the instructions in the [Setting Up PostgreSQL Database](https://chatgpt.com/#setting-up-postgresql-database) section.
    
3.  **Generate Prisma Client**: Run the following in each of the services:
    
    ```bash
    npx prisma generate
    ```
    

----------

## Running the Application

### 1. Start Kafka Queue

Follow the steps in the [Running Kafka Queue](https://chatgpt.com/#running-kafka-queue) section.

### 2. Start the Services

Run the services (`hooks`, `primary-backend`, `processor`, and `worker`) using:

```bash
npm run start
```

### 3. Access API Endpoints

-   The hooks service can be accessed via the following endpoint:
    
    ```bash
    http://localhost:3000/hooks/catch/1/<ID of Zap>/
    ```
    

----------

## Setting Up PostgreSQL Database

There are two methods to set up the PostgreSQL database:

### 1. Use an Online Service

You can use a managed PostgreSQL service like:

-   [Neon Tech](https://neon.tech/)
-   [Aiven](https://aiven.io/postgresql)

After setting up the database, use the provided connection string.

### 2. Use a Local PostgreSQL Docker Container

1.  Run the following Docker command to start a PostgreSQL container:
    
    ```bash
    docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -d postgres
    ```
    
2.  Use the following connection string in the `.env` files for all services:
    
    ```bash
    DATABASE_URL="postgresql://johndoe:mysecretpassword@localhost:5432/mydb?schema=public"
    ```
    

----------

## Running Kafka Queue

To run Kafka locally, follow these steps:

1.  **Start Kafka Container**: Run the following Docker command to start Kafka:
    
    ```bash
    docker run -p 9092:9092 apache/kafka:3.9.0
    ```
    
2.  **Access Kafka Container**: To access the Kafka container:
    
    ```bash
    docker exec -it <CONTAINER_ID> /bin/bash
    ```
    
3.  **Create a Kafka Topic**: Navigate to Kafka’s bin directory:
    
    ```bash
    cd /opt/kafka/bin
    ```
    
    Then create a topic:
    
    ```bash
    ./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
    ```
    
4.  **Start Kafka Consumer**: Run the following command to start a consumer:
    
    ```bash
    ./kafka-console-consumer.sh --topic zap-events --from-beginning --bootstrap-server localhost:9092
    ```
    
    > **Note:**
    
    -   You only need to create the topic once, per each Docker Kafka Container.
    -   The consumer will be automatically managed by the worker service, so no need to manually start it through the shell.

For more information on Kafka, refer to the [Kafka Quick Start Guide](https://kafka.apache.org/quickstart).

----------
> **Note:**
- If you are NOT using Google's Project IDX, make sure to change the backend URL at `frontend/app/login/page.tsx` to `http://localhost:3000`