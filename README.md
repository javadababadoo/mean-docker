# MEAN DOCKER

This repo contains a simple project that uses the MEAN stack (Mongo, Express, Angular, Node JS) to build a single page app (SPA) that could be easily configured and deployed with Docker and Docker compose.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

First, be sure that you have the following dependencies installed:

```
Docker - Available for Linux, Mac o Windows
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
* backend/device-core - App backend source built with Node JS, Express and Mongoose.
* deployment/compose - Directory where its located the docker compose YAML file.
* frontend - App frontend source.
* scripts - Scripts used to populate the database.
* seed - Docker file that defines the instructions to seed the app.


### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Deployment

this project is using Docker and Docker compose as tools that helps us to easily configure and deploy the full app.

In order to deploy the app, we have to take into account the following archives:

* ```deployment/compose/docker-compose-seed.yml``` - Populates the Mongo database only necessary the first time the app is deployed.

* ```deployment/compose/docker-compose.yml``` - Deploys the full app.

To deploy application for the first time you need to seed the Mongo database, to do you need to execute the next command in the terminal:



## Built With

* [npm](https://www.npmjs.com/) - Node package manager
* [Mongoose](http://mongoosejs.com/) - Mongo object modeling
* [Angular](https://angular.io/) - App framework

## Authors

* **Jaime Zapata** - [Javadababadoo](https://github.com/javadababadoo)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
