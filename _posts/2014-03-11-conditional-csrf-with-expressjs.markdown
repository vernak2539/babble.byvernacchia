---
layout: post
title: "Conditional CSRF with ExpressJS"
date: 2014-03-11 16:31:27-05:00
tags:
- csrf
- cross-site-request-forgery
- express
- javascript
- nodejs
- paypal-lusca
- programming
- security
summary: Taking the time to make your node app secure? Using ExpressJS as your server? If you answered "yes" to both of these, then boy do I have some news for you. If you answered "no" to the first question, there's something wrong
heroImage: 'csrf_hero.jpg'
twitterHeroImage: 'https://s3.amazonaws.com/babble.vernacchia/posts/twitterImg/csrf_hero.jpg'
---

Taking the time to make your node app secure? Using [Express][1] as your server? If you answered "yes" to both of these, then boy do I have some news for you. If you answered "no" to the first question, there's something wrong.

One of the many things that can make your app more secure is using Cross-Site Request Forgery (CSRF) tokens. You can read more about CSRF on [Wikipedia][2].

We decided to use [Lusca][4], by PayPal, even though [Connect][3], which Express is built on top of, already has CSRF support. Lusca was an obvious choice because it's easier to use and has a lot more features.

If you've never heard of Lusca, I suggest checking it out. It's what PayPal uses in their [KrakenJS][5] suite, but it's also available as a standalone module. I just noticed they added two more security features, which I cannot wait to checkout. Thank you PayPal!

##You Said Conditional?

Yes, but why would we ever need to conditionally use the CSRF middleware? The problem isn't evident until you start using 3rd party authorization (SSO and whatnot). These services usually use a callback URL to POST/give you tokens you'll need to access their API. Will this POST data have the proper CSRF token associated with your user's session? No. So your app will block it. Thus, the need for the conditional middleware.

It's super simple, so let's get to it.

###The Server

First, we'll set up a very generic server. The conditional part will come later.

{% gist 9475654/server.js %}

###The Client Code

Next, let's set up a HTML page that mimics what will be rendered by your node app, giving us access to the CSRF token.

{% gist 9475654/index.html %}

###The Conditional Part

Now that we have our server set up and access to the CSRF token only GET requests will complete successfully without the token. This is the expected behavior.

What about those 3rd party authorization flows I mentioned? Let's account for those.

Below is a slimmed down version of the server file. Let's assume the callback URL from the 3rd party service is `/server-callback`.

{% gist 9475654/conditional-server.js %}

Let's take a look at what has changed.

**Line 20**<br />
We create a function with the same boilerplate as Express middleware.

**Line 21**<br />
Every time a route is called we check to see if the route in question should have CSRF security applied to it.

If the route doesn't need the token we call `next()`, bypassing the CSRF. We continue as usual if a token is required.

*Note:* I like to use objects to check for existence instead of arrays. Better O(n).

**Line 27**<br />
This is where we actually tell Express to use the middleware we just created.

##Are we done yet?

Yes. All that's needed now is to make sure the CSRF token is on all requests that manipulate data. If you're using Backbone (or jQuery), here's a cool little snippet that is very helpful.

{% gist 8337545/backbone-csrf.js %}


[1]: http://expressjs.com/
[2]: http://en.wikipedia.org/wiki/Cross-site_request_forgery
[3]: http://www.senchalabs.org/connect
[4]: https://github.com/paypal/lusca
[5]: http://krakenjs.com/
