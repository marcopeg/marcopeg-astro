---
title: "Context Fuels Language Models"
description: "Just as machine learning algorithms rely on quality training data, large language models thrive on their given context."
pubDate: "2025-01-31T13:32:23.000Z"
updatedDate: "2025-01-31T13:32:23.000Z"
heroImage: "https://images.unsplash.com/photo-1679679195912-29d0190805ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxjb250ZXh0fGVufDB8fHx8MTczODMxNzU0M3ww&ixlib=rb-4.0.3&q=80&w=2000"
---

Just as machine learning algorithms rely on quality training data, Large Language Models (LLM) thrive on their given context.

Prompting an LLM is essentially crunching data; some it knows, some we provide. While RAG _(Retrieval-Augmented Generation)_ can handle vast contexts, new and bigger models often just need the proper context in the prompt.

For example, a prompt like:

> “Give me a recipe for cooking a meal.”

It can only produce generic recipes. But if you add context, like a list of ingredients you have at home, the LLM can offer a recipe tailored to your fridge's contents, leading to something you can cook.

> “Give me a recipe for cooking a meal. I have pasta, eggs, and GUANCIALE.”

## Less Is More

The trick is balancing enough context to be helpful without overwhelming the model. Too much context can confuse and reduce accuracy. Tailoring context to the task ensures optimal performance and cost-efficiency, as more tokens mean higher expenses.

Going back to the meal example, overwhelming the model with amount, brand, expiration date and purchase price of my ingredients, won't help the LLM producing relevant ideas. Worse, it could make it focus on using next-to-expire ingredients instead of giving me creative ideas.

> Using a **layered approach** can yield excellent results.

1 - We start with less powerful, cost-effective models for broad context narrowing. These initial prompts reduce the context by focusing on relevant items.

2 - We switch to more powerful models for advanced tasks, providing deeper, more meaningful context specifically for the items selected by the first model.

This balances economy, efficiency, and performance, ensuring we pass only relevant information and keep costs and performance in check.

## Text2SQL - The New Gold Rush

In a Text-to-SQL context, the layered approach shines when dealing with complex databases.

Imagine a [DVD rental business database](https://www.postgresql.org/ftp/projects/pgFoundry/dbsamples/pagila/pagila/).

We have tables to store movies, categories and actors. Then other tables to manage a chain of shops, with managers and employees. Some other tables are needed for tracking which DVD is in which store, how many copies, how old they are. And then we need more for customers, rental transactions, payments, late returns fees. Even an example dataset such as the [Pagila DB](https://www.postgresql.org/ftp/projects/pgFoundry/dbsamples/pagila/pagila/) quickly grows into tens of tables!

Users might ask questions like "_Identify the month with the highest revenue_" or "_What is the top-performing movie of all time?_".

> Each question requires different sets of tables.

Instead of feeding all the schema details at once, which could involve thousands of tokens and slow down processing, we switch to a layered approach – or Layered Workflow:

1.  🧑‍💻 Collect a comprehensive but shallow context on the DB
2.  🤖 Filter objects that are relevant for crafting a query
3.  🧑‍💻 Collect a deep context about those objects
4.  🤖 Build the query

The initial prompt identifies relevant tables using a simpler model, focusing on general schema names and minimal metadata. Once narrowed, a more robust model receives detailed, specific context—like table fields, constraints, and indexes—to generate the precise SQL query.

This Layered Workflow method reduces complexity upfront, ensuring efficiency and accuracy in the final step.

## Orchestrating APIs - The BIG Gold Rush

The same approach used in Text-to-SQL can be applied to coordinating API calls across complex systems.

Consider an application that integrates multiple services, where each subject could be even more complex than the DVD Rental business (I'm talking invoicing of course!):

*   Authentication
*   Accounting
*   Invoicing
*   Inventory
*   Product catalog
*   File Storage

> _Give me the image of the best-selling product last month_

A colleague from Marketing – let's call her Jane – might ask: _“Give me the image of the best-selling product last month,"_ but this request is too vague for both humans and LLMs to process directly. Also, the answer doesn't lie in a single well-organized relational database... so Text2SQL offers no benefits here.

If given to a human, they would probably approach this task this way:

1.  Gather generic business information about the purpose of each service  
    _(How does the service X contribute to my problem?)_
2.  Identify the services relevant to my problem  
    _(authentication, product catalog, invoicing, file storage)_
3.  Gather technical information – only for relevant services  
    (How do I get the top-selling product? How do I get a product image? ...)
4.  Find the right order of execution  
    (get the ProductID -> get the ImageID -> get the URL)
5.  Translate this plan into actionable code or cURL calls
6.  Download the image
7.  Send it back to Jane
8.  ☕️

This multi-step, interdependent process requires a **structured, layered approach** to automation—each layer requiring a different context in both spread and depth.

Here is a breakdown of the different steps with a note on the context:

1\. **Identify relevant services** – We need information about every level but only at the high business level. What does the service do? A list of available actions, described with business goals in mind, is what we need here.

2\. **Discover API endpoints** – Each service contains multiple APIs; only a subset is relevant to the problem. To filter this out, we still need business-oriented information, which must be specific to each API's endpoint.

3\. **Extract deep context** – Once key API calls are identified, details such as required parameters, response formats, and execution order are gathered. This becomes technical, but that's precisely the kind of information that the LLM needs to figure out: _"The Products Catalog gives me an ImageID, but I need a URL so I can find that in the File Storage service."_

4\. **Construct the execution plan** – Finally, the system generates structured API calls, either as a Python script, a set of sequential requests, or a workflow definition.

## What about Agents?

This layered approach aligns with the concept of **agentic workflows**, where different **agents** are specialized in solving specific tasks and can be orchestrated to work together. However, agents are not general problem solvers—they are built to perform well-defined tasks, such as retrieving data from an API (single), executing a transformation, or processing an already refined context.

> _🤖_ Filtering out relevant tables from a DB connection string is a task for an Agent _🤖_

While there is some overlap between an agentic workflow and a layered workflow, the latter focuses on a **high-level breakdown** of the problem. Instead of assigning a single agent to figure everything out, the goal is to **systematically decompose** the request into **multiple levels of information discovery**. Each step or layer can leverage agents to **gather information, execute API calls, or process data**.

This way, agents become essential components of the process but **operate within a structured framework**. The layered workflow is the **high-level coordinator**, ensuring that agents are used effectively at each stage.

While the agentic workflow aims to be generalistic and autonomous, the layered workflows accepts that **domain-driven workflows** exist and can be identified and coded in advance, facilitating the job of lower-level agentic approaches.

## Where does the context come from?

One of the biggest challenges in a layered workflow is **context extraction** — gathering the necessary information at each stage.

Unlike static documentation, this **context cannot always be pre-created** for every possible request. Instead, it must be **crafted on demand** at each stage, with varying levels of depth depending on the problem being solved. However, the extracted information must come from structured, machine-readable sources to make this process **scalable and automatic.**

The best sources of context are **metadata embedded within technical systems**. In this article, we’ve discussed **databases and APIs** as examples:

• **Databases**: Most database systems support **comments and annotations** on tables, columns, constraints, and other objects. 👉 Extracting context information becomes a simple query operation if meaningful descriptions are attached to these objects. Instead of relying on external documentation, we can systematically **query metadata** from the database itself.

• **APIs**: OpenAPI specifications and tools like **Swagger** provide structured documentation that describes API endpoints, expected parameters, return values, and error responses. While these specs primarily focus on technical aspects, they also support **embedded comments**. Just as database fields can be annotated, API documentation should not just describe the technical parameters but **also explain their business purpose**.

In both cases, **meta comments** become key. Developers often document function signatures, API parameters, and SQL schemas, but those **alone are not enough**.

The missing piece is **business context**—information explaining how a particular table, API, or constraint contributes to solving a real-world business problem.

For example:

• A **database constraint** might enforce a rule limiting the number of discounts a customer can apply, but the **business intent** is to prevent fraudulent usage.

• An **API parameter** might accept an account ID, but the **real meaning** is to compartmentalize information and prevent data leaking.

## Who writes the Annotations?

While technical metadata can be extracted automatically, **higher-level business information must be authored manually**.

This embedded documentation should not be written by developers alone—it requires **collaboration with business analysts, product owners, and domain experts** who understand the **WHY** behind the data and APIs.

By integrating **business intent into structured metadata**, we enable agentic workflows to **automatically extract the proper context** for each layer of the process:

• **Low-level context** (e.g., list of fields, data types, API parameters) can be extracted and processed directly.

• **High-level context** (e.g., how an API or table contributes to a business objective) must be annotated manually and retrieved when needed.

🚧 It is crucial to note that while low-level context can be fully automated (changing a property in the code will correctly regenerate the Swagger), all **the business annotations must be maintained and periodically reviewed**. If we don't do so, we send the wrong information to the LLM, leading to wrong answers.

## What about documentation?

Historically, people write code in a repo and then write documentation elsewhere.

Updating a codebase requires the effort of updating the connected documentation. It's already difficult to remember to do so, and it's almost impossible to remember where that particular Word document or Confluence page is.

Documentation is tough.

But there is a silver lining here. Suppose we decorate our technical sources (DBs, APIs) with enough metadata so an LLM can determine how to chain queries or calls. In that case, we've already written enough for another LLM to produce and update that Word document.

🕊️ By crafting good business-oriented annotations, we can get two birds with one stone:

*   Chatbot interface to complex problem-solving
*   Generate (and UPDATE) discoursive and human-level documentation

Although the Chatbot may seem to make documentation irrelevant, that is just wishful thinking: Even the best-performing chatbot needs human input to produce value.

You need to know what to ask. So, you still need an introduction to a new domain.

> In the end, it is still you driving the car.  
> Even when the car does all the steering.