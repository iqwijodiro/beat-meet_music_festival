const { src, dest, watch, parallel } = require('gulp');

// Styles
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Images
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

const terser = require('gulp-terser-js');

function css (done) {
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( postcss( [ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') )
    done()
}

function minify (done) {
    const options = {
        optimizationLevel: 3
    }
    src('src/assets/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(options)))
        .pipe( dest('build/img'))
}

function imagesWebp (done) {
    const options = {
        quality: 50
    }
    src('src/assets/img/**/*.{png,jpg}')
        .pipe( webp(options) )
        .pipe( dest('build/img'));
    done();
}
function imagesAvif (done) {
    const options = {
        quality: 50
    }
    src('src/assets/img/**/*.{png,jpg}')
        .pipe( avif(options) )
        .pipe( dest('build/img'));
    done();
}
function script (done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser())
        .pipe( sourcemaps.write() )
        .pipe(dest('build/js'))
    done()
}

function dev (done) {
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.script = script;
exports.minify = minify;
exports.imagesWebp = imagesWebp;
exports.imagesAvif = imagesAvif;
exports.dev = parallel( minify, imagesWebp, imagesAvif, script, dev );