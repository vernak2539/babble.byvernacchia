---
layout: post
title: Atypical Migration of Disqus Comments from Wordpress
date: 2013-10-24 20:09:36
tags:
  - wordpress
  - disqus
  - comment-migration
summary: I have been working hard on my Jekyll blog (this thingy) and finally got to a point where I wanted to migrate my Disqus comments from my old WordPress blog to this one. I started by trying to use Disqus' URL Mapper migration tool, but it turned out that you couldn’t migrate comments between sites with different short codes. I guess I set up my stuff wrong, or not the way Disqus suggests. Oh well
thumbnail: 'disqus_thumb.jpg'
twiitterThumbnail: 'http://babble.byvernacchia.com/img/posts/thumbnails/disqus_thumb.jpg'
---
I have been working hard on my Jekyll blog (this thingy) and finally got to a point where I wanted to migrate my Disqus comments from my old WordPress blog to this one.

I started by trying to use Disqus' URL Mapper migration tool, but it turned out that you couldn’t migrate comments between sites with different short codes. I guess I set up my stuff wrong, or not the way Disqus suggests. Oh well.

So here's what I did, and it was a time consuming task.

1. Exported my whole WordPress site
    * Navigate to WP Dashboard > Tools > Export
    * Choose the whole site option
2. Replace all instances of your old blog URL with your new one (if they're the same skip this step)
3. Replace all URLs of your old posts to the URLs of your new posts
    * Ex) **/2198/2013/04/my-first-post-on-medium-why-go-to-college** => **/2013/04/11/my-first-post-on-medium-why-go-to-college.html**
    * This is by far the most time consuming part
4. Upload the new XML file to the [Disqus Import Tool][1]

After you do this, you should see the comments on your Disqus dashboard. Be sure to check the URLs to make sure they match the correct post they should be attached to.

To test this, I created a testing site on Disqus and imported the comments there to make sure everything was correct before actually importing them to my actual blog.


[1]: http://avbabble.disqus.com/admin/discussions/import/platform/wordpress/