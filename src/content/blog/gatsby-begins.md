---
title: "Gatsby Begins"
description: "And so I tried out Gatsby and promptly decided to turn my WordPress-based blog into a static generated website."
pubDate: "2019-02-09T23:00:00.000Z"
updatedDate: "2021-11-01T18:25:47.000Z"
heroImage: "https://images.unsplash.com/photo-1615419235091-59bf9cbd530b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDV8fGdhdHNieXxlbnwwfHx8fDE2MzU3OTA5MzQ&ixlib=rb-1.2.1&q=80&w=2000"
---

And so I tried out [Gatsby](http://gatsbyjs.org/) and promptly decided to turn my [WordPress](https://wordpress.org/) based blog into a **static generated website**. And to be honest, this is not the first time.

My personal website has gone through a couple of stack changes:

*   2008: Custom CMS (PHP)
*   2014: [Jeckyll](https://jekyllrb.com/) - static website, hosted on GitHub pages
*   2017: [WordPress](https://wordpress.org/) - self-hosted, Docker-based
*   2019: [Gatsby](http://gatsbyjs.org/) - static website, hosted on Netlify

## Motivations

Well… in a word… **memory**.

I used to host my _WordPress_ blog as a [Docker](https://docker.com/) project on a small [DigitalOcean](https://digitalocean.com/) droplet and while trying to deploy some new stuff using [Captain Rover](https://caprover.com/) I was running out of available memory. WordPress had to go.

On top of that, **I was also tired of WordPress**. I recently read a [nice blog](https://sendcheckit.com/blog/why-you-should-put-your-content-on-medium-and-your-own-domain) post about leveraging [Medium](https://medium.com/) to bring traffic to your owned content using the [import story](https://medium.com/p/import) function.

Long story short **WordPress was performing horribly** when it comes to Medium’s import function, and I didn’t really want to spend too much reformatting each article.

## First Impressions

Gatsby is heavily based on [React](https://reactjs.org/) and [GraphQL](https://graphql.org/), two tools that I like very much. It feels quite easy to jump into a theme that I don’t know and tweak it to my liking.

The official documentation sucks just a little. I felt confused about moving my first steps. After a while, I found [a beginner tutorial](https://www.gatsbyjs.org/tutorial/) that covers most of the steps that you might need to get to a decent blog product. It wasn’t easy to find, at least for me!

The [starters](https://www.gatsbyjs.org/starters/?v=2) are a very nice feature. I could choose a theme that I like, and extend it. More or less the way I am used to doing with Docker.

What to say about the resulting performances? I ran a [lighthouse](https://developers.google.com/web/tools/lighthouse/) test and got 100% on everything :-)

## A Lot of Work Ahead

As with every change, now I must re-import all my old posts. Damn it!

Luckily most of them were already written in [Markdown](https://en.wikipedia.org/wiki/Markdown) so it should be quite of a quick effort.