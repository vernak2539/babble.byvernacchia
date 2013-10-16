---
layout: post
title: Certificate Issues in Node
date: 2013-10-16 12:25:14
tags:
  - nodejs
  - javascript
  - certificate-issues
  - strider
  - github-enterprise
summary: I was recently doing some work integrating <a href="http://stridercd.com/" target="_blank">Strider</a> with a Github Enterprise Server (GHE). I thought it was going to be pretty easy, and boy was I wrong. I was greeted by this awesome error message UNABLE_TO_VERIFY_LEAF_SIGNATURE
---

_I searched high and low for a solution to this. Every post I found was so technical about it, so hopefully this makes it easier to understand._

I was recently doing some work integrating [Strider][1] with a Github Enterprise Server (GHE). I thought it was going to be pretty easy, and boy was I wrong. 

I started by modifying the node module that the Strider team created to integrate with Github.com. I thought, "These two are basically the same thing, should be easy to handle". After integrating the configuration options to specify a GHE server, I was ready to test.

I boot up Strider and there's the start page. I login; it works. Everything's going so well. I try to authenticate with our GHE server and see the oAuth page with everything Strider wants to access. Perfect. I click the authenticate button, and am redirect back to my app. Here's where things start to fall apart.

I'm greeted by this awesome error message `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, and I'm thinking to myself, "WTF!! This works with github.com and the GHE is a copy of that."

After a few hours of messing around, looking for others who've had this problem, and getting frustrated I asked one of my co-workers. Turns out he was doing something else and ran into this problem.

It turns out that our SSL Certificate Chain was not set up correctly. When node uses the https modules (`require('https')`) it automatically inspects the certificate chain. If there's a problem, it will throw this error. 

Our problem was that we have a root certificate, intermediary certificate, and then the wildcard certificate for our GHE. Turns out the wildcard certificate wasn't linked to the root. And there you have it.

**Here I talk about GHE integration and Strider, but not the outcome. I will have a post about that soon.**

Heres a full version of my lovely error message:

```
500 failed to obtain access token (Error: UNABLE_TO_VERIFY_LEAF_SIGNATURE)
at /project/node_modules/passport-github/node_modules/passport-oauth/lib/passport-oauth/strategies/oauth2.js:125:38
at /project/node_modules/passport-github/node_modules/passport-oauth/node_modules/oauth/lib/oauth2.js:160:18
at ClientRequest. (/project/node_modules/passport-github/node_modules/passport-oauth/node_modules/oauth/lib/oauth2.js:129:5)
at ClientRequest.EventEmitter.emit (events.js:95:17)
at CleartextStream.socketErrorListener (http.js:1548:9)
at CleartextStream.EventEmitter.emit (events.js:95:17)
at SecurePair. (tls.js:1375:19)
at SecurePair.EventEmitter.emit (events.js:92:17)
at SecurePair.maybeInitFinished (tls.js:968:10)
at CleartextStream.read [as _read] (tls.js:462:15)
```

   [1]: http://stridercd.com/