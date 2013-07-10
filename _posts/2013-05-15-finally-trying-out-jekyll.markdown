---
layout: post
title:  "I'm Finally Trying Out Jekyll!"
date:   2013-05-15 17:14:09
tags:
- jekyll
- nginx
summary: I'm finally trying out Jekyll. It's super easy to install, I guess you can check it out for yourself.
---

I'm finally trying out Jekyll. It's super easy to install, I guess you can check it out for yourself.

I just finally got tired of Wordpress. My old blog will still be up, but will receive no more updates. Might make some more WP themes, but probably not soon.

**Some of the things I'm looking forward to:**

1. Having a static site that doesn't rely on a DB
2. Being able to write and publish content quickly
3. Learning a new engine and how to modify it (styles, code, etc)
4. Learning better `.markdown`
    * Will be switching to [Ghost][1] when it is released (my first kickstarter donation)
    * Will be trying to write plugins for Ghost as well, so this helps

**Some of the things I won't miss:**

1. Modifying Apache because it was taking up too much memory
    * changed to a different worker module
    * changed how PHP interacted with Apache (introduced threading) 
2. Having to constantly tweak MySQL so I don't run into memory issues
    * There has been more than a few times that I used a good amount of swap because of this
3. Setting up a different server (Nginx)
    * SOOOOO glad I did. So much faster than Apache, but a little different when it comes to rewrites (apache mod_rewrites)
    * Also had to set up PHP-FPM, which was also a better solution. My server and PHP are now decoupled

The **only** thing I liked about Wordpress was the fact that I had to learn new technologies in order to get it working better.

Here are a few of the hings I learned in my time with WP:

1. LAMP (Linux, Apache, MySQL, PHP)
2. LEMP (Linux, Nginx, MySQL, PHP)
3. PHP-FPM (pooling services and whatnaught)
4. How to configure Apache workers to use threading and update PHP to use FastCGI accordingly
5. How Wordpress is poorly written. Used to be a blogging tool, but now it's much more, which I hate
    * Why would you write hooks? I mean if your transitioning to a different use case, you should just rewrite it so it's done the right way and functions better. 
    * I won't even go into anything else
6. How to make Wordpress themes that have a high degree of functionality
7. How to use AWS (Cloudfront and S3) to host my images so I don't have more strain on my server
8. How to tune worker/server/service performance

[1]: http://tryghost.org/

