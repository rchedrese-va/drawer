var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var reload = browserSync.reload;

gulp.task('default', function() {
  // place code for default task.
  console.log('Gulp is running!');
})

// Static server
gulp.task('watch', function() {
  browserSync({
    notify: false,
    server: {
      baseDir: "./docs"
    }
  });

  gulp.watch(['src/sass/*.scss'], ['styles', reload]);
  gulp.watch(['./*.html'], reload);
  gulp.watch(['src/js/*.js'], ['styles', reload]);
});

gulp.task('copy', ['styles', 'js'], function() {
  return;
});

// Compile Sass files
gulp.task('styles', function() {
  return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css')) // Write the CSS & Source maps
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('styles:docs', function() {
  return gulp.src('docs/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('docs/css'));
});

gulp.task('js', function() {
  return gulp.src(['src/js/jquery.drawer.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest('docs/js'));
});

