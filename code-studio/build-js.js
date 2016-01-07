#!/usr/bin/env node
/** @file Build script for JS assets in the code-studio package, which is loaded
    by dashboard (our "Code Studio" Rails app). */
'use strict';

var build_commands = require('../shared/js/build-commands');
var commander = require('commander');

/** @const {string} */
var BUILD_PATH = './build/js/';

// Use commander to parse command line arguments
// https://github.com/tj/commander.js
commander
    .option('--min', 'Build minified output', false)
    .option('--watch', 'Watch file system', false)
    .parse(process.argv);

// Run build (exits on failure)
build_commands.execute([
  build_commands.ensureDirectoryExists(BUILD_PATH),
  build_commands.browserify({
    srcPath: './src/js/',
    buildPath: BUILD_PATH,
    filenames: [
      'code-studio.js',
      'levelbuilder.js',
      'levelbuilder_dsl.js',
      'levelbuilder_studio.js',
      'leveltype_widget.js',
      'video.js' // TODO: Rename to video_embed.js?
    ],
    commonFile: 'code-studio-common',
    shouldMinify: commander.min,
    shouldWatch: commander.watch
  })
]);

console.log("code-studio js built\n");
