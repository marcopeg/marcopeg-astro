---
title: "Scale it up, stupid!"
description: "Knowledge plays a paramount role in performance management, scalability of a system, and ultimately in regulating the costs of a product. In this story, I share a failure that pushed me to increase my knowledge."
pubDate: "2023-02-02T07:30:06.000Z"
updatedDate: "2023-02-02T07:30:06.000Z"
heroImage: "https://images.unsplash.com/photo-1603815671596-31aa538d8809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI0fHxhbmdyeSUyMGN1c3RvbWVyfGVufDB8fHx8MTY3MDA3NzQ0Nw&ixlib=rb-4.0.3&q=80&w=2000"
---

Everything looked as normal as it should be on a slow-going Thursday afternoon, but the email read:

> 🔥 URGENT: the system is down,  
> and the business is blocked! 🔥

Little I knew I was about to embark on a quest between free knowledge and cold money.

A journey that would take me to the dark side of the moon and back. An adventure that paved the path to a promising career as a Backend and Data Engineer.

### The Status Quo

In 2009 the financial crisis struck Europe. I was freelancing as a software developer and had just gotten married. It wasn’t the best moment to have an angry customer who threatened to leave me and bring his business elsewhere.

Most of my income came from institutional websites and e-commerces, but I also tried to sell online custom-made management tools. This was years before “The Cloud” became a thing, and it wasn’t easy to convince a customer to move his data on the Internet. Anyway, I believed that was the future.

Matteo was moving his first steps into his private medical practice. He needed a simple invoicing system to outgrow Word+Excel while keeping the cost below the average CD-ROM alternative.

He already trusted me with his website's CMS, so we decided to extend its admin panel with the invoicing functionality.

It took a few weeks, but I delivered a good user experience on a cheap 18€/year shared hosting service. Using PHP and MySQL, I brought value to my customer, that could then manage his service inventory and invoices for the price of a haircut.

### The Incident

A few months later, Matteo reported general slowness in his invoicing App. Listing documents took up to 30 seconds and was often time-outed.

Initially, I was pretty dismissive of it, explaining that a cheap shared hosting service had its ups and downs. "Just try again," I used to say. Matteo was not pleased.

Eventually, the situation worsened and creating new invoices crashed the entire website daily.

Matteo was angry.  
   Matteo wanted answers.  
      Matteo required a solution.

### The Rising Action

I got to work, and after some drilling, I figured out that **the database was the bottleneck**. Matteo produced _over a thousand invoices_, and MySQL couldn't keep up with such _big data_ on the meager shared hosting service.

Happy to have solved the mystery, I reported my findings to the customer and **suggested scaling up** his hosting service to a semi-dedicated tier. More CPU would allow MySQL to crunch a significant amount of data faster.

I explained that I would do the upgrade for free as a token of my will to keep up a good relationship, but the **service fee would grow** from 18€ to 72€ a year.

> That's **four times the original price** or a cost growth of 300%, depending on which metrics you eat for breakfast.

### All Is Lost!

Do I need to tell you what happens next?  
Instead of scaling up the service, **Matteo escalated** the situation.

He sent me a written notice to terminate our business and move his invoices back to his home computer. I remember reading that email over and over, **addressing my fury and frustration towards MySQL** for being such a slow database.

I could not lose the customer. Of course, money was tight, but it was also a matter of principle: convincing a customer to trust its data to The Internet in 2009 was a herculean endeavor, and I wasn't just resigned to admitting that the system wasn't good enough.

### The Climax

They say that when you have nothing to lose, you try anything. That is not exactly true. I didn't know what to try:

> I did know WHAT the problem was,  
> but **lacked the knowledge** to understand the WHY.

The one thing that sounded weird to me was that WordPress, back then a fast-growing online publishing software, managed to **run huge websites and used MySQL**. How could that be? Who could I ask?

> So I asked Google: _"how to speed up MySQL."_  

Maybe naive, but it revealed a somewhat effective search key.

Besides the settings-tuning low-level articles I could barely understand enough to skip reading, **I found references to a functionality called "INDEXES."** After reading through a few tutorials, I felt safe enough to test it in production:

```sql
CREATE INDEX speed_invoices ON invoices (customer_id, created_at);
```

**It took one single SQL instruction** to create an index on the invoices table ad make my software run faster than I could ever imagine.

This was a pivotal moment in my career.

> It took one single SQL instruction to pivot the performance of my software and achieve great results.

### And they lived happily ever after

In _IT_, you don't get to run away with the young and beautiful lady when you save the world. It never happens. But a **happy customer who trusts you** with their business still makes my day!

I asked Matteo if he could try the software one more time before we parted from each other. To his surprise, not only he confirmed the invoices were blazing fast, but he also reported that the entire website and back-office area felt like completely new software.

He was happy for two reasons:

1.  Great performance
2.  No increase in the yearly fee

I was happy because I could easily apply the same optimization to all my customers, collecting a few thank-you emails that I still remember.

> One line of SQL made a LOT of happy customers!

### The End

This is a true story in which I was confronted with a choice:

*   Increasing the infrastructural spending
*   Or increasing my professional knowledge

**I didn't know enough to choose by myself**, my customer forced the decision on me, and I feel lucky it happened.

> Luckily, my customer chose for me.

In hindsight, my lack of knowledge had a price that I can calculate: Matteo brought in nearly _250€/year in recurring revenue_ and stayed with me until I closed the shop and moved to Sweden in 2013.

**I risked losing 1000€ worth of low-effort business because I didn't know about database indexes**, and I risked bringing a 300% price increase to my customer due to ignorance.

> I risked losing 1000€ over my lack of knowledge!

That is because I was using _ORMs_ like everyone else. I was told to stay away from the database layer, to use abstractions, and to use models.

All good tips, right?

### The Twist

Fade to black, and fast forward 13 years.

Let me now connect the dots between this experience and the world that I see developing all around me. Let this be my cry for attention to what is truly important: your knowledge.

> Don't sell your soul to the Cloud!

Now is 2022, and _Azure_, _AWS_, and _GCP_ tell us that we should put all our logic in the Cloud, use serverless components, and **use any products off _THEIR_ shelves**.

We should _scale horizontally_ but with big machines with up to 64 cores and graphic cards for faster (bitcoin) processing. We should use _No-SQL_ databases to reach consensus in a cluster of powerful nodes. We should keep our events in _Kafka_ and our queues in _SQS_ or _RabbitMQ_. _Sockets_ and _gRPC_ should permeate our communication channels, but only with end-to-end certificates managed by _DAPR_.

Every resource should be redounded in a different _Availability Zone_, assets should be distributed through a _CDN_, and a warm replica should always be ready to jump into action shall s\*\*t hits the fan. Point-in-time backups should have _lifecycles_ of their own that move data from the _data lake_ up into the _Glacier_.

And then, we shall add _vitals_ monitoring services to everything.

Everything.

And dashboards.

Dashboards should cover every wall in our offices. We need more screens to ensure those dashboards are visible to those who are not actively working on some tasks.

Or to management.

* * *

What have we done?

Isn't this like the medical system? An industry in which we are gradually **moving from crafting healthy human beings to keeping bodies alive?** Constantly monitored, filled with pharmaceuticals. Hell, the insurance company will cover the bill!

Going back to the IT industry, is it worth learning a bit about everything to survive the endless options to purchase services out of the Cloud shelf?

Or is it better to **choose a few tools and cut deeper into what they can do for us?** Or what can we do with them when used correctly? Like with indexes?

* * *

As always, I leave you with the answer to everything: 42, no, Postgres, no, eat veggies, no, 42.