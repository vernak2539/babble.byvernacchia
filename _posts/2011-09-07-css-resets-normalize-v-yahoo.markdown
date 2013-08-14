---
layout: post
title: 'CSS Resets: Normalize vs. Yahoo'
date: 2011-09-07 10:44:23
tags:
  - cross-browser-issues
  - css
  - css-reset
  - normailze.css
  - user-interface
  - yahoo!
summary: As most designers know, or should know, there is a load of differences when it comes to designing/implementing a website for different browsers. One of the biggest issues being that Internet Explorer (IE) is
---
As most designers know, or should know, there is a load of differences when it comes to designing/implementing a website for different browsers. One of the biggest issues being that Internet Explorer (IE) is horrible/a nightmare no matter how you look at it. A couple years ago, after getting fed up with having a bunch of different browser specific stylesheets, I looked for an alternative to speed up the process or even get rid of this technique.

Now since IE will always be different no matter what you do, different stylesheets and conditional CSS (not conditional CSS3 which was just released) will still be needed to have a fully cross-browser friendly website (maybe even some JavaScript also). The thing I found to help out with this nightmare is called a CSS Reset. I found out about this during an interview, which I know not the greatest time to find out something new. After the interview, I went home and looked it up. To my surprise this was exactly what I was looking for.

Yahoo! has done a lot of work on User Interface and Design and their definition of a CSS Reset is “a file [that] removes and neutralizes the inconsistent default styling of HTML elements, creating a level playing field across [A-grade browsers][1] and providing a sound foundation upon which you can _explicitly declare your intentions._”

This is great. All browsers are basically the same now? All the default styles used by IE are gone? No longer will I have to use:

{% highlight css %}
* {
	margin:0;
	padding:0;
}
{% endhighlight %}


What a relief.

Above is a basic overview of CSS Resets, but know I am going to discuss the difference between two CSS Resets that I have previously used; [Normalize.css][2] and [Yahoo! Reset CSS][3].

### Yahoo! Reset CSS

This is my reset of choice. I have been using it on multiple projects to get the look and feel correct across different browsers. The thing I like most about this reset is the fact that it resets everything, and I do mean everything. You get to start from the beginning. After including this as your first stylesheet, you will no longer have weird margin or padding issues in IE. This stylesheet can also help with [CSS Specificity][4] (great article about it from Smashing Magazine), which is something every designer should know.

The only thing that I do not like about this reset is the fact that font styles are not left intact (italic , bold , etc.) and lists automatically have no bullets. The latter is not a huge concern, I have just been working on a lot of sites that require lists for my job and it is getting annoying to have to redeclare everything.

***Overall Rating:*** 9/10

### Normalize.css

I recently found this CSS Reset from a designer I follow on Twitter. After researching it more, I am starting to incorporate it on a couple sites I am creating for my job. I included this stylesheet in my document, and at first it seemed to function just the same as the Yahoo! reset. I then started doing more and more with it and found that it is a little different from Yahoo’s.

This reset seems to be optimized for HTML5, as it has all the new tags and then resets elements based on them. This was not ideal for my situation as my company has yet to start developing websites using HTML5, yet it will be good for the future as HTML5 is continually adopted. This stylesheet, as opposed to Yahoo’s, does not reset everything. It does the following (taken directly from their [website][2]):

  * **Preserves useful defaults**, unlike many CSS resets.
  * **Normalizes styles** for a wide range of elements.
  * **Corrects bugs** and common browser inconsistencies.
  * **Improves usability** with subtle improvements.
  * **Explains what code does** using detailed comments.

Using this reset was a little different, but over all I liked it. It is a little larger in size compared to the Yahoo Reset but that shouldn’t be a huge deal for most people. If it is I would recommend googling “CSS Compressor.” I cannot wait to go more in-depth with this reset as I feel it will be getting big soon.

***Overall Rating:*** 8.5/10

   [1]: http://developer.yahoo.com/yui/articles/gbs/gbs.html
   [2]: http://necolas.github.com/normalize.css/
   [3]: http://developer.yahoo.com/yui/reset/
   [4]: http://coding.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/
