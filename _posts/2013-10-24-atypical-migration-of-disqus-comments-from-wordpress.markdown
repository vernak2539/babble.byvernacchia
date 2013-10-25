---
layout: post
title: Atypical Migration of Disqus Comments from Wordpress
date: 2013-10-24 20:09:36
tags:
  - wordpress
  - disqus
  - comment-migration
summary: I have been working hard on my Jekyll blog (this thingy) and finally got to a point where I wanted to migrate my Disqus comments from my old WordPress blog to this one
---


I have been working hard on my Jekyll blog (this thingy) and finally got to a point where I wanted to migrate my Disqus comments from my old WordPress blog to this one.

I started by trying to use Disqus' URL Mapper migration tool, but it turned out that you couldn’t migrate comments between sites with different short codes. I guess I set up my stuff wrong, or not the way Disqus suggests. Oh well.

So here's what I did to transfer my comments. It's pretty simple. **Note:** your comments need to be in your WordPress database for this to work.

1. Reset the Disqus plug-in in WordPress
2. Login to the Disqus plug-in again
    * This time, use the site with the short code where you want the comments to be transferred.
3. Go to the settings page of the Disqus plug-in
4. Click "Export Comments". It should be near the bottom

Once you do all this, you should see the plugin doing its job. Don't reload the page!! 

After that finishes, you should change your site back to how it was. Repeat steps 1 & 2, but this time choose the site with the original short code (the one you changed it from originally).

It takes Disqus about 24 hours to actually process the comments and add them to your site, so don't worry if they're not there right after you complete this migration.

Good Luck!