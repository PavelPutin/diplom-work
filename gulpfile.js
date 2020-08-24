const PROJECT_FOLDER = require(`path`).basename(__dirname);
const SOURCE_FOLDER = `src`;
const CSS_FOLDER = `css`;
const JS_FOLDER = `js`;
const IMG_FOLDER = `img`;
const FONTS_FOLDER = `fonts`

// TODO: исправить пути

const PATH = {
  build: {
    html: `${PROJECT_FOLDER}/`,
    css: `${PROJECT_FOLDER}/${CSS_FOLDER}`,
    js: `${PROJECT_FOLDER}/${JS_FOLDER}`,
    img: `${PROJECT_FOLDER}/${IMG_FOLDER}`,
    fonts: `${PROJECT_FOLDER}/${FONTS_FOLDER}`,
  },
  src: {
    html: `${SOURCE_FOLDER}/*.html`,
    css: `${SOURCE_FOLDER}/blocks/**/*.css`,
    js: `${SOURCE_FOLDER}/blocks/**/*.js`,
    img: `${SOURCE_FOLDER}/blocks/**/*.{jpg,png,gif,svg,webp,ico}`,
    fonts: `${SOURCE_FOLDER}/${FONTS_FOLDER}/**/*.ttf`,
  },
  watch: {
    html: `${SOURCE_FOLDER}/*.html`,
    css: `${SOURCE_FOLDER}/blocks/**/*.css`,
    js: `${SOURCE_FOLDER}/blocks/**/*.js`,
    img: `${SOURCE_FOLDER}/blocks/**/*.{jpg,png,gif,svg,webp,ico}`,
  },
  baseDir: `./` + PROJECT_FOLDER + `/`,
}

const { src, dest, watch, series, parallel } = require(`gulp`);
const browserSync = require(`browser-sync`).create();
const autoprefixer = require(`gulp-autoprefixer`);
const groupCssMediaQueries = require(`gulp-group-css-media-queries`);
const cleanCss = require(`gulp-clean-css`);
const rename = require(`gulp-rename`);
const babel = require(`gulp-babel`);
const eslint = require(`gulp-eslint`);
const terser = require(`gulp-terser`);
const concat = require(`gulp-concat`);
const imagemin = require(`gulp-imagemin`);
const imageminPngquant = require(`imagemin-pngquant`);
const webp = require(`gulp-webp`);
const webphtml = require(`gulp-webp-html`);
const webpcss = require(`gulp-webp-css`);
const ttf2woff = require(`gulp-ttf2woff`);
const ttf2woff2 = require(`gulp-ttf2woff2`);
const fonter = require(`gulp-fonter`);
const del = require(`delete`)

function initBrowserSync() {
  browserSync.init({
    server: {
      baseDir: PATH.baseDir
    },
    port: 3000,
    notify: false
  });
}

function fonts() {
  src(PATH.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(PATH.build.fonts));
  return src(PATH.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(PATH.build.fonts));
}

function otf2ttf() {
  return src(SOURCE_FOLDER+`/fonts/**/*.otf`)
    .pipe(fonter({
      formats: [`ttf`]
    }))
    .pipe(dest(SOURCE_FOLDER+`/fonts/`));
}

function html() {
  return src(PATH.src.html)
    .pipe(webphtml())
    .pipe(dest(PATH.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return src(PATH.src.css)
    .pipe(concat(`style.min.css`))
    .pipe(cleanCss())
    .pipe(autoprefixer({
      overrideBrowserslist: [`last 5 versions`],
      cascade: true
    }))
    .pipe(groupCssMediaQueries())
    .pipe(webpcss())
    .pipe(dest(PATH.build.css))
    .pipe(cleanCss())
    .pipe(dest(PATH.build.css))
    .pipe(browserSync.stream());
}

function js() {
  return src(PATH.src.js)
    .pipe(concat(`script.js`))
    // .pipe(eslint())
    // .pipe(eslint.format())
    .pipe(babel({
      presets: [`@babel/env`]
    }))
    .pipe(terser())
    .pipe(rename({ suffix: `.min` }))
    .pipe(dest(PATH.build.js))
    .pipe(browserSync.stream());
}

function images() {
  return src(PATH.src.img)
    .pipe(webp({ quality: 70 }))
    .pipe(dest(PATH.build.img))
    .pipe(src(PATH.src.img))
    .pipe(imagemin([
      imageminPngquant(),
      imagemin.mozjpeg({
        quality: 80,
        progressive: true
      }),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ],
    {
      verbose: true
    }))
    .pipe(dest(PATH.build.img))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch([PATH.watch.html], html);
  watch([PATH.watch.css], css);
  watch([PATH.watch.js], js);
  watch([PATH.watch.img], images)
}

function clean() {
  return del(PATH.baseDir);
}

const build = series(clean, otf2ttf, parallel(html, css, js, images, fonts));
const watchTask = parallel(build, watchFiles, initBrowserSync);

exports.build = build;
exports.html = html;
exports.css = css;
exports.js = js;
exports.fonts = fonts;
exports.default = watchTask;