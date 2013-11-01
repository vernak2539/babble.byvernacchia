---
layout: post
title: Babble by Vernacchia Jekyll Theme
date: 2013-10-31 20:27:32
tags:
  - jekyll
  - jekyll-theme
  - twitter-bootstrap
summary: 
---

I just finished enough on this Jekyll blog to finally write a post on how to use it. It's been a long time coming, but it's time.

###If You're Using Github Pages
If you're using Github Pages to publish with this "theme" you **WILL NOT** be able to use any custom plugins. Checkout the two links below, which outline what you can do to combat this problem.

+ http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html
+ http://davidensinger.com/2013/04/deploying-jekyll-to-github-pages/

###Features and How to Use Them

####Pagination

This will automatically paginate based on value set in _config.yml

{% raw %}
<pre>
paginate: 5
</pre>
{% endraw %}

####Tags

Tags will be created for you automatically if you put them in your post front-matter.


{% raw %}
<pre>
---
layout: post
title: Babble by Vernacchia Jekyll Theme
date: 2013-10-31 20:27:32
tags:
  - jekyll
  - jekyll-theme
  - twitter-bootstrap
summary: Summare for this post
---
</pre>
{% endraw %}


####Gists

To create a Github Gist use the sytax below.

{% raw %}
<pre>
// single page gists
{% gist identifier %}

// multi-page gists
{% gist identifier/filename %}

// example
{% gist 82c02b8fed1877368d7a %}
{% gist 82c02b8fed1877368d7a/intelligent-dropdown.js %}
</pre>
{% endraw %}

####Youtube Videos

{% raw %}
<pre>

// no auto width (will default to 100%)
{% youtube identifier %}

// no width or height specified. Defaults to 560(w) x 420(h)
{% youtube identifier %}

// specific width (870) and height (500)
{% youtube identifier 870 500 %}

// examples
{% youtube 9kf51FpBuXQ 870 653 %}
{% youtube 9kf51FpBuXQ %}

</pre>
{% endraw %}

####Image Resizing and Optimization

Using this Liquid tag will resize your images. I've modified the original script to add classes that automatically center the image if it's not as big as the containing element.

I also modified it to add a height and width attribute to the image tag that is generated. All images generated are fully responsive.

The following needs to be added to your _config.yml.

{% raw %}
<pre>
image:
  source: uploads
  output: generated
  presets:
    centered:
      attr:
</pre>
{% endraw %}

And to use in your posts, add something like below.

{% raw %}
<pre>
// basic
{% image [preset or WxH] path/to/img.jpg [attr="value"] %}

// this theme uses this syntax most of the time
{% image 870xAUTO /2013/04/medium-fp.jpg %}
</pre>
{% endraw %}

####jsFiddle

This Liquid tag will embed a jsFiddle into your post. Stolen from [Octopress][2].

{% raw %}
<pre>
// basic. will include all tabs
{% jsfiddle fiddle_id %}

// basic. specific tabs included
{% jsfiddle fiddle_id [tabs] %}

// example
{% jsfiddle ccWP7 %}

// css tab excluded
{% jsfiddle ccWP7 js,html,result %}
</pre>
{% endraw %}

####Search

A JSON file is generated after the whole site is indexed by the Lunr Search plugin. The search page is located [here][1] if you want to see my implementation.


[1]: https://github.com/vernak2539/babble.byvernacchia/blob/master/search/index.html
[2]: https://github.com/imathis/octopress/blob/master/plugins/jsfiddle.rb










