## Simple app for monitoring and sampling of Google Analytics real time data

### Description

We want to create a service implemented in Node.js that is able to poll on the Google Analytics Realtime Reporting API (https://developers.google.com/analytics/devguides/reporting/realtime/v3), cache the data in buckets of 5 minutes and then expose the data again on a REST API for consumption.
You'd be free to choose which kind of metric you want to poll on in the Google Analytics Realtime Reporting API (i.e. active users, pageviews, ...), and you can freely choose to only persist the data in a simple file based database or even in memory.

## Configuration

For configuration please look `.env`.
1. PRIVATE_KEY - key for google service account which has access to metric  
2. CLIENT_EMAIL - email of goolge service account  
3. SAMPLING_VIEW_ID - sampling view Id  
4. SAMPLING_METRIC - sampling metric name  
5. SAMPLING_INTERVAL - sampling interval in minutes  

## Running Instruction

### Locally:
    a. `npm install`  
    b. `npm start` or `npm test` or `npm run startWithDb`
    c. `npm run db:migrate` or `npm run db:rollback` to set and reset the database  

### Using docker:
1. Install Docker (https://docs.docker.com/engine/installation/)  
2. Install Docker Compose (https://docs.docker.com/compose/install/)  
3. To start run `docker-compose -f docker-compose.yaml up --force-recreate`  
4. To stop run `docker-compose -f docker-compose.yaml down`  

### API

1. `GET api/v1/metric/:metricName?from=unixTimestamp&to=unixTimestamp` - gets specified sampled metric  