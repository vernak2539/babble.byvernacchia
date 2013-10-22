---
layout: post
title: Using CSS Clearfix
date: 2011-11-18 12:14:09
tags:
  - css
  - clearfix
  - float-problem
summary: When you float elements within a container box, the floating elements won’t force the container’s height to adjust to the floated element’s height. This will cause text after the container box appear directly underneath the smaller of the two floated elements
---

### The Problem

When you float elements within a container box, the floating elements won’t force the container’s height to adjust to the floated element’s height. This will cause text after the container box appear directly underneath the smaller of the two floated elements.

{% image 870xAUTO /2011/11/css-clearfix.jpg %}

### An Example

So you have the following structure, or something along these lines. For purposes of this example, lets say there is more text in the left div, so it’s height is bigger than the right div. If you are having trouble visualizing this structure take a look at the image above.

**CSS**

{% highlight css %}
#container {
	width:100%;
	height:auto;
}
#left {
	width:50%;
	height:auto;
	float:left
}
#right {
	width:50%;
	height:auto;
	float:left;
}
{% endhighlight %}

**HTML**

{% highlight css %}
<div id="container">
	<div id="left">/* content would go here */</div>
	<div id="right">/* content would go here */</div>
</div>

<div>Extra text you want below the container</div>;
{% endhighlight %}

As is, you have “Extra text…” right below the right div (most likely next to the left div), but you really want it after the container. Now, how do we fix that?

### The Fix (CSS Clearfix)

There are two ways to do this, using _clear:both_ and _CSS Clearfix_

**Using _clear:both;_**

This method works well, but involves you adding extra, unneeded tags to your markup. To use this method, something like

needs to be placed after the right div, from the example above. **Note: **The element the style is attached to cannot be a .

A company I interviewed with for an internship actually asked why I used this method. At the time, I didn’t know about CSS clearfix, and I was using a bunch of extra tags that were unnecessary. Unfortunately the company decided not to have an internship program. Darn!

**Using _CSS Clearfix_**

Using CSS Clearfix to solve this problem is pretty easy. The following styles need to be included in your stylesheet before we can begin.

{% highlight css %}
.clearfix:after {
	content: ".";
	display: block;
	clear: both;
	visibility: hidden;
	line-height: 0;
	height: 0;
}

.clearfix {
	display: inline-block;
}

html[xmlns] .clearfix {
	display: block;
}

* html .clearfix {
	height: 1%;
}
{% endhighlight %}

Once this has been included in your stylesheet, the only thing left to do is give the container the clearfix class we just created, which looks like this:

{% highlight css %}
<div id="container" class="clearfix">...</div>
{% endhighlight %}

This will solve the problem without having any extra tags in it. Pretty cool huh?

### Quirks

I have only encountered one quirk using this method over the 2 years I have been using it. Sometimes when the container needs to be centered (margin:0 auto;), display:inline-block; needs to be removed, or else it won’t be centered.

That’s a basic introduction to CSS clearfix, hopefully it’s as useful to you as it has been to me.