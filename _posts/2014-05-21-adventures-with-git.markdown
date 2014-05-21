---
layout: post
title: "Adventures with Git"
date: 2014-05-21 12:30:27-04:00
tags:
- git
- version-control
- programming
summary: One of the most important things I use at work is Git. It just so happens to be the best version control system out there. Alright maybe I'm a little biased, but it's much better than others. Time to explore what I found after diving deeper into Git
heroImage: 'git_hero.jpg'
twitterHeroImage: 'https://s3.amazonaws.com/babble.vernacchia/posts/twitterImg/git_hero.jpg'
---

One of the most important things I use at work is [Git][1]; A Version Control System (VCS). It just so happens to be the best version control system out there. Alright maybe I'm a little biased, but it's much better than others.

I was first introduced to Git at my current job; Or any VCS for that matter. I was appalled that we had not learned about it in college. It's such a powerful and useful tool. Nonetheless, not only did I have to learn how to javascript better, I also had to learn this new thing called Git.

It took a while to get comfortable using Git. After a while I grew to love it, but I knew my knowledge was limited. So, I figured it was time to start learning about what makes Git work. I chose *[Version Control with Git][2]*, and it didn't disappoint.

This book did a great job at explaining the underlying structure of Git. Holy Hell, [Linus][4] was a boss. Fun fact: Linus named [Git after himself][3].

I'm not going to go into the weeds of Git (you should read about it yourself), but I wanted to share some useful things I picked up from reading this book. It has already made my life easier.

##Tips, Tricks, and Wow

###Basics

1. **Blobs** are the content
1. **Trees** store relationships between blobs
1. **Commits** point to a tree and other commits
1. **HEAD** is the most recent commit on branch (tip of branch)
    * [Detached HEAD][5]
1. **ref (reference)** is a SHA1 hash that refers directly to object in object store
    * local branches, remote tracking branches, and tags are all refs
1. **Git is NOT based on chronological/date-based order**
    * Git is based on a [DAG][8]
    * [Explanation of Git DAG][9] for computer people
1. `git pull` is just `git fetch` and a merge
1. Rebasing should probably be done over a merge if the code has not been pushed to the remote. Vice Versa
    * It depends on your situation though. Atlassian's blog has [an article][10] about what they do.
    * Be careful rebasing if you have merges, they could get lost/messed up (use `--preserve-merges`)


###git rm

`git rm` is cool. Instead of deleting a file and doing a `git add`, `git rm` will do that for you.

```bash
# removes file from index and working directory
git rm myFile

# removes file from index
git rm --cached myFile
```

###git diff

[Summary of ranges][7] (`git log` and `git diff`)

```bash
# difference between working directory and index
git diff

# difference between index and HEAD
git diff --cached

# difference between working directory and HEAD
git diff HEAD

# difference between start and end
git diff start end
git diff start..end

# difference between master and dev since dev was branched from master
git diff master...dev

# searches for a diff that contains a "test"
git diff -S"test"

# also can search using git log
git log -Stest
```

###git reset

1. --hard will reset HEAD, index, and working directory
2. --mixed (default) will reset HEAD and index
3. --soft will reset HEAD

```bash
# restores working directory and index prior to git merge
git reset --hard HEAD

# discards merge after commit
git reset --hard ORIG_HEAD

# reset HEAD, index, and working directory to one commit previous
git reset --hard HEAD^1
```

###git checkout

```bash
# return to original conflict state before trying to resolve again
git checkout -m

# retrieves file after git rm is executed
git checkout HEAD -- myFile

# create branch, switch to it, and track origin/master
git checkout -b new_branch origin/master
```

###git bisect

This command will help you find the point where a bad change was introduced. All you need to do is provide a "good" commit and a "bad" commit.

Git will then go halfway between those points and checkout code. Now it's up to you to determine if that checkout is good or bad. Once you've decided and told Git, the process will be repeated until you find the commit that introduced the issue. Basically a log(n) function.

###git show-branch

It's sick. Shows changes from all local branches and how they relate to one another. Check it out [here][6].

###git stash

Removed changes from working directory and stores them for later use.

```bash
# make changes
git stash # removes changes from working directory

#include untracked files
git stash --include-untracked

# do something that you need a clean working directory for

git stash pop # reapplies changes to working directory and removes from stash stack

# could also do below if you want to keep that particular stash in the stack
git stash apply stash@{0}

# apply stash to changes to new branch called new_branch_with_stash
git stash branch new_branch_with_stash
```

###Cloning and Remotes

1. When creating remote repositories, `git clone --bare` or `git init --bare` should be used
2. Default git port is 9418 and is typically blocked
3. `.git` is not required when cloning
4. A clone knows about its upstream, but the upstream knows nothing about the clone

```bash
# Deletes all stale remote-tracking branches at myRemote
git remote prune myRemote

# renames remote from myRemote to renamedRemote
git remote rename myRemote renamedRemote

# the initial push to remote called origin
git push --mirror origin
```

###Git Hooks

1. Hooks should only be used as a last resort
1. There are two types of hooks
    * **Pre** is run before the commit occurs
    * **Post** is run after the commit occurs
1. Hooks must start with language spec (ex. `#!/bin/sh`)
1. Hooks must have correct permissions
1. Bypass hooks with `--no-verify` flag

###Submodules

Submodules are probably one of the coolest things about Git, but only when you understand them. A submodule is a project that is in your repo but exists independently in its own source control.

A gitlink is a link from a tree object to a commit object, and it is what makes this possible.

###Advanced Manipulations

`git filter-branch` can help rewrite the entire history of a repo. **Be careful**. When using this you should probably work on a clone and rename all remote references.

`git rev-list` combines multitude of options, sorts through complex commit history, intuit vague user specs, limit search spaces, and locate commits. Can be used to do date based checkout.

Hunks can be staged interactively using `git add -p filename` or `git add -i`.

Git can only compare branches within one repo. Easy way to compare across repos is to add a remote and fetch the branches to get them into current repo.

##The End

Wow, that was a lot of stuff, and it barely breaks the surface. Hopefully some of this was helpful. Stack Overflow and Google are also great resources!


[1]: http://git-scm.com/
[2]: http://shop.oreilly.com/product/9780596520137.do
[3]: http://en.wikipedia.org/wiki/Git_(slang)
[4]: http://en.wikipedia.org/wiki/Linus_Torvalds
[5]: http://git-scm.com/docs/git-checkout#_detached_head
[6]: https://www.kernel.org/pub/software/scm/git/docs/git-show-branch.html
[7]: https://wincent.com/wiki/Git_%22range%22_or_%22dot%22_syntax
[8]: http://en.wikipedia.org/wiki/Directed_acyclic_graph
[9]: http://eagain.net/articles/git-for-computer-scientists/
[10]: https://blogs.atlassian.com/2013/10/git-team-workflows-merge-or-rebase/
