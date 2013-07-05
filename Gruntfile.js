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
		watch: {
			less: {
				files: [ './less/styles.less' ],
				tasks: [ 'recess:compile' ]
			}
		}
	});

	// Default task.
	grunt.registerTask('default', [ 'recess:bootstrap', 'recess:compress' ]);

	// Dev watch task
	grunt.registerTask('dev', [ 'recess:bootstrap', 'watch:less' ] );

};
