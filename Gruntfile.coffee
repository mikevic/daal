module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		nodemon:
			dev:
	  			options:
	  				file: 'app.js'            

	grunt.loadNpmTasks 'grunt-nodemon'
	grunt.registerTask 'default', ['nodemon']
	return