var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-terser');

gulp.task('compile', function() {
     var result = gulp.src(['src/message.js', 'src/event.js', 'src/command.js', 'src/minecraft_api.js'])
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated 

      return result
         .pipe(concat('minecraft_api.js')) // You can use other plugins that also support gulp-sourcemaps
         .pipe(uglify()) 
         .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file 
         .pipe(gulp.dest('dist'));
});