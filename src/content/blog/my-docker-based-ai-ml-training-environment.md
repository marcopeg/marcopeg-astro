---
title: "My Docker-based AI/ML Training Environment"
description: "Dive into Docker, JupyterLab, and machine learning with 'learning-python'. Features Python 3.9, NodeJS, and PostgreSQL with pgvector. Start with make start at localhost:8888."
pubDate: "2024-04-14T07:39:53.000Z"
updatedDate: "2024-04-14T07:39:53.000Z"
heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxhaSUyMGxhYnxlbnwwfHx8fDE3MTMwODAzNjZ8MA&ixlib=rb-4.0.3&q=80&w=2000"
---

Without further ado, here is the link to the GitHub project I've created to stretch my muscles into Machine Learning, Artificial Intelligence, and Python:

[

GitHub - marcopeg/learning-python: A containerized project to play around with Python and Jupiter Notebook

A containerized project to play around with Python and Jupiter Notebook - marcopeg/learning-python

![](https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg)GitHubmarcopeg

![](https://opengraph.githubassets.com/0323df2fdfd689efb0ad1cb6874dc9a5a091c02eecc346cc2e21357170ba6bef/marcopeg/learning-python)

](https://github.com/marcopeg/learning-python)

Run that on your computer, or spin it up as a GitHub Space. It works both ways.

You get:

*   A [JupyterLAB](https://jupyter.org/) server with its web interface on [`localhost:8888`](http://localhost:8888) running Python 3.9 and NodeJS 20.x kernels
*   A Postgres DB with [_pgvector_](https://github.com/pgvector/pgvector) already installed
*   A [Docker Compose](https://docs.docker.com/compose/) project that spins up containers
*   A Makefile interface to operate the project

You need:

*   Docker and [Docker Compose](https://docs.docker.com/compose/)

Here are a few high-level commands to operate with the environment:

```bash
# Start the services
make start

# Stop the services
make stop
```

👉 Once the environment start, open your browser to [`http://localhost:8888`](http://localhost:8888)

## Managing Dependencies

As this thing works inside a Docker container, you will need to modify the relative Dockerfile in order to install dependencies for Python or NodeJS.

*   Open .jupiter/Dockerfile with your favourite editor.
*   Search for "Python Dependencies" or "Node Dependencies"
*   Add what you need
*   run the following command:

```bash
# Install the dependencies and restart the environment
make reset
```