module.exports = function( grunt ) {
	require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );

	grunt.initConfig({
		concat: {
			js: {
				src: [
					"js/src/**/*.js"
				], dest: "js/pwn-docs.js"
			},
			libs: {
				src: [
					"libraries/sh/shCore.js",
					"libraries/sh/shBrushJScript.js",
					"libraries/sh/shBrushXML.js"
				], dest: "js/docs-libs.js"
			}
		},
		uglify: {
			options: {
				preserveComments: "some"
			}, build: {
				files: {
					"js/pwn-docs.min.js": ["js/pwn-docs.js"],
					"js/docs-libs.min.js": ["js/docs-libs.js"]
				}
			}
		},
		less: {
			less: {
				src: "less/docs.less",
				dest: "css/docs.css"
			}
		},
		cssmin: {
			pwn_css: {
				src: "css/docs.css",
				dest: "css/docs.min.css"
			},
			libs: {
				src: [
					"libraries/sh/shCore.css",
					"libraries/sh/shThemeDefault.css"
				], dest: "css/docs-libs.min.css"
			}
		},
		watch: {
			js: {
				files: ["js/src/**/*.js"],
				tasks: ["build-js"]
			},
			less: {
				files: ["less/**/*.less"],
				tasks: ["build-less"]
			}
		}
	});

	grunt.registerTask( "default", [] );

	grunt.registerTask( "build", ["build-js", "build-less", "build-libs-js", "build-libs-css"] );
	grunt.registerTask( "build-js", ["concat:js", "uglify"] );
	grunt.registerTask( "build-less", ["less", "cssmin:pwn_css"] );
	grunt.registerTask( "build-libs-js", ["concat:libs", "uglify"] );
	grunt.registerTask( "build-libs-css", ["cssmin:libs"] );
};