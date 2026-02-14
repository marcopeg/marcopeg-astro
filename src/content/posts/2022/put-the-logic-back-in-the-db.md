---
title: "Put the logic back in the DB!"
description: "How to choose between DB-centric or horizontally scalable applications? This article explores the components of this choice, provides examples, and a practical checklist to answer this question."
pubDate: "2022-12-29T08:08:11.000Z"
updatedDate: "2022-12-29T08:08:11.000Z"
heroImage: "https://images.unsplash.com/photo-1652519240461-cb31edcfbf5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8YWxsfDI1fHx8fHx8Mnx8MTY3MTQ0Nzk1OQ&ixlib=rb-4.0.3&q=80&w=2000"
tags: ["architecture", "scalability", "Databases", "business", "decision making", "#Import 2025-02-27 15:31"]
---

I advocate putting business logic into the database _AS MUCH AS POSSIBLE_.

At first, it may feel weird because, for the last two decades, they taught us the very opposite: _CRUD_ and _ORMs_ are _The Way_; you don't need to learn _SQL_; Indexes are the limit of your data knowledge. Focus on _Java_, focus on _.NET_. Scale.

> "As Much As Possible"

In this article, we focus on the meaning of **"as much as possible"** and try to find tools that help understand the tradeoff between sheer performances, separation of concerns, and simple orthodoxy.

* * *

## The Extremes and the Continuum

Let's warm up by considering three business requirements that _could_ be solved in the _Data Layer_ and weigh the pros and cons:

✅ Choose _all_ the customers that placed at least three orders within the last week.

❌ Print the last ten product reviews with a _sentiment score_.

🧐 Report _all_ the customers that placed at least three orders in the last week, and _serve the data in JSON format,_ including the last three orders for each user.

The first is an easy pick to advocate for the DB as a business logic executor. Using _SQL_, we can solve this with _JOIN_ and _WHERE_ conditions. Without it, we would need to download the entire dataset on the _Application Layer_ and run the filters, wasting memory and bandwidth.

> Given enough data, pulling the entire dataset would become not feasible at all.

The second example is another extreme and advocates for _WHAT NOT TO DO_ in a DB (of every kind). Even a simple sentiment score algorithm may involve thousands of lines of code if not using a _Machine Learning_ model. This is the classic situation where pulling the dataset (_ten product reviews_) and running an _API_ call toward an existing _ML-based Sentiment Service_ would be efficient.

Let's now move to the third example.

* * *

## Luke, follow the money!

The third example excites me because there is no simple way to decide how to solve it or _WHERE_ to solve it. All in the DB? Partially in the _Application Layer_?

We can split the problem in two:

1.  find all the customers that placed at least three orders within the last week
2.  **prepare a JSON document with such customer + last three orders**

By now, it should be clear that Problem n.1 should be solved in the DB, and for this kind of relational problem, a relational database is possibly the best way to go.

You may have guessed that we will dive into the second part of the problem.

> prepare a JSON document reporting  
> all the active customers  
> with their last three orders

> From now on, I'll assume that the DB solution is based on PostgreSQL because of its ability to manipulate JSON format **and its awesomness**. [Many system use PostgreSQL as data foundation anyway](https://db-engines.com/en/ranking).

Problem n.2 is different and can be solved in many ways. For the sake of simplicity, we will constrain the discussion to these three possible implementations:

1.  use PostgreSQL and build aggregate _JSON_ using _SQL_
2.  pull data from DB and build the _JSON_ on the _Application Layer_
3.  pull data from DB and build the _JSON_ in the _Client App_

We will dive into the technicalities of those solutions in another article. Today, let's explore how the three approaches impact the **"who pays what?"** question.

In **Solution n.1,** we (the company) pay for the entire computational cost in the DB, _possibly_ reduce the bandwidth cost, and **serve a ready-to-use JSON** report.

In **Solution n.2,** we still pay for the entire computational cost, but we divide it between the _Storage Layer_ (_WHERE_ and _JOIN_) and the _Application Layer_ (_build the_ _JSON_). On the bright side, we **reduce the workload on the DB** for the sake of _Horizontal Scalability._ Still, we must **pay the overhead of multiple machines**, CPUs, and memory that runs the _Application Layer_.

> Yes, Linux still needs CPU and memory to run properly.  
> And you pay for it.

**Solution n. 3** taps into the _**Infinite Scalability**_ **of the _Client App_**. Each new client brings its CPU and memory to the table. We may pay a little more bandwidth, but then we save on CPU and memory. Unfortunately, **the Client App can not always be trusted** (easy to hack), so we must be careful when choosing this approach and when we simply can not (due to requirements).

🎉 **I choose _Solution n.3_ every time my requirements allow it!**  
I'm a big fan of the _Infinite Scalability Opportunity_. Also, I enjoy working with techs like modern Javascript and React.

> Infinite Scalability is FREE,  
> as in Free Beer!

* * *

## Where do I spend my dollars?

But using the _Client App_ is not always possible, and more often than I like to admit, I find myself choosing between more costly options. (expensive for my company).

In the end, the difference between _Solution n.1_ and _Solution n.2_ lies in **where we spend our money**:

*   Do we pump up the DB?
*   Do we scale up horizontally?

Pumping the DB may lead us into the _Vertical Limit;_ The other option carries the overhead of managing multiple machines and OSs resulting in an overwhelming maintenance nightmare.

Although _Public Cloud Providers_ mitigate both problems, **you still have to pay the overhead** of horizontal scaling. One way or the other. Nothing comes for free. (never heard of entropy?)

> Even with the uprising of great tools such as Kubernetes, we find ourselves dedicating more and more resources to "how to run the service" instead of "bringing functional value to our customers."  
>   
> Jeff Bezos would be pissed.

* * *

## Size Matters

Coming down to this economical choice, it is just a matter of sizing:

> How big do you expect your business to be?

*   Are we talking about Facebook size?  
    Go for Horizontal Scaling.
*   Are we talking about a small single-tenant management tool?  
    Focus on the DB.

Don't make the mistake of pursuing _Horizontal Scalability_ if your target business will never need it, and don't overtrust a single tool and its (promised) performances. (_Yes, even if that tool is PostgreSQL, and I love it with all my heart_).

> Scalability is a business decision.

* * *

## Knowledge Also Matters

Once you have figured out your domain constraints (e.g., no Client App) and business requirements (e.g., I can do that in the DB), you should still consider your **team's experience** and knowledge.

Creating a good DB schema, performant queries, and maintainable functions does not come for free. At the same time, taming all the challenges that come with _Horizontal Scaling_ requires experience and dedication.

> **DevOp is a profession of its own!**  
> (Cloud providers facilitates the maintenance and governance of a complex infrastructure, but the challenges there are far from being fully managed!)

You may decide to **invest in your team skills development** – and IMHO, you will gain some superpowers once they embrace _the SQL way_ – or you can use what you have and pay a consultant to set up your Kube cluster.

> Knowledge Development  
> is a business decision.

This is also a business decision, although **I am biased** toward growing the team's culture and knowledge 😉.

* * *

## Scalability is a business decision

👉 The point here is that **scalability is a business decision** and brings some risks to the evaluation table!

It takes multiple actors to get out of the woods:

*   **Marketing** should provide estimates of the projected _customer base growth._
*   **Product** should translate that input into _data entity growth_ and design the worst-case (still realistic) scenario for data manipulation needs.
*   **Engineers** should run eager load tests simulating data at scale and provide metrics for the _expected lifespan of a DB-centric approach._ (aka, the POC)
*   **DevSecOps** should produce an _operational cost chart_ for a monolithic approach and a service-based solution.
*   **Architects** should evaluate the costs of _increasing the team's knowledge_. Either to write more efficient software or to run a scalable system.  
    _And what would it be like to switch on the run._

**Eventually,**  
**the CEO must drive the decision.**

She knows what is at stake and can use her professionals' inputs to craft a data-driven way forward.