---
title: "Event Sourcing in Postgres: The Client"
description: "How to store different client's reading cursor in PostgreSQL, so to facilitate consuming an event stream by different consumers."
pubDate: "2021-03-26T23:00:00.000Z"
updatedDate: "2021-11-03T16:35:59.000Z"
heroImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDV8fGNsaWVudHxlbnwwfHx8fDE2MzU5MzQ5ODM&ixlib=rb-1.2.1&q=80&w=2000"
---

In this article, we’ll work on top of the [events schema](/2021/event-sourcing-in-postgres-events) in order to store each consumer’s reading cursor.

The goal is **to make it easier for consumers to process our event stream**: instead of being in charge of their reading cursor, a consumer will simply have to remember its own name, and the data model will do the rest.

Here is the query that we want to **consistently run** to process our entire `events` table:

```sql
SELECT * FROM "fq"."events"
WHERE "offset" > (
  SELECT
    CASE count(*)
      WHEN 0 THEN -1 
      ELSE MAX("offset") 
    END 
    AS "offset"
  FROM fq.clients 
  WHERE id = 'CLIENT_ID'
  LIMIT 1
)
ORDER BY "offset" ASC
LIMIT 1;
```

The relevant information that we provide is `CLIENT_ID`: a parameter that **must be unique for each _microservice_** that wants to consume the stream of events.

## The Clients Table

In order to satisfy the read query, we need a table where to store the last consume event’s offset:

```sql
CREATE TABLE IF NOT EXISTS "fq"."clients" (
  "id" VARCHAR(10),
  "offset" BIGINT DEFAULT -1,
  PRIMARY KEY ("id")
);
```

## Writing Events

Writing events in our new data model works exactly as it did before:

```sql
INSERT INTO "events" 
("payload") VALUES
('{"name": "first event"}'),
('{"name": "second event"}')
RETURNING *
```

## Committing Events

Now things get way more interesting. The query we saw at the beginning of the article will consistently return the same event based on the `offset` that is stored in the `clients` table for a specific consumer.

> 🤔 In a real-life scenario **this is bad as it leads to duplicate jobs** when you try to scale up your services. Don’t do it (just yet), this is still a very simple data model and we’ll get into scalability and concurrency later on.

👉 We need to introduce the concept of **committing an event**.

Once our software is done handling an event, we should simply **tell the system to move the cursor forward**. Thanks to Postgres’ ability to handle exceptions, this is very easy to achieve:

```sql
INSERT INTO "fq"."clients"
("id", "offset")
VALUES
('CLIENT_ID', {LAST_CONSUMED_OFFSET})
ON CONFLICT ON CONSTRAINT "clients_pkey"
DO UPDATE SET "offset" = EXCLUDED."offset"
RETURNING *
```

One more time, we identify our consumer process with a simple string, and we provide the last consumed offset so that next time we’ll run the query at the top of the article, **we’ll get the following event in the stream**.

## Moving Forward

In the [next article of the series](/event-sourcing-in-postgres-topics), we’ll learn how to **divide our event stream into multiple topics**, so as to be able to start working on **some real process parallelization**.