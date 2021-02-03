var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-terser');

gulp.task('compile', function() {
     var result = gulp.src(['src/message.js', 'src/event.js', 'src/command.js', 'src/minecraft_api.js'])
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated 

      return result
         .pipe(concat('minecraft_api.js')) // Concats the files
         .pipe(uglify()) // Uglifies the files so they are a fast dump
         .pipe(sourcemaps.write()) // Adds the sourcemaps to the final output 
         .pipe(gulp.dest('dist'));
});