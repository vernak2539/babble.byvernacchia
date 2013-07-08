---
layout: post
title:  "Rebooting with Nginx and PHP5-FPM?"
date:   2013-05-23 23:11:09
tags:
- nginx
- php
- php-fpm
- reboot
summary: I recently switched from Apache to <a href="http://nginx.org/" target="_blank">Nginx</a> for all my hosting needs, and I could not be happier. Nginx is so much better. A little more work setting it up, but totally worth it. I digress.
---

I recently switched from Apache to [Nginx][1] for all my hosting needs, and I could not be happier. Nginx is so much better. A little more work setting it up, but totally worth it. I digress.

Today my hosting provider has some issues, so I had to reboot my server. I thought everything was good after it had finished, but I was wrong.

At first I thought Nginx didn't start itself up again, but that couldn't be true. I was getting "502 Bad Gateway" errors, so Nginx had to be running. The next culprit, PHP5-FPM.

I am using sockets to connect PHP with Nginx, because IP's aren't worth it since I'm not referencing PHP from other stacks. Easier this way.

I checked to see if PHP5-FPM is running and it turns out it's not. DAMN, there's the problem. After a little digging, I find this in my error log:

{% highlight bash %}
unable to bind listening socket for address '/var/run/php5-fpm/my.name.socket': No 
such file or directory
{% endhighlight %}
    
I looked and looked for a solution for a couple hours, and let me tell you, I got super frustrated. I finally realized on the reboot of my server, the directory where I was storing the sockets got deleted. I thought I had created it before and it would just stay there, but I guess the `/var/run` directory gets cleared on reboot.

I ran the following:

{% highlight bash %}
mkdir -p /var/run/php5-fpm/
{% endhighlight %}
    
and BOOM, restarted PHP5-FPM and it did it successfully. 

## How to make sure it doesn't happen again
To make sure this doesn't happen the next time you reboot your server, I would checkout [this comment][2].

All you have to do is edit the `/etc/init.d/php5-fpm` file, and add the stuff below.

{% highlight bash %}
// add at top by all your other variables
SOCKETDIR = /var/run/php5-fpm

// then inside do_start()
// replace users as you see fit
[ -d $SOCKETDIR ] || install -m 755 -o www-data -g root -d $SOCKETDIR
{% endhighlight %}


And there you have it. Hopefully I can save you a good amount of frustration!


[1]: http://nginx.org/
[2]: http://www.rackspace.com/knowledge_center/comment/198125#comment-198125
