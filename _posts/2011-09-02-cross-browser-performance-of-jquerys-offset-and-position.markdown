---
layout: post
title: Cross-browser performance of jQuery's .offset() and .position()
date: 2011-09-02 15:50:33
tags:
  - cross-browser-issues
  - jquery
  - offset
  - position
  - programming
summary: For work I recently had to convert a PSD to XHTML/CSS. The only problem with the design, that I could come to find, was how it called for a content area to meet up with another section, the footer, no matter what the height of the content area. So basically, the bottom of the content area always needs
---
### The Problem

For work I recently had to convert a PSD to XHTML/CSS. The only problem with the design, that I could come to find, was how it called for a content area to meet up with another section, the footer, no matter what the height of the content area. So basically, the bottom of the content area always needs to meet up with the top of the footer. If there was enough text it would work, but if there wasn’t it would fall short. Just for reference the footer is pushed to the bottom of the page already (it will always be at the bottom of the page no matter the amount of text). I put a picture below to help illustrate the problem.

{% image centered /2011/09/offset.jpg %}

### What Method to Use?

After looking around for a CSS solution, which I couldn’t find and haven’t found for the 4 years I’ve been doing this, I turned to jQuery. I first tried using **_[.position()][2]_**. This function does the following, “Gets the current coordinates of the first element in the set of matched elements, relative to the offset parent.” I didn’t actually read what it did at first and wasted time using this.

Then I turned to _**[.offset()][3]**_, which does the following, “Gets the current coordinates of the first element in the set of matched elements, relative to the document.”

The main difference between this method and _.position_ is this element retrieves the position of the element relative to the whole document, not just the offset from the element it’s nested in (parent). This caused a bunch of trouble and finally I found _.offset()_.

### Finding the Height

Now that I figured out what to use, I used jQuery to find the top of the element that needs to be the certain height, mentioned above, and where it should end. Then with simple subtraction I was able to set a certain height.

### Cross Browser Issues

After figuring this out, I thought I was done. Then, to my surprise, after testing it in all browsers it didn’t work in Google Chrome, but it seemed to work in every other browser. After doing some research I found that Chrome gets the position of elements at a different time then other browsers.

Chrome waits for the whole page to load, more specifically images, then grabs the position. Other browsers only need the DOM to load before it grabs the position of an element. So there is an easy work around. After detecting for Chrome, which you can google pretty easily, you can do the following (UPDATED):

{% highlight javascript %}
$(window).load(function() {
	var middle_top = parseInt($("#middle").offset().top);
	var footer_top = parseInt($("#footer").offset().top);
	$('#middle').height(footer_top - middle_top);
});
{% endhighlight %}

This is different from the usual:

{% highlight javascript %}
$(document).ready(function() {
	var middle_top = parseInt($("#middle").offset().top);
	var footer_top = parseInt($("#footer").offset().top);
	$('#middle').height(footer_top - middle_top);
});
{% endhighlight %}

which most people are used to, but due to the way the browsers work, this is what has to be done.

This will get you the top of the element after everything has loaded. You may notice it actually change the height when the page is loaded, but it’s instantaeous, so I don’t count it as that big of a deal.

Hopefully this helps someone out, as it took me a good amount of time to figure out what was going on. If anyone has any **CSS** solutions to this problem let me know and I will need to look into that.

   [1]: /uploads/2011/09/offset.jpg (jQuery Offset Position)
   [2]: http://api.jquery.com/position/
   [3]: http://api.jquery.com/offset/
