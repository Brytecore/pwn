module.exports = function( grunt ) {
	require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );

	grunt.initConfig({
		concat: {
			pwn_js: {
				src: [
					"js/**/*.js"
				], dest: "dist/pwn.js"
			}
		},
		uglify: {
			options: {
				preserveComments: "some"
			}, build: {
				files: {
					"dist/pwn.min.js": ["dist/pwn.js"]
				}
			}
		},
		less: {
			pwn_less: {
				src: "less/pwn.less",
				dest: "dist/pwn.css"
			}
		}, cssmin: {
			pwn_css: {
				src: "dist/pwn.css",
				dest: "dist/pwn.min.css"
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