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
			base: {
				files: {
					'./js/min/main.js': [ './js/main.js' ]
				}
			}
		},
		copy: {
			js: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [ './js/main.js' ],
						dest: './js/min/',
						filter: 'isFile'
					}
				]
			}
		},
		watch: {
			all: {
				files: [ './less/styles.less', './js/main.js' ],
				tasks: [ 'jshint', 'recess:compile', 'copy:js' ]
			}
		}
	});

	// Default task.
	grunt.registerTask('default', [ 'jshint', 'recess:bootstrap', 'recess:compress', 'uglify:base' ]);

	// Dev watch task
	grunt.registerTask('dev', [ 'jshint', 'recess:bootstrap', 'copy:js', 'watch:all' ] );

};
