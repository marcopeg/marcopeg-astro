---
title: "How to optimize Postgres for SELECT COUNT(*) on massive tables"
description: "How to (slightly) optimize SELECT COUNT(*) performance on PostgreSQL using partial indexes."
pubDate: "2017-12-02T23:00:00.000Z"
updatedDate: "2021-11-01T15:57:12.000Z"
heroImage: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGVsZXBoYW50fGVufDB8fHx8MTYzNTc4MjIyMA&ixlib=rb-1.2.1&q=80&w=2000"
---

**The short answer is: “indexes”.**  
But you can read the rest of the story here :-)

* * *

Last night I let my new shiny crawling system run the entire night to collect data about pizzas and margaritas all around the world.

> yes, pizzas and margaritas are my record’a types

I had 18 machines running on _AWS_ who’s sole purpose in life was to collect new data and push it into a generic JSON blob in Postgres. Believe it or not the system held and **this morning I found ~9Gb of data being collected overnight**.

> But how many items are there?  
> How many pizzas?  
> How many margaritas?

I couldn’t hold my curiosity so I opened my console and ran:

```text
SELECT COUNT(*) FROM 'big_table' where 'type' = 'pizza';
```

Postgres begun crunching my query and I could almost hear the physical server tickling somewhere in AWS’ farmhouse in the middle of the green Ireland. But suddenly - just 175 seconds into the query - the tickling ceased: **my Postgres gave up and crashed**.

After some googling I came up with the understanding that by `SELECT COUNT(*)` **I’m asking my db to go through the entire data collection at once** to calculate the query result. This sounds like an absurd request even to my database unexperienced little brain!

## Idea n.1 - counters table

Everybody knows the first idea is likely a stupid idea and this is no exception to the rule. I little brain told me something like this:

> __MY BRAIN:__  
> __what if we build a table with `counter_name | counter_value` and increment the value for a `pizza_counter` every time we find a new pizza, and also increment a `margarita_counter` when we got lucky and find a margarita?__  
>   
> __ME: wow brain, that is cool! Then when I want to know how many margarita it will be a single read hit on the db! Genius!__

… and few minutes later:

> ME:  
> **brain you are a dumb idiot**: are we really going to hit the db three times for each writing just to keep a counter???

this solution requires the following step for each newly found pizza:

1.  add the new pizza
2.  read the counter value
3.  save the incremented counter value

(2 + 3 can be executed in a single hit, still it is an `UPDATE`)

## Idea n.2 - index tables

To be honest my second idea was a good one:

> __MY BRAIN:__  
> __what if we **maintain one table for each record type** (pizzas, margarita, …) and **append a new line** every time we find a new pizza, a new margarita and so forth? The `INSERT` would be quite cheap and to get the total amount is just a matter of selecting the last inserted row’s incremental value!__  
>   
> __MY: brain this is pure genius! now we optimize both writing AND reading!__  
> __I knew you could do better than Idea n.1 :-)__

… and few minutes later:

> ME:  
> **brain you are a smart idiot**: what you described already exists in most of the commercial dbs in the market!  
> those “index tables” are called just “indexes” and you should be studying them now!

## The Solution - Partial Indexes

After some more googling I came up with some simple [partial index](https://www.postgresql.org/docs/8.0/static/indexes-partial.html) queries that sped up my system very much.

```text
CREATE INDEX 'pizzas_count' on 'big_table' (id) where (type = 'pizza');
CREATE INDEX 'margaritas_count' on 'big_table' (id) where (type = 'margarita');
```

This operation took some time to execute (~26 seconds for both the queries) but now I can query my `big_table` to get the informations I need:

```text
SELECT COUNT(id) FROM 'big_table' where 'type' = 'pizza';
SELECT COUNT(id) FROM 'big_table' where 'type' = 'margarita';
```

## Considerations about Indexes:

Indexes are incredible tools and I regret every professional day I’ve worked on databases ignoring them.

> Not using indexes is using MySQL or Postgres just like they were a big Excel, and to say that a database without good indexes is “sub-optimal” is just an overkilled effort to be nice to the engineer that is maintaining that system.

True story.