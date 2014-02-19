---
layout: post
title: "Grunt at ExactTarget"
date: 2014-02-18 13:51:07-05:00
tags:
  - grunt
  - gruntjs
  - javascript
  - optimization
  - programming
summary: "Delivering an app (front-end) can be hard. There are a lot of things to take into account. Should I lint my files? Do I need unit tests? How do I deliver the most optimized content to the user? Usually people have to do all these steps manually, cutting productivity. But not anymore"
heroImage: 'et_grunt_hero.jpg'
twitterHeroImage: 'http://s3.amazonaws.com/babble.vernacchia/posts/twitterImg/et_grunt_hero.jpg'
---

Delivering an app (front-end) can be hard. There are a lot of things to take into account. Should I lint my files? Do I need unit tests? How do I deliver the most optimized content to the user? Usually people have to do all these steps manually, cutting productivity. But not anymore!!

Welcome [Grunt][17] to the playground; a task runner created to solve this repetitive problem. Why a task runner you might ask?

> In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort.
> <small class="pull-right"><cite>gruntjs.com</cite></small>

This article is a little long, so **TL;DR** - We use Grunt, and it's so helpful.

##Grunt vs. Gulp

So why do we use Grunt if there's this cool, new streaming build system [Gulp][1]? There's been so much hype about it. If it's your first time hearing about Gulp, [check out this article][2] to see the differences between it and Grunt. So, shouldn't we be using Gulp?

To be blunt, no. While Gulp looks promising, our team and company has invested a lot of time into Grunt. Switching to another build system would require more learning, thus lowering productivity. Don't get me wrong, learning is a **fundamental** part of a software developer's job, but when we are delivering a 
new product we can deal with the "bloated" Gruntfile, how plugins do multiple things (even though we try to avoid that), and how temporary folders are created during the process.

I also feel Gulp isn't as viable because of Grunt's community, which is HUGE. There are so many plugins out there that can help with almost anything. 
Unfortunately, Gulp is not as mature. I just found the [gulp-requirejs plugin][3], but before today not having this was a huge blocker as most our apps use RequireJS. 
It doesn't seem worth the time until the community gets bigger.

I have been testing out Gulp on some of my personal projects and like it so far. I'm actually almost done writing my first plugin. We'll see how that goes.

##Our Build Process

At a glace, our build process does the following:

1. JSHint
2. Stubtests
3. Karma tests
4. Mocha tests
5. Complexity report
6. Compile handlebars
6. RequireJS optimization
7. CSS optimization
8. Image optimization
9. Documentation generation

###JSHint

**Plugin Used:** [grunt-contrib-jshint][4]

This will run all our files, minus vendor files, through JSHint. The build process will fail if the rules from our .jshintrc are not met.

###Stubtests

**Plugin Used:** Custom

This is a custom task we created. It will run through all the files (client-side only) and determine if there is a test for that file. If no test is present we will create one that fails by default. This will cause the next step, Karma, to fail. We basically force developers to write tests for all their files. At least my team does.

{% highlight js %}
// task
grunt.registerMultiTask( 'stubtests' , 'Create empty stub test files to be filled in later' , function() {
	this.files.forEach( function( batch ) {
		batch.src.forEach( function( file ) {
			var src = ( batch.cwd + '/' + file );
			var dest = ( batch.cwd + '/' + batch.dest + '/' + file.replace( /\.js$/, '-test.js' ) );
			var template = batch.template.replace( /%%src%%/g , file.replace( /\.js$/ , '' ) );

			if( ! fs.existsSync( dest ) ) {
				grunt.file.write( dest , template );
				grunt.log.ok( src + ' -> ' + dest );
			}
		} );
	} );
} );

// configuration
stubtests: {
	default: {
		cwd: 'public', // folder that contains client side code
		src: [
			'**/*.js' // what files to match for tests. Can use ! to exclude
		],
		dest: '../test/client', // place to put tests
		tests: [ // Relative to dest
			'**/*.js'
		],
		out: 'all',
		template: grunt.file.read( 'utils/test-template.js' ), // template to create fake test from
	}
}

// utils/test-template.js
define( function( require ) {
	"use strict";

	// the require statement below may need to be altered
	// based on your require paths configuration.
	// var ObjectToTest = require( '%%src%%' );

	describe('%%src%%', function() {
		it( 'should have unit tests', function() {
			expect( false ).to.equal( true );
		});
	});

});
{% endhighlight %}

###Karma Tests (client-side)

**Plugin Used:** [grunt-karma][5]

We use [Karma][6] to run our client-side unit tests. For testing we use the plugins karma-mocha, karma-requirejs, karma-chai, and karma-sinon loaded in that order in the karma.conf.js (otherwise you'll have problems). We also use karma-coverage to generate our code coverage report. Our team shoots for around 85% coverage, but we would love to get that into the high 90's. Writing tests is an art form in itself.

###Mocha Tests (server-side)

**Plugin Used:** [grunt-mocha-test][7]

We would run our node.js tests with this plugin if there wasn't a problem, which also seems to be present in other mocha plugins. It seems mocha doesn't run the same in Grunt as it does from the command line. While all our tests pass when running them with mocha via the command line, when ran inside grunt they fail. For this reason we had to remove this step and are investigating the issue further.

###Complexity Report

**Plugin Used:** [grunt-complexity][8]

In an effort to keep our code maintainable we generate a complexity report every time we build our app. If a file is too complex, it has to be reworked. Vendor files are excluded. Our maintainability is set to 90 and all other config values are the recommended defaults. We used to have the maintainability set to 100, but [complexity-report][9] feels that RequireJS configs are too complex. Agree to disagree.

###Compile Handlebar Templates

**Plugin Used:** [grunt-contrib-handlebars][10]

If none of the previous steps failed, we are ready for the actual build to start.

First, we compile our handlebars templates. This removes the need for us to load HTML templates and have them converted into JS on the fly. Makes everything faster.

###RequireJS (r.js optimization)

**Plugin Used:** [grunt-contrib-requirejs][11]

This is the first, and only, plugin used that does multiple tasks. It does the following:

1. Combines our dependencies into the modules we've designated
2. Uglifies our code (minifies)
3. Generates source maps
4. Copies the combined and uglified code into an optimized directory

###CSS Optimization

**Plugin Used:** [grunt-recess][12]

This task will compile and compress our LESS into CSS. All other teams at ExactTarget use [grunt-contrib-less][13] because it uses a newer version of the LESS compiler, but grunt-recess works just fine for us.

###Image Optimization

**Plugin Used:** [grunt-contrib-imagemin][14]

We want to optimize all our images so they load faster and this plugin does just that for JPG, PNG, and GIFs. It worked great at the start, but there seems to be [issues][16] where JPEG files are being destroyed if JPEGs are the only files present. Once that gets fixed this will be default in our process again.

###Documentation Generation

**Plugin Used:** [grunt-docco][15]

Most of the people on my team write comments in their code to help others grasp what they are doing. Grunt-docco goes through files and generates HTML files with comments on the left and the code on the right. It's very similar to the [Backbone][18] and [Underscore][19] annotated source code. Super helpful for new people joining our team.

We don't run this locally, only on our TeamCity server.

##Continuous Integration and Continuous Deployment

We utilize TeamCity to run all our tasks and manage deployments. While developers have git-hooks enabled to fix problems before committing code, TeamCity will run the default Grunt task again to make sure nothing is wrong.

We also have an automated release process (in-beta), built with Grunt (go figure), that creates a release on Github. When TeamCity sees a release tag it will kick off a build. If that build passes our code is then deployed.

###The End

If you read the whole article you can see we have a lot going in order to fully optimize our app before deployment. Grunt makes this process much easier by allowing us to automate this process. Before Grunt we used custom node scripts, which were a nightmare and overly complicated. Thank goodness for Grunt!


P.S. I would check out [grunt-shell][20] if you need to run anything on the command line. Super helpful for stuff like Jekyll.


[1]: http://gulpjs.com/
[2]: http://travismaynard.com/writing/no-need-to-grunt-take-a-gulp-of-fresh-air
[3]: https://github.com/robinthrift/gulp-requirejs
[4]: https://github.com/gruntjs/grunt-contrib-jshint
[5]: https://github.com/karma-runner/grunt-karma
[6]: http://karma-runner.github.io/
[7]: https://github.com/pghalliday/grunt-mocha-test
[8]: https://github.com/vigetlabs/grunt-complexity
[9]: https://github.com/philbooth/complexity-report
[10]: https://github.com/gruntjs/grunt-contrib-handlebars
[11]: https://github.com/gruntjs/grunt-contrib-requirejs
[12]: https://github.com/sindresorhus/grunt-recess
[13]: https://github.com/gruntjs/grunt-contrib-less
[14]: https://github.com/gruntjs/grunt-contrib-imagemin
[15]: https://github.com/DavidSouther/grunt-docco
[16]: https://github.com/gruntjs/grunt-contrib-imagemin/issues
[17]: http://gruntjs.com/
[18]: http://backbonejs.org/docs/backbone.html
[19]: http://underscorejs.org/docs/underscore.html
[20]: https://github.com/sindresorhus/grunt-shell