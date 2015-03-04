module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            use_defaults: ['routes/**/*.js', 'app.js'],
            options: {
                //curly: true,
                eqeqeq: true,
                node: true,
                undef: true,
                unused: "vars"
            },
            with_overrides: {
                options: {
                    globals : {
                        after: true,
                        before: true,
                        describe: true,
                        it: true,
                    }
                },
                files: {
                    src: ['test/**/*.js']
                },
            }
        }
    });
    grunt.registerTask('default', ['jshint']);
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
