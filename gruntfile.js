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
        },
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                }]
            }
        }//,
        //concat: {
        //    options: {
        //        separator: ';'
        //    },
        //
        //    basic_and_extras: {
        //        files: {
        //            'dist/js/application.min.js': [],
        //            'dist/css/style.min.css': []
        //        }
        //    }
        //}
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'concat']);

};