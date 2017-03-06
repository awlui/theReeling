module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: ['./**/*.html', './src/stylesheets/sass/main.scss']
			},
			sass: {
				tasks: ['sass'],
				files: ['./src/stylesheets/sass/**/*.scss']
			}
		},
		sass: {
			dev: {
				files: {
					'./public/stylesheets/main.css': './src/stylesheets/sass/**/*.scss'
				}
			}
		},
		tinyimg: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'public/images/original',
					src: ['*.{png,jpg,svg}'],
					dest: 'public/images'
				}]
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			dev: {
				files: {
					'public/scripts/main.min.js': ['src/scripts/main.js'],
					'public/scripts/ajax.min.js': ['src/scripts/ajax.js']
				}
			}
		}

	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-tinyimg');
	grunt.registerTask('default', ['watch']);
};