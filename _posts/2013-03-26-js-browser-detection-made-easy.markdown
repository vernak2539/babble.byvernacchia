---
layout: post
title: JS Browser Detection Made Easy
date: 2013-03-26 19:53:10
tags:
  - javascript
  - web-development
  - bestiejs
  - browser-detection
summary: I recently had to implement browser detection into one of the web apps I work on at my real job, you know the one that I get paid to do. For those of you who’ve done this before, you know how big of a hassle it is
---

I recently had to implement browser detection into one of the web apps I work on at my real job, you know the one that I get paid to do. For those of you who’ve done this before, you know how big of a hassle it is (even worse when you have to support IE7 or lower).

There are two general ways to do this, server-side or client-side. In general, since people can spoof user-agent strings, it really doesn’t matter where you put the detection (could be some specific use cases where one applies). In the end, people are going to see what they want to see when it comes to this stuff.

I choose to do it client-side and was all ready to make my own “function” to do this, but then I stumbled over [platform.js][1]. It’s a lightweight (11KB minified, and ~5KB gzipped) JS library solely dedicated to browser detection, and let me tell you, it is really good at it. It can be used almost everywhere, I suggest checking out their [github README][2] for more info.

Platform.js is made by the people who make [lodash][3], the [underscore.js][4] replacement (kinda, sort of). Needless to say, they know what they’re doing.

It’s super simple to use, automatically detects your browser, and can be used to parse user-agent strings. Just take a look:

{% highlight javascript %}
platform.parse(); /* or */ platform;
// you'll an object with some of the following
{
	description: "Firefox 19.0 on Mac OS X 10.8"
	, layout: "Gecko"
	, name: "Firefox"
	, os: {
		family: "Mac OS X"
		, version: "10.8"
	}
	, ua: "Mozilla/5.0 (Macintosh;...o/20100101 Firefox/19.0"
	// etc...
}
{% endhighlight %}

**Or you can parse user-agent strings:**

{% highlight javascript %}
	var browser = platform.parse('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.60 Safari/537.17');
	browser.name // "Chrome"
	browser.version // "24.0.1312.60"
	// etc...
{% endhighlight %}

### What about IE Compatibility Mode?

It just so happens that I had to do this too. There are [ways to do this without a JS library][5], but using platform.js made my life a little easier.

Getting the necessary info for this is as easy as using `platform.description` or `platform.toString()`. You’ll get something like this for the description:

{% highlight javascript %}
// little different from what they say
// on https://github.com/bestiejs/platform.js
// IE 10.0 32-bit (IE 5 mode) on Windows 8 64-bit
// IE 10.0 32-bit (IE 8 mode) on Windows 8 64-bit
// IE 10.0 32-bit (IE 8 mode) on Windows 8 64-bit
// IE 10.0 32-bit (IE 7 mode) on Windows 8 64-bit
// IE 9.0 (IE 7 mode) on Windows Server 2008 / Vista
// IE 9.0 (IE 8 mode) on Windows Server 2008 / Vista
// IE 9.0 (IE 5 mode) on Windows Server 2008 / Vista
// etc...
{% endhighlight %}

It’s as simple as searching the string with a regex. Mine looks something like this:

{% highlight javascript %}
// Only testing for IE 7 compatibility mode
platform.description.search(/\(IE\s7\smode\)/);

// test for compatibility mode in general
// I'm not a regex guru, so let me know if something is better
platform.description.search(/\(IE\s(0{0,2}[1-9]|0?[1-9][0-9]|[1-9][0-9][0-9])\smode\)/);

// Big picture may look something like this
// or insert your own search regex
if( platform.description.search(/\(IE\s7\smode\)/) >= 0 ) {
	// we're in compatibility mode for IE 7
} else {
	// we're not in compatibility mode for IE 7
}
{% endhighlight %}

So it’s pretty much as simple as that. Well not too simple, but overall this saved me a bunch of time.

As always, let me know what I can do to improve my writing and/or explanation of topics. I tried to keep it concise with ~550 characters.

   [1]: https://github.com/bestiejs/platform.js (platform.js)
   [2]: https://github.com/bestiejs/platform.js#installation-and-usage
   [3]: https://github.com/bestiejs/lodash (lodash)
   [4]: https://github.com/documentcloud/underscore (Underscore.js)
   [5]: http://bit.ly/XCSt6O
