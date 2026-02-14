---
title: "Schema Registry"
description: ""
pubDate: "2022-05-27T05:55:08.000Z"
updatedDate: "2022-05-28T05:36:50.000Z"
---

<p>Any big enough Application that composes multiple services relies on some form of messaging. </p><p>Nowadays, we typically use <em>JSON</em> to pack our data, hence we need to apply schema validation in order to guarantee the coherent structure of a certain payload, and avoid nasty <em>undefined</em> reference errors.</p><p>A <em>Schema Registry Service</em> works much like the <a href="__GHOST_URL__/service-registry">Service Registry</a>, but instead of URLs, it serves out versioned <a href="https://json-schema.org/">JSON-Schema</a> documents.</p><blockquote><em>Your App should use those documents to validate anything that goes around JSON Payloads: requests, responses, messages, DB documents... </em><br><br>– <em>To trust is good, to test is best!</em></blockquote><p>IMHO, it is critical that this service is composable AND distributed. As so to offer <strong>bottom-up publishing and top-down distribution</strong> of its contents.</p><div class="kg-card kg-callout-card kg-callout-card-blue"><div class="kg-callout-emoji">📌</div><div class="kg-callout-text">The main difference between the Schema and Service registry is that the <em>Service Registry</em> only serves the latest version of its records, while the <em>Schema Registry</em> must store all the versions of its records.</div></div>
