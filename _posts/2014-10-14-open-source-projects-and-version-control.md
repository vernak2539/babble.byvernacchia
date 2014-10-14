---
layout: post
title: "Open Source Projects and Version Control"
date: 2014-10-14 12:41:55-04:00
tags:
- version-control
- vcs
- oss
- open-source
- problems
summary: 'I’m often disappointed with things that happen in open source projects. Most of these things relate to version control, and I’ve seen them in projects I maintain, projects I contribute to, and various other projects. I figured this was as good of time as any for me to write about it'
heroImage: 'vcs_oss_hero.jpg'
twitterHeroImage: 'https://s3.amazonaws.com/babble.vernacchia/posts/twitterImg/vcs_oss_hero.jpg'
---

I’m often disappointed with things that happen in open source projects. Most of these things relate to version control, and I’ve seen them in projects I maintain, projects I contribute to, and various other projects. I figured this was as good of time as any for me to write about it.

## Main Repo vs. Fork

>Should contributors to your open source project use the main repo, or should they use a fork?

I believe all contributors should use a fork of the main repo. Obviously, if they don’t have write access to the main repo they need a fork. Even if you have write access, you should still use a fork. I have two reasons for this.

First, there is less chance of things getting f&%$ed up. There is always risk of overwriting code when pushing to a repo, and even more when pushing to the main repo. I’ve accidentally executed the code below while working on a project where “origin” was the main repo.

```bash
git push origin -f
```

Seems like a normal git command, right? Because I left out my branch name it didn’t do what I expected. It **force pushed** all my branches to that remote, no matter if I wanted to rewrite them or not. It even force pushed my master branch, which was not up to date. Whoops!

I was able to get my data back because Git is awesome, but what happens if you aren’t able to recover? You may have just lost a good amount of work. Why even take this risk?

Second, it keeps the main repo clean. Polluting the main repo with everyone’s branches makes it hard to see what’s going on. In most cases, I don’t care about other people’s branches until they submit a pull request. It shouldn’t take me more than a few minutes to find what I’m looking for. The more branches, the more time it takes.

## Are maintainers above the law?

Most open source projects have contribution guidelines, which contributors follow in hopes of getting their code in the project. Should the maintainers have to follow these rules? Even the version control rules?

**YES and YES.** Hopefully, the version control rules advocate the use of forks. Everyone makes mistakes, even maintainers (who have write access), and limiting work on the main repo reduces risk. Maintainers saying, “Using a fork is a lot of extra work. I’m a maintainer, I should be able to do what’s easiest for me” have it all wrong. There are 1–2 extra steps, which you only have to do once. Instead of pushing a branch to the main repo, you first click the “fork” button, update the remote’s url on your machine, push to your fork, and then submit your pull request. Further changes only require you to push to your fork and submit a pull request. How easy is that???

I’m not advocating never working on the master branch, just that there are certain times to do so. These would include releases and merges (done via command line).

## Version Control (VC) History and Merges

If you’re like me, you like your project’s VC history to be clear and concise. I like when it’s easy to find when and where changes occurred, whether they be features or bugs.

There are a lot of things that make this hard to do. For example, I **hate** when someone uses an outrageous number of commits per fix/feature and/or when commits have nondescript messages.

How is anyone supposed to know what changes were introduced when looking at a vague commit message? How is anyone supposed to find where a change occurred if there are 44 commits for a one line change?

To fix these problems I do two things. First, I will squash my pull requests after they’re reviewed and passed (don’t mess with public history). If I’m the one merging the changes I will merge them, then rebase them into one commit with a descriptive commit message. The author still get’s the credit for the code addition, so it’s no biggie in my mind.

Second, I try to be descriptive when creating my branches and when writing my commit messages. An example of a branch may be “feature-something-or-other” or “component-im-editing/what-im-updating.” With subsequent commit messages I will start them with, “component|feature/what I did.”

I’ve committed all the crimes I talked about above, but over time I realized things could be done better. Don’t be the person resisting change because the end result is harder for you.
