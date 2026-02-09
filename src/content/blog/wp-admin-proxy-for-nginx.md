---
title: "WP Admin proxy for NGINX"
description: "How to proxy wp-admin in a headless WordPress setup."
pubDate: "2017-08-18T22:00:00.000Z"
updatedDate: "2021-11-01T15:54:40.000Z"
heroImage: "/content/images/2021/11/nginx.png"
---

At my company we are experimenting quite a lot with **headless WordPress websites**.

> In short we use WordPress as content editor tool but then we set the theme to output _JSON_ and we build a _PWA_ (Progressive Web Application) as frontend.

Out stack is composed as follow:

*   Wordpress for backend
*   ExpressJS / ReactJS for the PWA
*   NGiNX as frontend facing application
*   Docker to harness them together

Here is a short snippet out of our _NGiNX_ configuration that serves as reverse proxy so we can let our customers access the WP admin page as they are used to do in the ancient times of simple Wordpress sites. I wouldn’t say it’s a difficult piece of config but it took some time for me to google it out of the web.

```text
location ~ /wp-(admin|login|content|includes) {
  proxy_set_header        Host $host;
  proxy_set_header        X-Real-IP $remote_addr;
  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header        X-Forwarded-Proto $scheme;
  proxy_pass http://wordpress;
}
```

Do you work with Headless Wordpress as well? What do you think?