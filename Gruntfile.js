module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      api: {
        src: 'client/app/components/repl/browserApi.js',
        dest: 'client/app/components/repl/api.js'
      }
    },

    concat: {
      basic_and_extras: {
        files: {
          'transpiler/dist/lexer.js': ['transpiler/lexer/*.js'],
          'transpiler/dist/parser.js': ['transpiler/parser/*.js'],
        }
      }
    },

    docco: {
      docs: {
        src: [
          'transpiler/api.js',
          'transpiler/dist/lexer.js',
          'transpiler/dist/parser.js',
          'command.js'
        ],
        options: {
          output: 'client/app/components/source/'
        }
      }
    },

    mochaTest: {
      tuple: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/tupleTests/*.js'
        ]
      },
      tupleSimple: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/tupleTests/tupleSimpleTest.js'
        ]
      },
      tupleNested: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/tupleTests/tupleNestedTest.js'
        ]
      },
      lexer: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/lexerTests/lexerTestsFirstMilestone.js',
          'tests/lexerTests/lexerTestsSecondMilestone.js',
          'tests/lexerTests/lexerTestsThirdMilestone.js',
          'tests/lexerTests/lexerTestsFourthMilestone.js',
        ]
      },
      parser: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/parserTests/parserTestsFirstMilestone.js',
          'tests/parserTests/parserTestsSecondMilestone.js',
          'tests/parserTests/parserTestsThirdMilestone.js',
          'tests/parserTests/parserTestsFourthMilestone.js',
        ]
      },
      generator: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/generatorTests/generatorTestsFirstMilestone.js',
          'tests/generatorTests/generatorTestsSecondMilestone.js',
          'tests/generatorTests/generatorTestsThirdMilestone.js',
          'tests/generatorTests/generatorTestsFourthMilestone.js',
        ]
      },
     endToEnd: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/endToEndTests/endToEndTestsFirstMilestone.js',
          'tests/endToEndTests/endToEndTestsSecondMilestone.js',
          'tests/endToEndTests/endToEndTestsThirdMilestone.js',
          'tests/endToEndTests/endToEndTestsFourthMilestone.js',
        ]
      },
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/lexerTests/lexerTestsFirstMilestone.js',
          'tests/lexerTests/lexerTestsSecondMilestone.js',
          'tests/lexerTests/lexerTestsThirdMilestone.js',
          'tests/lexerTests/lexerTestsFourthMilestone.js',
          'tests/parserTests/parserTestsFirstMilestone.js',
          'tests/parserTests/parserTestsSecondMilestone.js',
          'tests/parserTests/parserTestsThirdMilestone.js',
          'tests/parserTests/parserTestsFourthMilestone.js',
          'tests/generatorTests/generatorTestsFirstMilestone.js',
          'tests/generatorTests/generatorTestsSecondMilestone.js',
          'tests/generatorTests/generatorTestsThirdMilestone.js',
          'tests/generatorTests/generatorTestsFourthMilestone.js',
          'tests/endToEndTests/endToEndTestsFirstMilestone.js',
          'tests/endToEndTests/endToEndTestsSecondMilestone.js',
          'tests/endToEndTests/endToEndTestsThirdMilestone.js',
          'tests/endToEndTests/endToEndTestsFourthMilestone.js',
        ]
      }
    },

    jshint: {
      files: [
        'transpiler/**/*'
      ],
      options: {
        force: false,
        jshintrc: '.jshintrc',
        ignores: [
        ]
      }
    },

    shell: {
      rebase: {
        command: 'git pull --rebase origin develop'
      },
      bower: {
        command: './node_modules/bower/bin/bower install'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', [
    // 'jshint',
    'mochaTest:test'
  ]);

  grunt.registerTask('testLexer', [
    // 'jshint',
    'mochaTest:lexer'
  ]);

  grunt.registerTask('testParser', [
    // 'jshint',
    'mochaTest:parser'
  ]);

  grunt.registerTask('testGenerator', [
    // 'jshint',
    'mochaTest:generator'
  ]);

  grunt.registerTask('testTuple',[
    'mochaTest:tuple'
  ]);

  grunt.registerTask('testTupleSimple',[
    'mochaTest:tupleSimple'
  ]);

  grunt.registerTask('testTupleNested',[
    'mochaTest:tupleNested'
  ]);

  grunt.registerTask('testEndToEnd', [
    // 'jshint',
    'mochaTest:endToEnd'
  ]);

  grunt.registerTask('rebase', [
    'shell:rebase'
  ]);

  grunt.registerTask('build', [
    'test',
    'browserify',
    'concat',
    'docs'
  ]);

  grunt.registerTask('docs', [
    'concat',
    'docco'
  ]);

  grunt.registerTask('heroku:development', [
    'shell:bower',
    'build'
  ]);
};
