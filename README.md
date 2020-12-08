# node-http-proxy
Example to demonstrate using an HTTP authenticated proxy for NodeJS and AWS SDK 

External to the containers:
```
npm install
```

In a terminal:
```
docker-compose up proxy nameserver
```

In a separate terminal:
```
 export AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
 export AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
docker-compose run --rm dev-env
```

In the `dev-env` container shell:
```
npm test
```