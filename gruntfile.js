module.exports = function( grunt ) {
	require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );

	grunt.initConfig({
		concat: {
			js: {
				src: [
					"js/**/*.js"
				], dest: "js/pwn-docs.js"
			}
		},
		uglify: {
			options: {
				preserveComments: "some"
			}, build: {
				files: {
					"dist/js/pwn.min.js": ["js/pwn-docs.js"]
				}
			}
		},
		less: {
			less: {
				src: "less/docs.less",
				dest: "css/docs.css"
			}
		}, cssmin: {
			pwn_css: {
				src: "css/docs.css",
				dest: "css/docs.min.css"
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