/*global module:false*/
module.exports = function(grunt) {

	"use strict";

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'./js/*.js'
			]
			, options: { jshintrc: '.jshintrc' }
			, gruntfile: {
				src: 'Gruntfile.js'
			}
		},
		recess: {
			compile: {
				src: ['./less/styles.less'],
				dest: './css/styles.css',
				options: {
					compile: true
				}
			},
			compress: {
				src: ['./less/styles.less'],
				dest: './css/styles.css',
				options: {
					compress: true
				}
			},
			compileSearch: {
				src: [
					'./less/styles.less',
					'./less/search.less'
				],
				dest: './css/search-styles.css',
				options: {
					compile: true
				}
			},
			compressSearch: {
				src: [
					'./less/styles.less',
					'./less/search.less'
				],
				dest: './css/search-styles.css',
				options: {
					compress: true
				}
			},
			bootstrap: {
				src: [
					'./less/bootstrap.less'
				],
				dest: './css/bootstrap.css',
				options: {
					compress: true
				}
			}
		},
		uglify: {
			main: {
				files: {
					'./js/min/index.js': [ './js/index.js' ],
					'./js/min/all.js': [ './js/all.js' ],
					'./js/min/jquery.js': [ './bower_components/jquery/jquery.js' ]
				}
			},
			search: {
				files: {
					'./js/min/search.js': [
						'./bower_components/jquery/jquery.js',
						'./bower_components/lunr.js/lunr.js',
						'./bower_components/mustache/mustache.js',
						'./bower_components/date.format.js/index.js',
						'./bower_components/URI.js',
						'./bower_components/jquery.lunr.search.js/index.js'
					]
				}
			}
		},
		copy: {
			js: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [ './js/*.js' ],
						dest: './js/min/',
						filter: 'isFile'
					}
				]
			},
			boostrapImg: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [ './bower_components/bootstrap/img/*' ],
						dest: './img',
						filter: 'isFile'
					}
				]
			}
		},
		watch: {
			all: {
				files: [ './less/*.less', './js/*.js' ],
				tasks: [ 'dev' ]
			}
		},
		shell: {
			buildJekyll: {
				options: {
					stdout: true
				},
				command: 'jekyll build'
			}
		},
		img: {
			generatedImg: {
				src: './_site/generated'
			},
			siteImg: {
				src: './_site/img'
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeOptionalTags: true,
					removeEmptyAttributes: true
				},
				expand: true,
				cwd: './',
				src: [ '_site/**/*.html' ],
				dest: './'
			}
		},
		minjson: {
			searchMin: {
				files: {
					'./_site/search.json': './_site/search.json'
				}
			}
		},
		clean: [
			"./_site/uploads",
			"./_site/bower_components",
			"./_site/node_modules",
			"./_site/less",
			"./_site/bower.json",
			"./_site/Gruntfile.js",
			"./_site/package.json",
			"./_site/README.md"
		]
	});

	// Default task.
	grunt.registerTask('default', [
		'jshint'
		, 'recess:bootstrap'
		, 'recess:compress'
		, 'recess:compressSearch'
		, 'uglify:main'
		, 'uglify:search'
		, 'copy:boostrapImg'
	]);

	// Dev watch task
	grunt.registerTask('dev', [
		'jshint'
		, 'recess:bootstrap'
		, 'recess:compile'
		, 'recess:compileSearch'
		, 'copy:js'
		, 'copy:boostrapImg'
	]);

	grunt.registerTask('watchAll', [
		'dev'
		, 'watch:all'
	]);

	grunt.registerTask( 'release', [
		'default'
		, 'shell:buildJekyll'
		, 'img:generatedImg'
		, 'img:siteImg'
		, 'clean'
		, 'htmlmin:dist'
		, 'minjson:searchMin'
	]);

	grunt.registerTask('css', [ 'recess:compile', 'recess:compileSearch' ] );

};
