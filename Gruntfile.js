/*global module:false*/
module.exports = function(grunt) {

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
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
				tasks: [ 'recess:compile', 'copy:js' ]
			}
		}
	});

	// Default task.
	grunt.registerTask('default', [ 'recess:bootstrap', 'recess:compress', 'uglify:base' ]);

	// Dev watch task
	grunt.registerTask('dev', [ 'recess:bootstrap', 'copy:js', 'watch:all' ] );

};
