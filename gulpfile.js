//declare the required gulp modules
const { src, dest, task, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

function serve() {
	return browserSync.init({
		server: 'app'
	});
}

function processSass() {
	return (
		src('app/styles/*.scss')
			// intitialize source maps
			.pipe(sourcemaps.init())
			// convert our sass files to css
			// Log an error if there is one
			.pipe(sass().on('error', sass.logError))
			// add required vendor prefixes using postcss plugin
			.pipe(postcss([autoprefixer('last 4 versions')]))
			// write the source maps to the css directory
			.pipe(sourcemaps.write('.'))
			.pipe(dest('app/styles'))
	);
}

task('processSass', processSass);

function watchFiles() {
	watch('app/styles/*.scss', processSass);
	watch(['app/styles/*.css']).on('change', browserSync.reload);
	watch(['app/*.html']).on('change', browserSync.reload);
}
task('watch', watchFiles);

// use the build variable to help run the processSass function
// Run the serve and watchFiles commands in parallel
const build = series(processSass, parallel(serve, watchFiles));

task('buildAndServe', build);

task('build', build);

// default action when we use gulp command in the terminal
task('default', build);
