const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create();





function css_style(done) {
	gulp.src('src/sass/**/*.sass') //загружаем файлы
		.pipe(sourcemaps.init()) //инициализируем плагин
		.pipe(sass({
				errorLogToConsole: true,//включаем вывод ошибок на консоль
				outputStyle: 'compressed'//сжимаем файл без отступов
			}))
		.on('error', console.error.bind(console)) //выводим ошибки на консоль, обязательно действует, если не действует то следующие не будут выполняться
		.pipe(autoprefixer())
		.pipe(rename({suffix: '.min'}))//добавение к файлу суффикс
		.pipe(sourcemaps.write('./'))//записываем в настройки maps
		.pipe(gulp.dest('src/css/'))// выгрузка в папку файлов
		.pipe(browserSync.stream());
		done();
}

function sync(done){
	browserSync.init({
		server: {
			baseDir: "src/"
		},
		port: "3000"
	}); //инициализация программы

	done();
}
function browserReload(done) {
	browserSync.reload();
	done()
}

function watchFiles() {
	gulp.watch("src/sass/**/*", css_style); //смотреть за файлами при изменении
	gulp.watch("src/**/*.html", browserReload); //смотреть за файлами при изменении
	gulp.watch("src/**/*.js", browserReload); //смотреть за файлами при изменении

}

//gulp.task(css_style);
//gulp.task(print);

gulp.task('default', gulp.parallel(sync, watchFiles));

