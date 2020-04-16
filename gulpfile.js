const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');


const styleFiles = [
    './src/css/main.css',
    './src/css/media.css'
];

/*
const styleFiles = [
    './src/css/main.scss',
    './src/css/color.sass'
];
*/
const scriptFiles = [
    './src/js/lib.js',
    './src/js/main.js'
]


gulp.task('styles', () => {
      //Source folder
      return gulp.src(styleFiles)

      //.pipe(sourcemaps.init())
      //.pipe(sass())
  
      .pipe(concat('style.css'))
      .pipe(autoprefixer({
          cascade: false
      }))
      .pipe(cleanCSS({
          level:2
      }))
  
      //.pipe(sourcemaps.write('./'))
  
      // Destination folder
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src(scriptFiles)


    .pipe(concat('script.js'))
    .pipe(uglify({
        toplevel : true
    }))


    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

gulp.task('del', () => {
    return del(['build/*']);
});

gulp.task('img-compress', () => {
    return gulp.src('./src/img/**')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('./build/img'))
});

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/img/**', gulp.series('img-compress'));
    gulp.watch('./src/css/**/*.css', gulp.series('styles'));
    //gulp.watch('./src/css/**/*.scss',gulp.series('styles'));
    //gulp.watch('./src/css/**/*.sass',gulp.series('styles'));
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
    gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));