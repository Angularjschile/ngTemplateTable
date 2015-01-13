'use strict';
module.exports = function(grunt){
grunt.loadNpmTasks('grunt-angular-templates');

    grunt.initConfig({
        ngtemplates:  {
            app:        {
                src:      'template/**.html',
                dest:     'src/template.js',
                options:  {
                    url:    function(url) { return url.replace('template/', ''); },
                    htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true },
                    module: 'ngTemplateTable'
                }
            }
        }

    });
    grunt.registerTask('default', [
        'ngtemplates:app']);
}