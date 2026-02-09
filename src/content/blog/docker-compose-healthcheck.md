---
title: "Docker Compose Healthcheck"
description: "How to monitor containers' status and create a deterministic boot order for your services."
pubDate: "2019-02-18T23:00:00.000Z"
updatedDate: "2021-11-01T18:30:04.000Z"
heroImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fGhlYWx0aCUyMGNoZWNrfGVufDB8fHx8MTYzNTc5MTIzNg&ixlib=rb-1.2.1&q=80&w=2000"
---

I used to write a `docker-compose.yml` like this:

```text
version: '2.1'
services:
    postgres-db:
        image: postgres

    my-service:
        image: node
        link:
            - postgres-db
```

No much going on here. I have a [Postgres](https://www.postgresql.org/) database and some kind of [NodeJS](https://nodejs.org/en/) app that will use it.

When this starts with a `docker-compose up` **it’s likely that the App boots much faster than the database**, for the database must first initialize its data structure.

Unless we take care of that in my App’s logic, our App will first crash and **we would need to restart it after the Database goes online**.

There are a bunch of possible ways to address this problem. Here are 3:

## The Dumb Way

You could simply **restart the app multiple time until it works**:

```text
docker-compose up -d
... wait a little ...
docker-compose up -d
```

Believe it or not, I’ve seen people doing this a lot.

And I’ve been working with projects where this was the suggested way to go.  
True story.

## The Developer’s Way

On some projects, I use to **take care of this problem at NodeJS level**.

My booting script tries to connect to the database and if it fails, it waits for a little and then tries again. This loop goes on a couple of (configurable) times before the service gives up and crashes itself.

Although this is not so complicated and will work with any possible deployment setup, it is still some more code and some more responsibility that we must take into account.

> A decent rule of the thumb is to try not to do stuff …  
> … Until is absolutely necessary.

## The Docker Compose’s Way

A simple way to solve the problem is to use the built-in health checks functionality available in `docker-compose 2.1`.

We can basically tell a service to wait until another service (or multiple services) has completed a health check.

Here is a `docker-compose.yml` with basic health checks set up for both Postgres and MySQL:

```text
version: '2.1'
services:
    mysql-db:
        image: mysql
        healthcheck:
            test: [ "CMD", "mysqladmin" ,"ping", "-h", "localhost" ]
            timeout: 45s
            interval: 10s
            retries: 10

    postgres-db:
        image: postgres
        healthcheck:
            test: [ "CMD", "pg_isready", "-q", "-d", "${DB_NAME}", "-U", "${DB_USER}" ]
            timeout: 45s
            interval: 10s
            retries: 10

    my-service:
        image: node
        depends_on:
            mysql-db:
                condition: service_healthy
            postgres-db:
                condition: service_healthy
```

**NOTE 1:** This solution is compatible with `docker-compose 2.1`. It might be a limitation if your project uses a different file definition.

**NOTE 2:** This solution heavily relies on deploying the project as a Docker Compose stack. If you run it in other ways, you might still fall into the scenario where Node starts before the Database.

If you plan to deploy your project without Docker, the Developer’s solution might be best for you.

* * *

*   What did you like about these solutions?
*   Any other ideas?

Please go ahead and enjoy commenting on this topic!

![](/content/images/2021/11/image-1.png)