---
layout: post
title:  "Unit, Grunt, and Require. Problems?"
date:   2013-06-05 11:23:09
tags:
- javascript
- gruntjs
- requirejs
- qunit
- programming
summary: I ran into a problem yesterday when I started writing tests for a <a href="https://github.com/vernak2539/js-com-app-calulator" target="_blank">personal project</a>. I completed writing my tests, and then ran them in the browser. YES, they worked!! Hell yeah, but.
---

I ran into a problem yesterday when I started writing tests for a [personal project](https://github.com/vernak2539/js-com-app-calulator). I completed writing my tests, and then ran them in the browser. YES, they worked!! Hell yeah.

So then I go and add the tests to my `Gruntfile.js` so I can run them before I build my project everytime. At this point I'm thinking to myself, "This is going to be easy. I got all the heavy lifting done".

I finish integrating it into my build process and run `grunt qunit`. It's doing something... It's doing something... then I get something like the following:

{% highlight bash %}
Running "qunit:all" (qunit) task
Testing test/index.htmlOK
Warning: 0/0 assertions ran (15ms) Use --force to continue.
{% endhighlight %}

I go through the normal troubleshooting process, but I cannot seem to figure it out. Everything loads correctly in the browser, so why isn't it loading in my build process!!

After a few hours of toiling, and staying up way past my bedtime, I finially thought that it could be something with RequireJS. Lo and behold, I found [this](https://github.com/gruntjs/grunt-contrib-qunit/issues/19). It **DOES NOT** work with the version of Require I was using.

Long story short, downgraded to Require v2.0.2 for my tests (can use up to v2.0.6 and it will still work), and now grunt, qunit, and require all play nice.

I swear I almost pulled out my hair on this one.
