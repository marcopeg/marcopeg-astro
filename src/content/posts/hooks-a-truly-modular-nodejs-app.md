---
title: "Hooks - A truly modular NodeJS App"
description: "How to create a truly modular NodeJS App where your business values are organized in features and all the necessary infrastructure comes from NPM modules."
pubDate: "2019-05-24T22:00:00.000Z"
updatedDate: "2021-11-06T08:52:47.000Z"
heroImage: "/content/images/2021/11/architecture-1477041_1280.jpeg"
tags: ["ForrestJS", "nodejs", "Import 2022-12-03 12:45", "#Import 2025-02-27 15:31"]
---

Writing apps in NodeJS is fun and quite easy.

`require()` and `import` are the building blocks for **structuring your codebase in modules** and let them talk with each other. [NPM](https://npmjs.com/) let you share and reuse bigger blocks of logic. Great stuff.

Nevertheless, it’s always been a struggle to organize our codebase into blocks that represent relevant business logic. So to speak **features that a customer is willing to pay for**.

Here is a simplistic implementation of an app that should be able to **sum two integers**:

```js
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.get('/:p1/:p2', (req, res) => {
    const { p1, p2 } = req.params
    const sum = Number(p1) + Number(p2)
    res.send(`${p1} + ${p2} = ${sum}`)
})

app.listen(port, () => console.log('Running...'))
```

This works and it is not much code, but if you focus on the business requirement:

> sum two integers

you quickly find out that the only relevant piece of code would be:

```js
const sum = Number(p1) + Number(p2)
```

Ok, this is quite a strict interpretation. Let’s say that the code that is relevant to the business requirement is more likely something like this:

![](/content/images/2021/11/image-30.png)

after all, all we want to achieve is something like that:

![](/content/images/2021/11/image-31.png)

If you are a little bit like me, you find yourself writing - or copying - _Express_ (or _Koa_ or whatever…) setup scripts over and over, project by project.

This structural code has the following characteristics:

1.  it is almost always the same
2.  it doesn’t contribute to the business requirement
3.  nothing works

> But on top of it, the sad truth is that  
> **your customer is not willing to pay for it**.

✅ Infrastructural code is a necessity that doesn’t bring much value, and if you could **find a way to separate business from infrastructure, and reuse infrastructure**, you would surely see your profits growing. Either in more money or just free time.

## WordPress _almost_ nailed it… 🤔

Engineers at WordPress found out, a long time ago, that **the value of a platform root in its capability to run external plugins**.

> WordPress wouldn’t be WordPress without a rich plugins echosystem.

WordPress provides you with some _core functionalities_ and a huge amount of **extension points**. You can write a file that basically asks WP to:

> When “X” happens, please run my code

And this is the good side of it.

You can pack your business logic in a plugin (or theme) that runs on top of all the “stuff” of which WordPress is made. Stuff that you and I don’t even need to know so much.

The flip side is that you have plugins that hook into WordPress, plugins that hook into plugins that hook into WordPress… and so on.

**It is a hard job to trace and debug plugin composability.**

## … but ForrestJS’s Hooks surely did! 😏

`@forrestjs/hooks` is a small library that enables **traceable composability** in your Javascript application.

With the hooks you can refactor the code we wrote earlier into this:

```js
const { runHookApp, createHook } = require('@forrestjs/hooks')

// Infrastructure
const expressService = () => {
    const express = require('express')
    const app = express()
    const port = process.env.PORT || 8080

    // Allows for other features to hook into
    // the Express app and provide their own custom logic
    createHook('express', { args: { app }})

    app.listen(port, () => console.log('Running...'))
}

// Real Business Value
const featureSum = ({ app }) =>
    app.get('/:p1/:p2', (req, res) => {
        const { p1, p2 } = req.params
        const sum = Number(p1) + Number(p2)
        res.send(`${p1} + ${p2} = ${sum}`)
    })

runHookApp([
    [ '$START_SERVICES', expressService ],
    [ 'express', featureSum ],
]).catch(console.log)
```

Although is a little bit longer, it enables a clear **separation of responsibilities** between “running Express” and “implementing the SUM OF TWO INTEGERS”.

This is called the ”[Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)” and is one of the most important things you can learn for engineering and Life 😀

> ✅ The most important thing is that **you can easily extract `expressService` into a standalone NPM module**, and reuse it as plain dependency in multiple projects.

As a matter of fact, _ForrestJS_ did exactly that:

```js
const { runHookApp } = require('@forrestjs/hooks')

const featureSum = ({ registerRoute }) =>
    registerRoute.get('/:p1/:p2', (req, res) => {
        const { p1, p2 } = req.params
        const sum = Number(p1) + Number(p2)
        res.send(`${p1} + ${p2} = ${sum}`)
    })

runHookApp([
    require('@forrestjs/service-express'),
    [ '$EXPRESS_ROUTE', featureSum ],
])
```

This is a perfectly viable NodeJS app that **focuses on implementing the business requirement** that we discussed previously. (Sum 2 integers, right?)

The mere running of a NodeJS server is nothing we should be concerned about. **It should just work ~TM, and it does**.

## What about Traceability?

Well, the thing is that `@forrestjs/hooks` comes with a nice built-in feature that will produce an app boot report similar to this one:

![](/content/images/2021/11/image-32.png)

There is just a small change that you have to make to your codebase in order to achieve this tree representation, and it comes as a built-in service:

```js
const { runHookApp, traceBoot } = require('@forrestjs/hooks')

... your business logic ...

runHookApp([
    traceBoot,
    require('@forrestjs/service-express'),
    [ '$EXPRESS_ROUTE', featureSum ],
])
```

## Enjoy a truly Sharable Infrastructure 🥁

Here at _ForrestJS_, we believe you should never write the same infrastructural code twice.

> Worst of all, you should never copy/paste the same code into multiple projects!

That’s why we are maintaining a list of common stuff that you can plug into your application end extend to suit your specific business needs.

### 👉 [Check the project's home page for tutorials and resources](https://forrestjs.github.io/) 👈

There are [many other packages already released in NPM](https://www.npmjs.com/search?q=%40forrestjs) under the `@forrestjs` organization.