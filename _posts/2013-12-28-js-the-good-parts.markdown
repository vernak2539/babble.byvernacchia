---
layout: post
title: "JavaScript: The Good Parts"
date: 2013-12-28 15:10:05
tags:
  - javascript
  - programming
summary: "As every good front-end programmer should do, I finally finished reading <em>JavaScript: The Good Parts</em> by Douglas Crockford (DC). Unfortunately I've been writing JavaScript (JS) for a while, but I have not had the chance to finish this book"
heroImage: 'good_parts_hero.jpg'
twitterHeroImage: 'https://s3.amazonaws.com/babble.vernacchia/posts/twitterImg/good_parts_hero.jpg'
---

As every good front-end programmer should do, I finally finished reading *JavaScript: The Good Parts* by Douglas Crockford (DC). Unfortunately I've been writing
JavaScript (JS) for a while, but I have not had the chance to finish this book.

Thanks to a little time off and a trip across a few states, I was able to finish it.

I will not cover the book in-depth, but I wanted to present what I thought was interesting, or my "ah-ha" moment's I reached.

##The Good Parts

JS was built on good ideas and bad ideas, which I'll get to a little later. The good ideas, according to DC, are:

1. Functions
2. Loose Typing
3. Dynamic Objects
4. Expressive Object Literal Notation

This is exactly why I love JS. I came from a background of PHP, C, and C++ where these weren't features except for functions, 
but they aren't [first-class citizens][1], and the loosely typed nature of PHP.

I have always heard the term "immutable" and have never really found a definition that I could wrap my head around, or I just didn't try to (silly me).
After this book and a little more digging it finally makes sense. Once an object, variable, etc. is made, memory is allocated for it. If you try to change it,
the initial allocation is not altered; a new memory allocation is made even if you don't plan on using your initial creation. The garbage collector will clean
it up for you.

I like how there are a set number of "falsy" values, or values that equate to false. You can test these out by running `!!value` or `Boolean( value )`. 
These falsy values include:

1. false
2. null
3. undefined
4. "" (empty string)
5. 0
6. NaN

Everything else will equate to true. Try it out.

###Objects

Everything except **Numbers**, **Strings**, **Booleans**, **Null**, and **Undefined** are objects.

* It just so happens these are the 5 primitive types of JS

You might argue that Numbers and Strings are objects, but they aren't. What makes them look like objects is the fact that they have access to *String.prototype*
or *Number.prototype* (primitive wrappers). This allows them to behave like an object even if they weren't initialized using a constructor (i.e. new).

When running the `hasOwnProperty` function on an object, it will not look at the prototype chain. I know I've ran into some issues because of this before. Good to know.

###Functions

1. Using `new` is not recommended when constructing objects with functions. Why?
    * Because of inheritance, which is the next header (explained there)
2. The arguments property of a function is not an array. It's an array-like object
    * It lacks all array methods, but has a length
3. `return` = "return control to part of the program that invoked the function"
    * Never put this together. Knew exactly what return did and how to use it, but not why it was named that way
4. JS has function scope, not block scope
    * Variables are scoped relative to functions, not blocks (i.e. if/else, while, for, etc.)
    * Best to declare all variables at top of function body

###Inheritance

1. Forgetting to use `new` will bind `this` to the global object instead of the newly created object
    * Workaround: Don't use `new`
2. Inheritance if fucking sweet, just to reiterate

###Arrays

1. An array is really an object with array-like characteristics
    * Arrays get a length property from Array.prototype that Object.prototype doesn't have
2. `delete` leaves a hole, `splice`
 doesn't
3. "JS itself is confused about the difference between arrays and objects" - DC
4. Cool way to check if variable is array, not object, is to check the constructor
    * I usually check the prototype change

###Methods

Nothing too much to say here other than it was cool to see how methods like `splice` and others are implemented. Makes me think more about using them.

##The Bad Parts

I'm not going to tell you. If you really want to know you should read the book.

Basically, they include everything you're told not to do when first learning JS.

[1]: http://en.wikipedia.org/wiki/First-class_function
