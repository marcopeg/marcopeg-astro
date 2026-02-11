---
title: "WordPress on Thin Air"
description: "How to squeeze WordPress/MySql to the bare minimum memory consumption, and survive."
pubDate: "2017-03-29T22:00:00.000Z"
updatedDate: "2021-11-06T08:46:03.000Z"
heroImage: "https://images.unsplash.com/photo-1566207474742-de921626ad0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDN8fHdvcmRwcmVzc3xlbnwwfHx8fDE2MzU3ODExMDc&ixlib=rb-1.2.1&q=80&w=2000"
tags: ["Tips & Tricks", "Docker", "devops", "optimization", "wordpress", "Import 2022-12-03 12:45", "#Import 2025-02-27 15:31"]
---

This very website **WAS** hosted on a [512Mb Ram Digital Ocean droplet](https://m.do.co/c/0a72735ae62e) and is still able to serve a benchmark of **252 pages per second** with 50 concurrent requests being made.

![](/content/images/2021/11/image-22.png)

**How is this possible?**  
cache my friend, it’s all about cache.

In this article, I’m going to share with you my findings learning **how to run a WordPress website on very limited resources**…

> Wordpress on Thin Air :-)

## Of course is Docker!

The short answer is **“Wocker”**, which is my personal mix of WordPress and Docker. This setup enables me to run a highly performant website on a [5$/mo fully dedicated virtual server](https://m.do.co/c/0a72735ae62e).

I have the freedom of choosing every single detail of my setup, libraries and side technologies (as NodeJS). And I can host multiple projects on this machine (all Docker projects), reducing, even more, the monthly fee.

Even if I won’t cover the full Docker setup in this article, I would like to give you an idea of the `docker-compose.yml` as it was before introducing NGiNX:

```text
version: '2'
services:
  database:
    image: mysql|mariadb
    volumes:
      - ./db:/var/lib/mysql
  wordpress:
    image: wordpress:4.7
    volumes:
      - ./wp/wp-content:/var/www/html/wp-content
    ports:
      - 8080:80
```

**NOTE:** the code above is not complete. The scope of this article is to understand the problem and the solution. If you want all the juicy details [my blog’s codebase is open-source on GitHub](https://github.com/marcopeg/marcopeg.com).

## 1\. Memory Limit your WordPress

When it comes to creating a DAMP (Docker, Apache, MySql, PHP) installation you can cut a lot of corners by using the [WordPress official image](https://hub.docker.com/_/wordpress/). It works just fine.

Even so, you should really be aware that official images come with a **very generic configuration** for both Apache and MySQL, and are quite **eager in memory** consumption.

I have already written about this argument and you can find details [how to configure Wordpress on Docker in a low memory VPS here](/dockerized-mysql-crashes-lot/).

The final result is that we can **allocate just 200Mb for the entire project**:

```text
MEM_LIMIT_MYSQL=64m
MEM_LIMIT_APACHE=96m
MEM_LIMIT_NGINX=40m
```

Now, with such limitations we can’t really expect our system to perform well under pressure, can we? It actually performs very poorly and the blog crashes consistently whit a _low-to-ridiculous_ load.

Let just say that it works fine if you are the only guy working or consuming content for your blog. In my case, this is totally fine for the content authoring part but is not acceptable for the content consumption part.

## Let NGiNX serve your static assets

WordPress is a CMS system so it is obviously **responsible for crafting your pages** and organizing your media files. Are you sure it should be responsible for serving those files either?

My first step was to wrap my `wordpress` service behind a `proxy` (service) which implements NGiNX with a simple configuration that takes care of serving the static assets with the proper cache headers:

```text
# docker-compose.yml
services:
  proxy:
    image: nginx:1.11
    links:
      - wordpress:wordpress
    ports:
      - 80:80
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./server-configs-nginx:/etc/nginx/server-configs-nginx
      - ./wp/wp-content:/var/www/static/wp-content
```

Configuring NGiNX for this task doesn’t take many lines of code but sure as hell it took me a lot of googling to put it together, and I am not even 100% sure of everything I wrote in it.

(So please **fill the gaps by dropping a comment**, I will appreciate your contribution very much.)

```text
# nginx.conf
http {
    server {
        listen 80 default_server;

        root /var/www/static/;
        proxy_set_header Host $host:$server_port;

        charset utf-8;
        include ./server-configs-nginx/mime.types;

        # Static Files Cache Headers
        location /wp-content/ {
            expires 1M;
            access_log off;
            add_header Cache-Control "public";

            add_header X-NGiNX-Proxy true;
            try_files $uri $uri/ =404;
        }

        # Proxy to wordpress upstream:
        location / {
            proxy_set_header        Host $host;
            proxy_set_header        X-Real-IP $remote_addr;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header        X-Forwarded-Proto $scheme;

            proxy_pass http://wordpress:80;
        }
    }
}
```

With this layer Apache is offloaded from serving all the static assets and I did that because there is plenty of literature around the web **praising NGiNX for dealing with static assets very fast**.

**NOTE1:** the `server-configs-nginx/mime.types` file please refer to [h5bp/server-configs-nginx](https://github.com/h5bp/server-configs-nginx) repository. That dude knows his stuff.

**NOTE2:** I have experienced a bit of trouble trying to run the system on a custom port (es. `8080`) due to infinite redirects triggered by WordPress. The only workaround I found so far is to remove the `template_redirect` filter in your custom theme:

```text
# wp-contents/themes/custom-theme/functions.php
remove_filter('template_redirect','redirect_canonical');
```

But I am not ready to give up and will continue looking for better ways. If you know how to solve this please drop a comment!

## Let NGiNX cache your pages

The first move was good but it didn’t really solve my problem as PHP is still in charge to produce the HTML content of my pages.

Before undertaking this cache endeavor I tried different WordPress caching plugins. They work fine but:

1.  I really wanted to keep my plugins set up to the bare bone
2.  a plugin still relay on PHP which is an overhead when it comes to serving cache
3.  I have Docker, I can do what I want!

The next step is to extend my NGiNX configuration to implement a **fully static cache layer** that works outside my WordPress installation.

There are some obvious benefits:

1.  WordPress doesn’t know about it, no overhead
2.  NGiNX is capable of caching out of the box

And there are some questions:

1.  How do I invalidate the cache?
2.  How long do I keep cache?
3.  Can I enable/disable the cache layer from the admin panel?

I still don’t have all the answers as I’m still learning all this stuff but I really wanted to share this article with you because it made my website so much faster and I believe you will benefit too.

Here is my new `nginx.conf`:

```text
http {

    # Set storage for the static cache
    proxy_cache_path /tmp/nginx levels=1:2 keys_zone=cache:30m max_size=1G;
    proxy_cache_key "$scheme$request_method$host$request_uri";

    server {
        ...

        location / {
            
            # Implement the actual cache
            proxy_cache cache;
            proxy_cache_valid 1y;
            add_header X-Proxy-Cache $upstream_cache_status;
           
            proxy_pass http://wordpress:80;
        }
    }
}
```

## Useful Resources

*   [Caching static assets with NGiNX](https://serversforhackers.com/nginx-caching)
*   [Content caching with NGiNX](https://www.nginx.com/resources/admin-guide/content-caching/)

## Next Steps

*   I would like to invalidate the cache every time I change some content
*   I would like to enable/disable the cache layer at will, maybe with a custom `docker-compose` extension file