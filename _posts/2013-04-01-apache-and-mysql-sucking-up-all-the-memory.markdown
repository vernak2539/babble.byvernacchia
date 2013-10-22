---
layout: post
title: Apache and MySQL sucking up all the memory
date: 2013-04-01 13:24:10
tags:
  - web-development
  - apache
  - linux
  - mpm_worker
  - mysql
  - sysadmin
  - threading
  - wordpress
summary: Yesterday I was trying to do some work on the server I host my projects on. After it being super sluggish, to say the least, I started to investigate why
---

Yesterday I was trying to do some work on the server I host my projects on. After it being super sluggish, to say the least, I started to investigate why.

**NOTE:** I am not a SysAdmin and do not have a lot of details on the inner workings of everything in this post. These are just genearl things that worked for me and my set up. I use a Linux box, PHP, Apache, and MySQL in most of my set up. So I **insist** that you do your research before doing anything haphazardly.

### MySQL

The first thing I found was that mysql (mysqld) was taking up huge amounts of memory (RES). So I dived into this first. I started by googling what could be done, and found [an article][1] about tuning MySQL performance. I ran the perl file and found out that I had some issues.

  1. My tables weren’t optimized
  2. I didn’t have my max connections set
  3. My table cache was too high
  4. My ratio of query cache size to query cache limit was off

To remedy this I took a look at a post on stack overflow (which I can’t find again, damn), where the person had a configuration that was pretty close to mine. After making some changes to the mysql `my.cnf` file and optimizing my tables, I restarted MySQL and waited 24 hours.

WOW, what a change. I saw a significant drop in memory usage, but will continue to monitor it as it can be fine tuned even more. On to the next one.

### Apache

Apache seemed to be my next culprit. There were a lot of concurrent processes averaging around 50M each. Gigantic waste of memory, let me tell you. [After investigating my options][2], it looked like I was going to switch from the prefork configuration to the worker configuration. Something about threaded processes and everything.

But with this configuration, PHP is unable to do threading by default with apache, or something like that. After looking around I found [an article][3] that went through the process step by step to enable PHP use with mpm_worker. It was actually painless, and boy did this cut down on the memory apache was using. Like DAMN, that’s a huge improvement. I would recommend taking a look at doing that.

### WordPress

My blog is ran on WordPress 3, and that in itself is a huge memory waster (WordPress that is). After digging into some things that could increase WordPress’ performance I found that permalink structure can affect the loading of your blog.

The error lies in the `rewrite.php` file or so I’m told, but I changed my permalink structure to include the post id, which made my posts easier to retrieve by the WordPress engine. Boy do I hate wordpress, but I just don’t have time to switch over.

Right now I don’t cache anything in WordPress either, but I will be looking into that for sure.

### The End

So those were some of my problems. Remember, I just manage my own server and do not have a super in-depth knowledge of this performance stuff. I’m doing what works out for me. Research before you think of trying these things out.

   [1]: http://www.howtoforge.com/tuning-mysql-performance-with-mysqltuner
   [2]: http://serverfault.com/questions/383526/how-do-i-select-which-apache-mpm-to-use
   [3]: http://ubuntuforums.org/showthread.php?t=1038416
