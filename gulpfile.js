const gulp = require('gulp');
const eslint = require('gulp-eslint');
const reset = require('./src/reset');

gulp.task('lint', function() {
	const files = [
		'./**/*.js',
		'.eslintrc.js'
	];
	var options = {
		rules: {
			'complexity': [1, 10],
			'max-statements': [1, 30]
		}
	};
	return gulp.src(files)
		.pipe(eslint(options))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('reset', function() {
	reset();
});
