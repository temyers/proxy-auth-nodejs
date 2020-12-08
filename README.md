External to the containers:
```
npm install
```

In separate terminals:
```
docker-compose up proxy
docker-compose run --rm dev-env
```

In the `dev-env` container shell:
```
npm test
```