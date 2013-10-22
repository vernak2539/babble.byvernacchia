---
layout: post
title: A New Design?
date: 2012-10-31 17:34:29
tags:
  - web-development
  - design
  - responsive-design
  - twitter-bootstrap
  - wordpress
summary: Over the past couple months I have been working on finishing a new release of my blog’s design. I started doing the normal way I would. Design in browser, including anything I needed in the footer, and then putting it on top of WordPress
---

Over the past couple months I have been working on finishing a new release of my blog’s design.

I started doing the normal way I would. Design in browser, including anything I needed in the footer, and then putting it on top of WordPress without using any of its built-in features. But then I figured it would be a good learning experience to make a WordPress Theme. I have not put this on their site, and will not until it’s completely done (soft launch today).

### What does this theme use?

  * WordPress (obviously)
  * Twitter Bootstrap v 2.1.1
    * Responsive Grid
    * CSS
    * JS
  * jQuery v1.8.2 (needed for Twitter Bootstrap)

### What features does this theme have?

  * Customizable Main Navigation Menu
    * Navigation that is fixed to top when scrolling and underneath logo when not scrolling
  * Widgetized Sidebar
  * All JS loaded using WordPress (not just placed in footer)

I pretty much tried to put in everything that I would use/want in my blog.

To make this blog work I use the following WordPress Plugins:

  * Disqus Comment System
  * Currently Reading
  * Lightbox Plus

### Still To Do

Since this is just a release to get it out there with most of the things working, there are obviously items I still need to address, and will over the next couple of months.

  1. Update mobile theme to not use fixed navigation
    * It’s a little sluggish when scrolling
  2. Update single.php template to include links to previous and next posts
  3. Add a page.php template (I don’t have any as of now, so that’s why it’s not there)
  4. Add a comment.php template (Again, I use Disqus so it’s not in there)
  5. Create plugin to embed [Twitter Cards][1] info into each post.
    * This is a big one for me. First the theme, then the plugin to accompany it
  6. Add a little more oohh and ahhh to the site

So that’s pretty much it. If you want access to the code I put it on [Github][2]. Feel free to check it out and give me any suggestions for improvements!

   [1]: https://dev.twitter.com/docs/cards
   [2]: https://github.com/vernak2539/ByVernacchia-Blog-Theme
