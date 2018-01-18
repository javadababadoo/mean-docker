# MEAN DOCKER

This repo contains a simple project that uses the MEAN stack (Mongo, Express, Angular, Node JS) to build a single page app (SPA) that could be easily configured and deployed with Docker and Docker compose.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

First, be sure that you have the following dependencies installed:

```
Docker - Available for Linux, Mac o Windows
```
```
Docker compose - Available for Linux, Mac o Windows
```

Then, clone the repo from GitHub:

```
git clone https://github.com/javadababadoo/mean-docker.git
cd mean-docker
```

### Directory structure
* backend/device-core - App backend source built with Node JS, Express and Mongoose.
* deployment/compose - Directory where its located the docker compose YAML file.
* frontend - App frontend source.
* scripts - Scripts used to populate the database.
* seed - Docker file that defines the instructions to seed the app.

### File structure
* backend/device-core/Dockerfile - Defines the dockerfile for device core (Backend - Node JS Server).
* frontend/DeviceManagement/Dockerfile - Defines the dockerfile for device management (Frontend - Angular).
* seed/Dockerfile - Defines the dockerfile to seed the Mongo database.
* deployment/compose/docker-compose.seed.yml - Defines the docker compose file to configure the application's services. (Here the Mongo database is populated).
* deployment/compose/docker-compose.yml - Defines the docker compose file to configure the application's services.
* scripts/devices.json - the archive contains the devices data that will be import into mongo.

## Deployment

this project is using Docker and Docker compose as tools that helps us to easily configure and deploy the full app.

Go to frontend/DeviceManagement/ located in the project directory:

```
cd frontend/DeviceManagement/
```
Execute the next commands:

```
npm install 
ng build --prod
```

In order to deploy the app, we have to take into account the following archives:

* ```deployment/compose/docker-compose-seed.yml``` - Populates the Mongo database only necessary the first time the app is deployed.

* ```deployment/compose/docker-compose.yml``` - Deploys the full app.

first thing that you need to do, if you haven't deployed the app is execute the next command in the terminal to seed the Mongo database:

```
docker-compose -f docker-compose.yml -f docker-compose.seed.yml up -d
```
Otherwise, just execute the next command:

```
docker-compose up
```

## Built With

* [npm](https://www.npmjs.com/) - Node package manager
* [Mongoose](http://mongoosejs.com/) - Mongo object modeling
* [Angular](https://angular.io/) - App framework
* [Express](http://expressjs.com/) - Express framework
* [Docker](https://www.docker.com/) - Docker tools

## Authors

* **Jaime Zapata** - [Javadababadoo](https://github.com/javadababadoo)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
