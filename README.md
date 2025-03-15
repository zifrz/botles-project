#### Running a Kafka Queue (For Processor and Worker)
1. ``` docker run -p 9092:9092 apache/kafka:3.9.0 ```
    - This will start a single container
2. Then use ```docker exec -it <CONTAINER_ID> /bin/bash``` to access the container through bash
3. Navigate to ```cd /opt/kafka/bin```
4. Run following shell script to start a topic:
    - ```./kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092```
    - In our case ```./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092```
- NOTE: No need to start topic again and again.