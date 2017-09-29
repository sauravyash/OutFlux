var run = require('tape-run');
var browserify = require('browserify');

browserify('./test/test.js')
  .bundle()
  .pipe(run())
  .on('results', console.log)
  .pipe(process.stdout);
