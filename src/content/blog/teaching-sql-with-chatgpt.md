---
title: "Teaching SQL with ChatGPT"
description: "Explore how ChatGPT is transforming SQL learning. This AI doesn’t replace database engineers, but serves as a powerful assistant that simplifies the creation of complex queries and data generation. Dive into the future of database education."
pubDate: "2023-06-13T06:36:58.000Z"
updatedDate: "2023-06-19T11:58:46.000Z"
heroImage: "https://images.unsplash.com/photo-1652342531749-5088d600a2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDc4fHxFdm9sdXRpb258ZW58MHx8fHwxNjg2NTQ4NzYzfDA&ixlib=rb-4.0.3&q=80&w=2000"
---

### A New, Exciting Frontier in Database Learning

There I was, standing in front of a skeptical group of engineers coming from all walks of life. The one thing they had in common? They all thought SQL and databases were boring to death. And honestly, so did I. But I had an ace up my sleeve, and I could not hide a mischieving grin while bringing up ChatGPT's prompt and started typing:

> Create an IMDB-like database, and fill it with demo data so I can play with it.  
>   
> As you are on it, give me the SQL query to find the top 5 successful movies by net revenue.

As my students tried to grasp the complexity of the task ahead, planning for data research and whiteboarding-driven discussion, the bot promptly begun to spit out code, making it quite clear that it was a simple task:

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT,
  release_year INTEGER,
  revenue DECIMAL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT
);
```

Here you have the [full source code](https://gist.github.com/marcopeg/881bddd7f8449279cb9b4e8dbddfd6ee) and the link to a [working SQL fiddle](https://dbfiddle.uk/ftadn4DF).

[

SQL Trainint with ChatGPT

SQL Trainint with ChatGPT. GitHub Gist: instantly share code, notes, and snippets.

![](https://gist.github.com/fluidicon.png)Gist262588213843476

![](https://github.githubassets.com/images/modules/gists/gist-og-image.png)

](https://gist.github.com/marcopeg/881bddd7f8449279cb9b4e8dbddfd6ee)

The rest, as they say, is history.

* * *

![Hard work](https://images.unsplash.com/photo-1599058917212-d750089bc07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fHRyYWluaW5nfGVufDB8fHx8MTY4NjYzMjA5Nnww&ixlib=rb-4.0.3&q=80&w=2000)

Photo by [Karsten Winegeart](https://unsplash.com/fr/@karsten116?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

### What can you achieve in a Few Hours of Training?

I ran a full week of ChatGPT-based SQL training with three distinct groups of people: junior engineers, experienced software developers, and managers. They had different goals and needs but shared fears and doubts regarding learning SQL.

The common belief is that Data Engineering is a complicated subject that is better to avoid. Managers delegating to engineers, Engineers delegating to ORMs. Everyone loses all the advantages that a good DB engine provides, ending up wasting a gigantic amount of time and resources by duplicating in the Application Layer what had already been done by Postgres, Oracle, MSSql, MySQL, MongoDB, ElasticSearch, Cassandra, and many others.

Here are a few things that ChatGPT made possible during the week:

*   **In just 2 hours,** a Junior Engineer in her fifties with no previous database experience could play with indexes to optimize a query running on a vast dataset she generated on the fly.
*   **Within the first day** of the "advanced course," a Senior Backend Engineer ran efficient load tests on an existing schema, comparing indexes and execution plans.
*   **In about 4 hours,** a PO managed to use Postgres and [Hasura.io](https://hasura.io/) to generate the full API for its product, complete with multi-role access and webhook-based side effects. _(PoC level, but still. He was close to tears)_

* * *

![Captured in a metropolitan Atlanta, Georgia primary school, this photograph depicts a typical classroom scene, where an audience of school children were seated on the floor before a teacher at the front of the room, who was reading an illustrated storybook, during one of the scheduled classroom sessions. One of the female students was assisting the teacher, while the rest of the class listened attentively to the instructor’s narrative. ](https://images.unsplash.com/photo-1588075592405-d3d4f0846961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDIwfHxjbGFzc3Jvb218ZW58MHx8fHwxNjg2NjMyMDIxfDA&ixlib=rb-4.0.3&q=80&w=2000)

Photo by [CDC](https://unsplash.com/@cdc?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

### The Evolution of Database Education

The classroom has evolved. We once taught syntax using reference books; we now present possibilities for discussing real-world success cases.

The AI takes the helm when it's time to translate to a particular technology language. SQL is a particularly happy case due to the vast amount of online discussions the bot has been fed during its training.

Tasks that used to take hours or days now take a few seconds to complete.

  
**And so the obvious question:**

> Does AI replace Engineers?

NO.

I repeat, NO.

One more time: NO.

* * *

![Title: Public Instruction Offices - showing congestion Dated: August 1913 Digital ID: NRS4481_ST5131 Series: NRS 4481 Government Printing Office glass plate negatives](https://images.unsplash.com/photo-1680171267008-73c3af8dd2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDc0fHxWaW50YWdlJTIwb2ZmaWNlfGVufDB8fHx8MTY4NjU0NzE1MXww&ixlib=rb-4.0.3&q=80&w=2000)

Photo by [Museums of History New South Wales](https://unsplash.com/@mhnsw?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

### It's just History repeating herself!

Let's move back a hundred years.

Before the invention of the Calculator, there were rooms full of people doing basic calculations to figure out balances, taxes, payrolls...

Enter the [first portable Calculator](https://www.casio-calculator.com/Museum/Pages/Numbers/001/001.html), and all those people become obsolete overnight.  Did we kill them? No! Did we fire them? Not even! What happened to them then?

> They evolved.

Automation begets evolution. As those old guys evolved from Calculators into Accountants, we will (have to) evolve from Coders into Architects.

More Accountants opened the possibility for new businesses to open shop. Today Software Architects are a bottleneck to most technology-based businesses. This will change: Coders will evolve into Engineers, Engineers into Architects. And we will do much more than what we do now.

All thanks to the automation of a simple and deterministic part of our daily activity: coding.

After all, history loves repetition. We did this just a few times over the course of the millennia:

*   Storytellers had to reinvent themselves after we introduced the [writing technology](https://en.m.wikipedia.org/wiki/History_of_writing)
*   Monks spent their lifetime copying books before Gutenberg came up with the [movable types printing press](https://en.m.wikipedia.org/wiki/Printing_press) in 1440.
*   Boys selling newspapers at the street corners got to put it up with [radio and TV broadcasting](https://en.m.wikipedia.org/wiki/Broadcasting).
*   People selling newspapers and broadcast networks had to deal with a little thing called "[The Internet](https://en.m.wikipedia.org/wiki/History_of_the_Internet)"...

Many examples, I know. I love history. History proves our innate ability to adapt and evolve. Sometimes we are forced into it, and it could be brutal. But we are the only species capable of Proactive Evolution.

Don't waste your ability binge-watching on Netflix!

* * *

![](https://images.unsplash.com/photo-1591262184859-dd20d214b52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGV2b2x1dGlvbnxlbnwwfHx8fDE2ODY2MzI2MjF8MA&ixlib=rb-4.0.3&q=80&w=2000)

Photo by [Eugene Zhyvchik](https://unsplash.com/@eugenezhyvchik?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

### AI, Evolution, and Education: Where do you stand?

Wrapping this up, ChatGTP is a useful tool, and it is already shaping the way we approach our daily tasks, including teaching and learning SQL.

But the bot needs someone prompting good questions and carefully evaluating the answers. This tool is nearly useless without your knowledge and experience, much like a fast car driven by a three years old kid. Not good enough.

As I slow down on the keyboard, ready to ask ChatGPT and Grammarly to work on my bloated first draft, a few questions come to mind for you:

*   What can you do with it?
*   What can you learn with the time that it frees you up?
*   What knowledge and experience do you need to build to efficiently drive an effective conversation with an AI that has near-real-time access to more knowledge than you can ever acquire in 10 lifetimes?

The preaching is over; go in peace 🤘.  
Marco.