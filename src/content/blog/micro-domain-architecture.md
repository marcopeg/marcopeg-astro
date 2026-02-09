---
title: "Micro-Domain Architecture"
description: "A Micro-Domain Architecture is an organization of People and Tech that aim to keep under control the amount of information that must be exchanged between different parties,  and parallelize workstreams."
pubDate: "2022-05-28T09:48:15.000Z"
updatedDate: "2022-05-29T08:25:44.000Z"
heroImage: "https://images.unsplash.com/photo-1645104785584-a0fda0c3e8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDQ2fHxtaWNyby1kb21haW5odHRwcyUzQSUyRiUyRnVuc3BsYXNoLmNvbSUyRnBob3RvcyUyRjRXdWdyMmFsSWxBfGVufDB8fHx8MTY1MzczMTUzMw&ixlib=rb-1.2.1&q=80&w=2000"
---

In this article, I will lay down some ideas on a possible way to orchestrate the creation of complex Products and make them easy(er) to understand and work with.

Throughout almost 20 years of working with web development, from the first _Under Construction GIFs_ to _Big Data_ apps, I've identified some ubiquitous pain points in my beloved industry:

*   **domain knowledge:** how does _Invoicing_ work? How does _Shipping_ work? _Supply Chain Management_... what the heck is it?
*   **cross-domain interoperability:** create a new _Customer_ _WHILE_ creating a new _Invoice._ Who builds what? Is it the _Customer's_ team? Or _Invoicing_ team?
*   **organization setup:** business units, divisions, groups, teams – hiring and retaining Engineers, Architects, IT, DevOps, SREs, Designers, Customer Support, Scrum Masters, Product Owners, Product Managers, Project Managers, Engineering Managers, Staff Managers, Agile Coaches... It's a f\*\*ing army to feed.
*   **communication:** every time Mario says something to Luigi, a princess gets into big trouble. People misunderstand people, servers lose packages, and data formats keep changing.

🎯

The ultimate goal of the Micro-Domain Architecture proposal is to **manage the Product's price** by **managing the amount of knowledge and communication** effort required to build it.

![Freight Containers on a Ship](https://images.unsplash.com/photo-1578575437130-527eed3abbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI3fHxlbnRlcnByaXNlfGVufDB8fHx8MTY1MzcyMzQyMA&ixlib=rb-1.2.1&q=80&w=2000)

Photo by [Andy Li](https://unsplash.com/@andylid0?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

My reference is the Enterprise Product, where you have to think in 10-15 years lifecycle chunks, and you may have to deal with tens of teams that concurrently build one giga-monster Product the size of Amazon or similar beasts.

Nevertheless, you can use Micro-Domain Architecture to structure and simplify the creation of any kind of product, even if it may be a tiny bit overshooting the needs of a simple proof of concept.

But I can't take full credit for the ideas in this article.  
_As it turns out, Mother Nature beat me to it._

Let's consider the Cell, one of the basic structures of all organic Life:

> The plasma membrane (of a Cell) is a composite material, which forms a semi-permeable barrier and an interface for communication between the intracellular and extracellular environments. ([source](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3927121/))

Yes, I love biology. And you should love it too, for so many complicated Computer Science – and people – problems find their solutions in RealLife™ and biology.

![BCC Bioscience Image Library is a media file repository of images and video clips made available to educators and students in the biological sciences. The resources are created by faculty, staff and students of Berkshire Community College and are licensed under Creative Commons 0. This means all content is free, with no restrictions on how the material may be used, reused, adapted or modified for any purposes, without restriction under copyright or database law.](https://images.unsplash.com/photo-1645104948663-9319cc40fb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDIxfHxjcm9zcy1kb21haW58ZW58MHx8fHwxNjUzNzI0Njg3&ixlib=rb-1.2.1&q=80&w=2000)

Photo by [Fayette Reynolds](https://unsplash.com/@fwren?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## Web Apps have a lot in common with Cells:

*   **They have one Single Responsibility**: Twitter manages billions of simple messages, and so do the Neurons in your brain
*   **They have a complex internal structure**: Web Apps have _micro-services_  that perform specific jobs that contribute to the App's mission, and Cells have _organelles_ that do the same
*   **They communicate with the environment**: As Web Apps have public APIs, Cells have a M_embrane_ that is responsible for letting specific substances in and out at particular moments using targeted receptors (aka endpoints)

This article focus on the _Cell Membrane_ and the _Customer-Facing Layer (API + UX)_ of a Web Application.

🎯

My goal is to formulate a proposal that **lets teams work independently** on isolated areas of a project that the Customer perceives as One Single Product.

A Cell's membrane has a lot in common with the _Customer-Facing Layer_ of a complex Product:

*   **It's a composite material**: Web Apps often use more than one technology in their _frontend_, _backend-for-frontend_, _backend_, and _data_ layer
*   **It's semi-permeable**: any Web App needs an Authentication and Authorization layers to block unwanted requests and filter legit ones
*   **It's an interface for communication**: behind any _front-facing layer_, we often find countless _micro-services_ that solve specific problems. The membrane – and the APIs – connect the proper message with the appropriate operator – or _micro-service_ – under the hood

All of these biology-to-computer-science comparisons were necessary to explain where the name "_Micro-Domain Architecture_" comes from:

🤓

**Membrane micro-domains** often referred to as lipid rafts, **are** **specific subdomains in cellular membranes** that are enriched in cholesterol and sphingolipids containing saturated acyl chains.  
  
[(Brown and London, 2000; Simons and Toomre, 2000)](https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/membrane-microdomain#:~:text=Membrane%20microdomains%2C%20often%20referred%20to%20as%20lipid%20rafts%2C%20are%20specific%20subdomains%20in%20cellular%20membranes%20that%20are%20enriched%20in%20cholesterol%20and%20sphingolipids%20containing%20saturated%20acyl%20chains)

> Simple and clear,  
> isn't it?

Yeah, if you are a bit like me, you can't make heads or tails out of this sentence! 😬

So let me help out and identify the actual keyword:

## SUBDOMAINS

### Cells have subdomains, Web Apps have subdomains

It is almost embarrassing how this particular keyword applies seamlessly to both the world of Biology and Computer Science. Especially when you think in terms of _Domain Driven Development – DDD_.

* * *

## Domain != URLs (for now)

When you approach an Enterprise Product and begin to apply _[DDD](https://en.wikipedia.org/wiki/Domain-driven_design)_ to its Single Responsibility – or Mission, as in "we sell stuff online" – you will likely identify multiple _sub-functions_ that are well isolated and mostly independent from one another:

*   Inventory
*   Shopping Cart
*   Checkout
*   Discounts
*   ...

Nowadays we turn to _Micro-services_ as the de-facto standard for the organization of isolated responsibilities.

And _Micro-services_ are an excellent choice, and we need them the same way a _Cell_ needs its _organelles_. But aren't we forgetting something? What about the membrane?

More often than not, we end up with an arbitrary-organized backend and a messy monolithic monster of a frontend, or _Customer-Facing Layer_. For it could also comprise a backend-for-frontend layer.

We clearly need a better way to organize our work, teams, and _Micro-services_.

> Welcome the  
> 🎉 _Micro-Domain Architecture_ 🎉

A Micro-Domain identifies a well-scoped portion of the _Customer Facing Layer_ that targets a group of Micro-Services and **provides a specific Function** to the Product and its users.

🔥

**FUNCTION != FUNCTIONALITY**  
  
A Function represents an area of responsibility of the App. It's a very high-level component such as "Payments or Orders Management".  
  
👉 _A Function is often handled by a Team._  
  
A Functionality (or Feature) represents a piece of customer-oriented business value such as: "add the filter pending payments button".  
  
_👉 A Functionality is often represented by one or more Stories in a Backlog._

## Micro-Domain Architecture

### A micro-domain is an _area of the Business_ Value that supports a specific _Function_

A Micro-Domain comprises:

*   a group of backend Micro-services
*   a composable API layer
*   a frontend App of some kind

\[\[ SCHEMA GOES HERE \]\]

As it turns out, _Micro-Domain Architecture_ is not even a new thing in Computer Science and the art of building Websites or Web Applications.

It's the name I think best represents what I believe to be the internal organization of mature organizations such as Microsoft, Google, and Facebook... have you heard of them?

* * *

![Microsoft Store sign.](https://images.unsplash.com/photo-1640763502425-7668dc1e4023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fG1pY3Jvc29mdCUyMGxvZ298ZW58MHx8fHwxNjUzNzIzNzcy&ixlib=rb-1.2.1&q=80&w=2000)

Photo by [Turag Photography](https://unsplash.com/@turagphotos?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## I believe people at Office.com got it right

Office.com's goal (but the same works for GoogleDocs) is to provide a productivity suite online. It is a complex Product that supports many different Functions:

*   manage documents
*   handle your daily emails
*   communicate with your colleagues

Those are specific portions of Office.com's business value that are represented by different Apps:

*   Sharepoint
*   Outlook
*   Teams

And implemented in sub-domains, probably by different teams distributed around the globe:

*   tsspa-my.sharepoint.com
*   outlook.office.com
*   teams.microsoft.com

But all those Apps, as different as they may be, have quite a lot in common:

*   same session
*   same account
*   same security

And those **shared Functions** are just other sub-domains, really:

*   login.microsoftonline.com
*   myaccount.microsoft.com
*   mysignins.microsoft.com

Microsoft clearly owns A LOT of different domains and sub-domains and divides its complex offering into **many different pieces that are deployed – and likely built – independently from one another**.

> 🔥 In essence, this is a Micro-Domain Architecture 🔥

## Divide and Conquer

### ... said the Romans ... 

And when you start paying attention to the websites and apps you use every day, you see this approach all-around at Google, Facebook, Spotify, Amazon...

> I'm guessing there is a threshold of complexity beyond which you can't really do anything different.

* * *

## What about Micro-Frontends?

Even before reaching such a threshold, or just within a Micro-Domain that grew big, many companies **attempt something similar using IFRAMEs**, the mighty technology of the Modern World.

Because you know:

> _IFrames are to the World Wide Web_  
> _what horses had been to the Wild Wild West_

![Old wagon on the Prairies](https://images.unsplash.com/photo-1599766431396-2405fdfcf5e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fG9sZCUyMHdlc3R8ZW58MHx8fHwxNjUwMjQ4MjUz&ixlib=rb-1.2.1&q=80&w=2000)

IFrames are to the World Wide Web what horses had been to the Wild Wild West - Photo by [Stephen Hui](https://unsplash.com/@stephenhui?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

The idea is to take one single Host App and divide it up into sub-portions that can be worked out (more or less) independently.

> The IFRAME offers a simple and quite isolated solution, but you can also use one of the many different available frameworks that exist for specific techs such as React or Angular.  
>   
> Or just go the generic approach with [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/).

The way I see it, Micro-Frontends are an implementation detail of a bigger scheme of things. The same goes with Micro-Services. We can use both architectures within the scope of a Micro-Domain.

**Micro-Domain Architecture operates at a higher level** in which you have to think more in terms of business and User Value rather than modules and builds.

📌

You can think of a Micro-Domain as a group of Micro-Services with a Frontend attached on top.  
  
Such a Frontend can be organized with Micro-Frontends if it makes it easier for you and your team.

* * *

## Domain Knowledge Required

Every Micro-Domain requires a specific Domain Knowledge.

It seems almost obvious. But I witness companies oversee this detail quite often, in the pursuit of parallelization of their workstreams:

*   they keep moving people across Micro-Domains
*   they underestimate onboarding time for new hires

In the Office.com example, working on the Word or Excel Micro-Domain means that the engineer needs specific domain knowledge in either:

*   word processing and the art of authoring complex text
*   spreadsheet and the art of making numbers tell a story

All the engineers need to know Java or React, but their **Domain Knowledge** is different. Much different.

Instead, when it comes to Micro-Services, they are likely to work within the same Micro-Domain and require more similar domain knowledge.

Think to the Word App: the _spell-check service_ and the _word-count service_ are technicalities to the Word Processing Domain.

📌

It is expensive to move people across different Micro-Domains!

* * *

## How do we keep it all together?

That's a fair question. When things get big – as they often do in the Enterprise World – integrity and uniformity (not to mention security) might become a significant challenge (or should I say a burden?)

There is only one simple answer to such a tricky question:

## User Experience

### UX is the glue that holds together Micro-Domains and all the tech that follows

We do what we do – and we do software – so that some Users out there can do something with it. So, it doesn't really matter _how we do what we do_, as long the User has a **fluent and coherent experience** with what we do.

You can build a monolith, a Micro-Frontend aggregation of IFRAMEs, or a collection of independent Apps neatly organized in Micro-Domains.

> **All works as long your Users say it does.**  
> And they say so when they are willing to pay for your services.

But when it comes to Micro-Domains, it gets trickier than ever. Because you can build each domain with a different technology: one in React, the other in Vue, the third in Svelte. Do you get the gist?

Yes, you can even use Angular if you are _so inclined_ 😉.

🤔

Does this mean Web Components? Stencil? Ionic?  
_Maybe yes, maybe no._

I always vouch for reducing _the amount of tech_ and sponsoring a more profound **knowledge of a few selected tools**.

It's not this article's goal to give out _"do this, do that"_ tips because _Micro-Domains Architecture_ is just a fancy name for a high-level organization of problem/solution tuples. But if you really ask me...

I'd go for React and a **shared library** that exposes framework-level functions such as:

*   authentication
*   client-server communication
*   cross-domain linking

Therefore, such a library should also take care of a few _visible things:_

*   UI Components (maybe based on an existing Design System?)
*   UI Shell (stuff like a toolbar and coherent routing)
*   Provide **shared functionalities** in the form of _panels_ or _popups_ for stuff like account management, notifications, settings

But again, this is just the approach I'd take, and there is no assumption it is more or less correct than others.

📌

In the end, what truly matters is to **achieve a consistent User Experience**.  
  
How we get there is an implementation detail.

* * *

## Make it Accessible!

Accessibility is a ten(s)-year-old hot topic. I'm not going to bother you with font size, color contrast, and spacing. Those are just implementation details of it.

I would take this opportunity of having you still reading my ravaging reflections to address **the one and only Universal Accessibility KPI** of anything:

## The Product Price

### Why didn't you buy a Ferrari last time you changed your car?

Everyone wants the best product, tool, or service. But not everyone can afford its price. Pricing is a challenging subject, for it can heavily affect the success of an enterprise and, eventually, the distribution of any product.

> The cost of a software product is mainly affected by the salary of all the people working on it  
> – A. Manager

Therefore, wasting people's time means increasing the Product's price without an increase of the Product's value. An increased price often leads to a reduction in sales and compression of the company's revenue.

🤬

People get laid off because of this 🤬  
**Don't waste people's time!**

In my experience, the **heaviest center of cost** in the software production business is **cross-team communication**: keeping different teams' roadmaps aligned on the same goal is a true challenge.

Managers and Product Owners lose their minds following this specific white rabbit down a bottomless hole.

📌

The _Micro-Domains Architecture_ mitigates this problem because **it requires less communication** across different Domains.  
  
It unentangles roadmaps and centralizes shared problems into well-scoped domains.

Then tech can mitigate such problems even more by adopting Open Source libraries (or creating them) for ubiquitous problems such:

*   UI Components / UI Shell
*   Client/Server Communication
*   Session Management

* * *

![BCC Bioscience Image Library is a media file repository of images and video clips made available to educators and students in the biological sciences. The resources are created by faculty, staff and students of Berkshire Community College and are licensed under Creative Commons 0. This means all content is free, with no restrictions on how the material may be used, reused, adapted or modified for any purposes, without restriction under copyright or database law.](https://images.unsplash.com/photo-1645104785584-a0fda0c3e8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDQ2fHxjcm9zcy1kb21haW58ZW58MHx8fHwxNjUzNzI0NzI5&ixlib=rb-1.2.1&q=80&w=2000)

Photo by [Fayette Reynolds](https://unsplash.com/@fwren?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## Cross-Domain Interoperability

The last step in the cost-management journey, and the **true unicorn** of software production, is achieving _Cross-Domain Interoperability_.

Let's say our App has two Micro-Domains:

*   Customers Management
*   Invoicing

🤔

The problem is simple:  
  
Whenever you create a new Invoice, you need to associate it with an existing Customer or create a new one.

The _Invoicing_ domain needs to **consume a functionality from** the _User Management_ domain.

Most solutions share their backend services by providing cross-domain APIs but duplicate the Frontend components. And this duplication has three inevitable and dangerous side effects:

*   it leads to inconsistent UX
*   it increases the production and maintenance costs
*   it requires heavy communication between _Invoicing's Frontend Team_ and _Customers' Backenders_

🎯

Cross-Domain Interoperability in the Frontend is a critical problem to solve if you want to keep your costs under control.

Luckily for us, the _IFrame_ technology is always there to support us 🤠.

We can develop each View of each Micro-Domain so it can be embedded into other Micro-Domains of the App. More or less the same as you can embed an Excel spreadsheet into a Word document.

> _Stuff like_ [_Query string params_](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) and [_postMessage()_](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) make our life easier.

But you can even go one step further and build a **shared library of stateful components**. Then, you could use those business-aware building blocks to overcome the Cross-Domain Interoperability issue easily:

```jsx
import CustomerPicker from '@CustomerMgmDomain/CustomerPicker'

const NewInvoiceForm = () => {
  const [customer, setCustomer] = useState()

  return (
    <form onSubmit={...}>
      ...
      <CustomerPicker onChange={setCustomer} />
    </form>
  )
}
```

Let me highlight that sharing components **slightly increases the coupling** of different domains.

> Even when you use dependency management tools such as _NPM_, different teams still need to clearly communicate new functionalities and possible breaking changes are released.

When your organization chooses this approach, make sure you get a few things right from the very beginning:

*   use semantic versioning
*   write detailed changelogs
*   update your dependencies often

I suggest you use source-control-based static analysis tools to keep an eye on dependencies that fall behind the latest LTS and produce dashboards to visualize such information.

💡

Just going through your organization's `package.json` files and compiling a list of outdated projects could be an _exciting task for your interns or new hires_ (a python script may do very well) and would produce immense value for your Product.

* * *

![Metal work](https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fG1ldGFsJTIwZmFjdG9yeXxlbnwwfHx8fDE2NTM3MjUwMjA&ixlib=rb-1.2.1&q=80&w=2000)

Photo by [Josh Beech](https://unsplash.com/es/@ig_joshabeech?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## Waaait a minute! Is it only about the Frontend?

No, of course, it isn't!

The Frontend may hold a huge responsibility, for it sits at the top of the _Customer-Facing Layer_ of our App, but it needs to be supported by a couple of infrastructural Micro-Services as well:

*   Service Registry
*   Schema Registry
*   Proxy Service
*   Session Delegation

For each item on this list, we have an extensive offering from the [CNCF](https://www.cncf.io/) and public cloud providers... And those may be great choices in many cases, but we shouldn't blindly accept candies from strangers, right?

> Mom won't be happy if we do

🧐

It turns out that many CNCF projects are compelling... and **incredibly overshooting our day-by-day needs**.

Take Apache Kafka, for instance. For most of the projects that I've been managing in my 20-years career, _a (partitioned) PostgreSQL table would suffice_. Of course, few big-scale products genuinely need the power and scalability that Kafka has to offer.

> But please consider the [Pareto's Principle](https://en.wikipedia.org/wiki/Pareto_principle)!

Anyway, this topic alone would be a good spin-off for another long, long article.

* * *

## Wrapping It Up

To my understanding, the need for synchronized information is blocking most workstream parallelization opportunities. And this costs a lot of money.

A Micro-Domain Architecture is an organization of people and tech that aims to keep under control the amount of information that different parties must exchange between different parties.

The goal is to manage the production and maintenance cost of a product and maximize true parallel workstreams.