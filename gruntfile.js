module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            options: {
                compress: {
                    drop_console: false
                },
                preserveComments: 'some'
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js/',
                    ext: '.min.js'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};