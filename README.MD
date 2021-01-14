# RN Expo Server
## Node JS server, Dockerized

### Docker build command

- Souce
```url
https://blog.logrocket.com/node-js-docker-improve-dx/
```

- Dockerize the app with Docker multi-stage build
- Dockerize the app with Docker multi-stage build -t <app-name> # with name

- Build command
```shell
$ COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
$ docker-compose up
```
- It ran npm start with an environment variable called DEBUG with a value of rnexposerver:*, which instructs the server to do verbose debug.