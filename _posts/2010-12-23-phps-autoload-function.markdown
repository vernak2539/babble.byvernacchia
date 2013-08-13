---
layout: post
title: PHP's autoload function
date: 2010-12-23 14:27:00
tags:
  - bootstrap
  - oop
  - php
  - programming
summary: I am currently working on a website that utilizes Object-Oriented Programming in PHP. I found it was a hassle every time I wanted to use a custom class which I had created prior. I would always have to include or require the file before making an object from the class
---
I am currently working on a website that utilizes Object-Oriented Programming in PHP. I found it was a hassle every time I wanted to use a custom class which I had created prior. I would always have to include or require the file before making an object from the class. Sometimes, this can get a little frustrating when you are in a hurry and you see that your object is not working. You check the basics including did I initialize it correctly? Did I set all the required variables? etc. Lo and behold you just forgot to include the file that contains the class you are working with. This is where PHP’s autoload function comes in handy.

The project I am working on utilizes a bootstrap in order to load pages. For those of you that don’t know what a bootstrap is, here is the short version. No matter what URL you type on the site, it will redirect you to a designated page (mine is set up so that if the file is real/is a file, it will take you to that file and not redirect). Once on the designated page, a “bootstrap” will take over and try to load the page that you requested. If it finds the page, which I have, hidden, outside the www/ on my webspace, it will include it, and if it fails to find it, a 404 is thrown and a custom error message is displayed.

Since every page goes through this bootstrap it was easy for me to integrate the autoload function at the beginning. Another way to do it would involve putting the code in the header that you include on every page, although I have not tested this method.

So the autoload code is as follows (just the basics):

{% highlight php %}
<?php
function __autoload($class) {
 	// loading classes go here
}
?>
{% endhighlight %}

This is just the basic function. If you want to see more examples look at [php.net’s page on autoloading][1]. The “$class” variable is the class that is trying to be loaded when initializing and object. Let’s take a look at the code I use on my site to load the classes I use.

{% highlight php %}
<?php
function __autoload($class) {
	$class{0} = strtolower($class{0});
	if(is_file(path/to/file/."class.".$class.".php")) {
		include(path/to/file/."class.".$class.".php");
	}
}
?>
{% endhighlight %}


First, I named the files that have my classes in them something like “class.test.php.” Inside this file there would be a class named something like “Test.” In my code, I change the first character to the lowercase version (this can be accomplished through [lcfirst()][2] if using PHP 5.3 ), test if the class I’m trying to load is a file, and if it is, I include the file to needed to call the class. So if I made an object like the following

{% highlight php %}
<?php
$obj = new Test();
?>
{% endhighlight %}

My autoload function would include a file named “class.test.php” if it existed on the server.

On php.net, they have examples that throw exceptions, but I feel that this way is a little bit easier. Of course with my method you can always factor in error messaging and anything else you need to make it yours.

Hopefully this helped. Before trying this I would have to load all the classes individually, which took a lot of time and confused me sometimes when it didn’t work.

   [1]: http://php.net/manual/en/language.oop5.autoload.php
   [2]: http://www.php.net/manual/en/function.lcfirst.php
