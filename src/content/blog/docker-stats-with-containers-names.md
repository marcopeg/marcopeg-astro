---
title: "Docker Stats with Containers Names"
description: "There is a way to get container's names out of `docker stats`, and Docker Humble makes it ridicolously easy for you."
pubDate: "2017-02-08T23:00:00.000Z"
updatedDate: "2021-11-06T08:45:23.000Z"
heroImage: "/content/images/2021/11/docker.jpeg"
---

When running plenty of containers you may wonder which one is killing your server memory or CPU.  
Then your first step would be to run:

```text
docker stats
```

That is the basic first step to know what’s going on… too bad it shows only container’s IDs which - if you ask me - is not very useful.

![](/content/images/2021/11/image-20.png)

Today I resolved to see container’s names so I googled my problem only to find out that you can actually configure which format you want `docker stats` to speak the results:

```text
docker stats $(docker ps --format={{.Names}})
```

_Now we are getting somewhere!_ I thought.

![](/content/images/2021/11/image-21.png)

One second later I realized I will never remember it so I added it as a utility to my Docker helper project [Humble](https://github.com/marcopeg/humble-cli):

```text
humble do stats
```

(If you are currently using **Docker Humble** please remember to update it: `humble update-cli`)