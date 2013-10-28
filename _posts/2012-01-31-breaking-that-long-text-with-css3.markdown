---
layout: post
title: Breaking That Long Text with CSS3
date: 2012-01-31 12:14:09
tags:
  - css
  - web-development
  - overflow
  - word-wrap
summary: Have you ever run into the problem where you have a long chuck of text that overflows outside the element your rendering it in? It usually occurs when a link is super long and the container is too small for it to fit into. Luckily, I finally found a CSS3 property that can fix this mess
---

Have you ever run into the problem where you have a long chuck of text that overflows outside the element your rendering it in? It usually occurs when a link is super long and the container is too small for it to fit into. Luckily, I finally found a CSS3 property that can fix this mess. It’s called **_word-wrap_** and is part of the [Text module of the CSS3 Specs][1].

### Possible Values

  1. **normal**: content will exceed boundaries of specified rendering box
  2. **break-word**: content will wrap to the next line when needed, and a word-break will also occur if needed.

All you have to do is added it to a selector and your set to go. I put a simple example below if you need to take a look.

### A Simple Example

**The Fiddle**

{% jsfiddle rj2Zx css,html,result %}

**CSS**

{% highlight css %}
.wrap {
	word-wrap: break-word;
}
{% endhighlight %}


**HTML**

{% highlight html %}
<p>
	This is a long block of text with no word wrap applied to it.
	<a href="#">http://www.alexvernacchia.com/long-text_that-will_hopefully_wrap</a>
</p>
 
<p class="wrap">
	This is a long block of text with no word wrap applied to it.
	<a href="#">http://www.alexvernacchia.com/long-text_that-will_hopefully_wrap</a>
</p>
{% endhighlight %}

### Browser Support

  * IE 5.5
  * Firefox 3.5
  * Opera
  * Safari
  * Chrome

So there you have it, pretty simple huh?

   [1]: http://www.w3.org/TR/2012/WD-css3-text-20120119/
   [2]: http://jsfiddle.net/vernak2539/rj2Zx/
