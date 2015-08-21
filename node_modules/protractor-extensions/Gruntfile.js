'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        portPick: {
            options: {
                port: 9000
            },
            connect: {
                targets: [
                    'connect.options.port'
                ]
            },
            protractor: {
                targets: [
                    'protractor_coverage.options.collectorPort'
                ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: {
                src: ['index.js']
            }
        },
        connect: {
            options: {
                port: 0,
                hostname: '0.0.0.0'
            },
            test: {
                options: {
                    open: false,
                    middleware: function (connect) {
                        var config = grunt.config.get('config');
                        return [
                            connect().use('/node_modules', connect.static('./node_modules')),
                            connect().use('/', connect.static('test/protractor')),
                        ];
                    }
                }
            }
        },
        watch: {
            test: {
                files: ['test/extension.html']
            }
        },
        protractor: {
            options: {
                configFile: 'protractor.conf.js',
                keepAlive: false,
                noColor: false,
                debug: false
            },
            all: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:<%= connect.test.options.port %>',
                    }
                }
            }
        }
    });

    grunt.registerTask('test', 'Execute tests.', [
        'portPick',
        'connect',
        'protractor'
    ]);

    grunt.registerTask('default', 'Default', [
        'test'
    ]);
};