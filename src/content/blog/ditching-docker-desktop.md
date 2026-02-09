---
title: "Ditching Docker Desktop"
description: "How we learned to run Docker natively and save 55k a year!"
pubDate: "2024-02-28T15:31:15.000Z"
updatedDate: "2024-04-15T14:22:02.000Z"
heroImage: "https://images.unsplash.com/photo-1646627927863-19874c27316b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fGRvY2tlcnxlbnwwfHx8fDE3MDkxMDg5MDh8MA&ixlib=rb-4.0.3&q=80&w=2000"
---

Lately, I have been part of a weird discussion at the office:

> Should we buy Docker-Desktop or not?

On one side, it's just 5$ per month per dev; and it doesn't seem much of a big deal.

But when you scale this up to about 900+ engineers, as in my current organization, the yearly cost quickly ramps **up to a staggering 55.000$!**

Although this is just a drop in the ocean for such a large organization, it is still the equivalent of a Senior Engineer in the Italian market.

So, a new question that pops up in my mind:

> Is Docker-Desktop worth one Senior Engineer?

It depends, of course.  
It always does!

* * *

## Stack Considerations

Our general stack calls for a simple _docker-compose.yml_ file that is supposed to run the local services needed to work on a piece of our extensive offering.

Backend or Frontend, it is still Docker that fuels our dev environment.

On top of this, we're experimenting a lot with _Dev-Containers_ using VSCode.

![](/content/images/2024/02/DALL-E-2024-02-28-10.42.38---Craft-a-humorous-caricature-of-a-software-engineer--exaggerated-for-comedic-effect.-The-character-is-surrounded-by-multiple-monitors-displaying-code--.webp)

Classic Senior Developer, according to ChatGPT

So, we are not running any weird stuff locally. We're not even (yet) running local Kubernetes... Docker-Compose is simple and powerful enough to manage a moderately complex scenario.

* * *

## Colima to Rescue!

If you follow my posts, you may guess I've asked ChatGPT how to do so... but it miserably failed. The bot simply proposed I install Docker via Homebrew... with the cask command that would install Docker Desktop! D'oh!

Luckily, I've found out that good old Google is still running somewhere in the cloud! And it still hands out pretty good answers to known problems.

The solution to my problem, at least on my Mac, is an open-source project called Colima. It's a container runtime and so far it works pretty well for me.

[

GitHub - abiosoft/colima: Container runtimes on macOS (and Linux) with minimal setup

Container runtimes on macOS (and Linux) with minimal setup - abiosoft/colima

![](https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg)GitHubabiosoft

![](https://repository-images.githubusercontent.com/403020531/b4f924d8-8ca4-42b9-b9f5-c68b5bf59e19)

](https://github.com/abiosoft/colima)

My final setup is composed as such:

*   Colima as container runtime
*   Docker CLI as interface to running containers
*   Docker Compose to coordinate container-based projects
*   CTOP to visualize my running containers
*   Docker extension on VSCode

* * *

## The Source Code

Here is the gist of the Homebrew instructions to run this solution:

![](/content/images/2024/02/DALL-E-2024-02-28-11.43.16---Design-a-caricature-of-a-happy-software-engineer--capturing-the-essence-of-joy-and-satisfaction-in-their-profession.-This-character-is-depicted-in-a-s.webp)

## The End

*   I'm happy with this setup
*   My boss can drive a shiny new Tesla with the savings!

## Oh, One More Thing...

I've recently stumbled upon the corner case of using a Mac with M2 to build an image for Intel. It didn't work out of the box.

I found the solution in [this article](https://arc.net/l/quote/xcfsdcks):

```bash
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
curl -SL https://github.com/docker/buildx/releases/download/v0.11.2/buildx-v0.11.2.darwin-arm64 -o $DOCKER_CONFIG/cli-plugins/docker-buildx
chmod +x $DOCKER_CONFIG/cli-plugins/docker-buildx
```

With this step done, I managed to build the following:

```bash
docker buildx build --platform linux/amd64 \
  -t repository/image:tag \
  --build-arg ARG1=xx \
  --build-arg ARG2=yy \
  .
```

Happy building!