'use strict';
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.initConfig({
        ngtemplates: {
            app: {
                src: 'template/**.html',
                dest: 'src/template.js',
                options: {
                    url: function (url) {
                        return url.replace('template/', '');
                    },
                    htmlmin: {collapseWhitespace: true, collapseBooleanAttributes: true},
                    module: 'ngTemplateTable'
                }
            }
        },
        uglify: {
            app: {
                files: {
                    'dist/ngTemplateTable.min.js': ['dist/ngTemplateTable.js'
                    ]
                }
            }
        },
        cssmin: {
            app: {
                files: {
                    'dist/ngTemplateTable.min.css': ['css/style.css']
                }
            }
        },
        copy: {
            main: {
                src: 'src/css/img/*',
                dest: 'dist/img/',
                expand: true,
                flatten: true,
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/ngTemplateTableDirective.js',
                    'src/btn-order-filterDirective.js',
                    'src/filter.js',
                    'src/pagination.js',
                    'src/template.js'
                ],
                dest: 'dist/ngTemplateTable.js'
            }
        }

    });
    grunt.registerTask('default', [
        'ngtemplates:app','concat:dist','uglify:app', 'cssmin:app','copy:main']);
}