##A Custom Jekyll Theme For My Babble

###Features

1. Creates posts (obviously)
2. [Creates tag structure](http://charliepark.org/tags-in-jekyll/)
3. [Displays gists](http://blog.55minutes.com/2012/03/liquid-gist-tag-for-jekyll/#gist-1937862-gist-rb)
4. [Displays youtube videos](https://gist.github.com/joelverhagen/1805814)
5. Pagination
6. [Custom image tags + resizing](https://github.com/robwierzbowski/jekyll-image-tag) _modified for my use case_
    * [Minimagick](https://github.com/minimagick/minimagick) - _for liquid image tags_
    * [Imagemagick](http://www.imagemagick.org/script/index.php) - _for liquid image tags_
7. [Search](https://github.com/slashdotdash/jekyll-lunr-js-search)
    * Modified from source to do what you see on the blog.
    * Changes include:
        1. basic filtering of results (not delivering pages)
        2. modified text display of entries delivered
        3. substring title returned if over certain amount of characters

### GEMs Needed

I have just started using Ruby v2.0.0 (but this will work with v1.9.3). GEMs needed include:

1. rdiscount - _for rendering_
2. activesupport - _for caching_
3. json - _for Lunr Search_
4. nokogiri - _for Lunr Search_

###Grunt Tasks

1. **default**
    * jshint
    * compresses bootstrap LESS
    * compresses site LESS
    * compresses search pages specific LESS
    * uglifies JS
    * uglifies search page specific JS
    * copies bootstrap images into main image directory (from bower_components)
2. **dev**
    * jshint
    * compresses bootstrap LESS
	* compiles site LESS
    * compiles search pages specific LESS
	* copies unminified JS into min/
    * copies unminified search page specific JS into min/
    * copies bootstrap images into main image directory (from bower_components)
3. **watchAll**
    * _dev_ task executed
    * watches all LESS and JS files in top level directory
        * executes _dev_ task when changes occur
4. **release** (super optimized)
    * _Need to have optipng & jpegtran installed._
        * `brew install optipng jpeg` (MAC)
        * `apt-get install optipng libjpeg libjpeg-progs` (Linux not ubuntu)
        * `apt-get install optipng libjpeg62 libjpeg-progs` (ubuntu)
    * runs _default_ task
    * executes `jekyll build`
    * optimizes images in _site/ directory (img/ and generated/)
    * removes unnecessary files in _site/ directory
    * minifies HTML
    * minifies JSON used by Lunr search plugin

###If You're Using Github Pages
If you're using Github Pages to publish with this "theme" you **WILL NOT** be able to use any custom plugins. Checkout the two links below, which outline what you can do to combat this problem.

+ http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html
+ http://davidensinger.com/2013/04/deploying-jekyll-to-github-pages/
