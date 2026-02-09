---
title: "Pair programming with ChatGPT"
description: "I had a natural and practical pair programming experience with ChatGPT. I'm excited and shocked at the same time. Is this going to replace me?"
pubDate: "2022-12-25T09:21:32.000Z"
updatedDate: "2022-12-25T09:21:32.000Z"
heroImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI0fHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDB8fHx8MTY3MTk1NzcwNA&ixlib=rb-4.0.3&q=80&w=2000"
---

A few days ago, [ChatGPT](https://openai.com/blog/chatgpt/) was released for the entire world to marvel and wonder whether our Adam-inherited struggles through life had come to an end, thanks to our eternal eagerness to fly higher than Icarus, past the sun, reaching for the stars.

ChatGPT is a general-purpose chatbot that you can simply talk to using your keyboard as a human-to-machine interface. I ran a few experiments, and I can tell you this is the closest thing I could ever imagine to what is described in [Her](https://www.imdb.com/title/tt1798709/).

Now let us jump to recent research that I've been running for the last couple of days. As a data engineer, I struggle to find a high-performance solution to automatically create time-based table partitions in PostgreSQL at data insertion time.

> When a new record is appended to a table, the relative partition should be created on-the-fly if it didn't exist already.

I think I found a decent solution to this issue, but I'm not going to bother you with that in this article. What is relevant here is that I ran the question to ChatGPT:

> How do I create automated time-based partitions in Postgres?

This was the starting point of an experience that I can only refer to as **a _pair programming_ session in which I held the _Navigator_ role**.

The bot began issuing explanations and code examples, all relevant material but rather incomplete. It looked like it was simply rewriting (for the better) the standard PostgreSQL documentation about partitioning.

I can't tell you why, but it chose to partition by year, and I wasn't satisfied by it, so I gave my feedback:

> I would like the partition to be by week

This is just plain English, with a contextual reference to the results that it had just provided. It f\*\*\*\*g worked. I got a new code with the correct time rules applied to it.

Plus, here are some excellent explanations regarding _INTERVALS_ in PostgreSQL!

I can continue with the detailed report, but my wife wants me to run to the supermarket, buy lasagna, and cook our Christmas meal. So I let you with the full recording of the session:

Watch this at double speed...

The end of the story is... we (programmers) are screwed. What it once took days to discover now takes seconds.

I ran a few other experiments, and I got the following:

*   A correct-ish implementation of the PushID algorithm in _plpgsql_, though I had to give a lot of guidance
*   A correct docker-compose.yml to run ElasticSearch with minimal memory footprint – correlated by the explanations why that is a bad idea
*   A correct explanation of an _APPEND-ONLY_ data structure in PostgreSQL – with a content quality so high that I can easily copy/paste it and create a new article out of it

**I used to be the hero, but now I feel like I will be the sidekick.**