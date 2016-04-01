module.exports = function( grunt ) {
	require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		concat: {
			pwn_js: {
				options: {
					banner:
						"/*! Pwn JavaScript library v<%= pkg.version %> - http://www.pwncss.com\n" +
						" *  Copyright 2016 Brytecore, LLC\n" +
						" *  Licensed under MIT - https://github.com/Brytecore/pwn/blob/master/LICENSE\n" +
						" */\n"
				},
				src: [
					"js/**/*.js"
				], dest: "dist/js/pwn.js"
			}
		},
		uglify: {
			options: {
				preserveComments: "some"
			}, build: {
				files: {
					"dist/js/pwn.min.js": ["dist/js/pwn.js"]
				}
			}
		},
		less: {
			options: {
				banner:
					"/*! Pwn CSS framework v<%= pkg.version %> - http://www.pwncss.com\n" +
					" *  Copyright 2016 Brytecore, LLC\n" +
					" *  Licensed under MIT - https://github.com/Brytecore/pwn/blob/master/LICENSE\n" +
					" */\n"
			},
			pwn_less: {
				src: "less/pwn.less",
				dest: "dist/css/pwn.css"
			}
		}, cssmin: {
			options: {
				restructuring: false
			},
			pwn_css: {
				src: "dist/css/pwn.css",
				dest: "dist/css/pwn.min.css"
			}
		},
		watch: {
			js: {
				files: ["js/**/*.js"],
				tasks: ["build-js"]
			},
			less: {
				files: ["less/**/*.less"],
				tasks: ["build-less"]
			}
		}
	});

	grunt.registerTask( "default", [] );

	grunt.registerTask( "build", ["build-js", "build-less" ] );
	grunt.registerTask( "build-js", ["concat", "uglify"] );
	grunt.registerTask( "build-less", ["less", "cssmin"] );
};