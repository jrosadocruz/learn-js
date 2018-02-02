module.exports = function (grunt) {

        // load all grunt tasks
        // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
        // pkg: grunt.file.readJSON('package.json'),

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            sass: {
                dist: {
                    options: {
                        outputStyle: 'compressed',
                        sourceMap: true,
                        includePaths: ['node_modules/foundation-sites/scss']
                    },
                    src:['./src/scss/main.scss'],
                    dest: './css/main.css'
                }
            },

            pug: {
                compile: {
                     options: {
                         client: false,
                         pretty: true
                     },
                     files: [ {
                        expand: true,
                        cwd: "src/pug",
                        src: ["**/*.pug", "!**/_*.pug"], // ! es para ignorar los _
                        dest: "./",
                        ext: ".html"
                     } ]
                 }
             },

            docco: {
                options: {
                    dst: 'docs',
                    layout: 'parallel'
                },
                docs: {
                    files: [
                        {
                            expand: true,
                            src: 'js/*js'
                        }
                    ]
                }
            },

            // typescript: {
            //     base: {
            //       src: ['ts/**/*.ts'],
            //       dest: 'js',
            //       tsconfig: true,
            //       options: {
            //         module: 'amd', //or commonjs
            //         target: 'ES5', //or es3
            //         sourceMap: true,
            //         declaration: false,
            //         removeComments: false,
            //         // generateTsConfig: true
            //       }
            //     }
            // },
            ts: {
                default : {
                    src: ["ts/*.ts"],
                    outDir: "js",
                    options: {
                        // target: "es6",
                        rootDir: "ts/",
                        module: 'amd',
                        declaration: false,
                        sourceMap: false
                    }
                }
            },

            connect: {
                server: {
                    options: {
                        port: 9001,
                        open: true
                    }
                }
            },

            watch: {
                options: {
                    livereload: true,
                },
                scripts: {
                    files: ['js/*']
                    // tasks: ['docco']
                },
                ts: {
                    files: ['ts/*.ts'],
                    tasks: ['ts']
                },
                sass: {
                    files: ['./src/scss/**/*.scss'],
                    tasks: ['sass'],
                    livereload: true
                },
                css: {
                    files: ['css/*.css'],
                    tasks: [],
                },
                html: {
                    files: ['./src/pug/**/*.pug'],
                    tasks: ['pug'],
                    livereload: true
                }
            }

        });

        // Load these required NPM tasks:
        grunt.loadNpmTasks('grunt-sass');
        grunt.loadNpmTasks('grunt-contrib-pug');
        grunt.loadNpmTasks("grunt-typescript");
        grunt.loadNpmTasks("grunt-ts");
        // grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-docco2');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');

        grunt.registerTask('default', [
            'sass',
            'pug',
            'ts',
            'docco',
            'connect',
            'watch'
        ]);
    };
