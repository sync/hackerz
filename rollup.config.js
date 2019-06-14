import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import nodeResolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy-assets';
import postcss from 'rollup-plugin-postcss';
import workbox from 'rollup-plugin-workbox-build';
import json from 'rollup-plugin-json';
const pkg = require('./package.json');

const namedExports = {
  'node_modules/react/index.js': [
    'Children',
    'Component',
    'PropTypes',
    'createElement',
    'isValidElement',
    'Fragment',
    'useState',
    'useEffect',
    'useLayoutEffect',
    'useMemo',
    'useRef',
    'useReducer',
    'render',
    'hydrate',
  ],
  'node_modules/react-dom/index.js': ['render', 'hydrate'],
  'node_modules/react-dom/server.js': [
    'renderToString',
    'renderToStaticMarkup',
  ],
  'node_modules/body-parser/index.js': ['json'],
};

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

// Module config for <script type="module">
const client = {
  input: 'app/client.bs.js',
  output: {
    dir: pkg.config.publicDir,
    format: 'esm',
    entryFileNames: 'client.js',
    name: 'client',
    sourcemap: true,
  },
  plugins: [
    progress(),
    nodeResolve(),
    commonjs({
      include: ['node_modules/**'],
      namedExports,
    }),
    babel({
      babelrc: false,
      exclude: [/core-js/, /regenerator-runtime/],
      presets: ['@babel/preset-react'],
    }),
    postcss({
      inject: false,
      extract: true,
      modules: true,
      namedExports: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development',
      ),
      'process.browser': JSON.stringify(true),
    }),
    copy({
      assets: [
        './app/robots.txt',
        './app/favicon.ico',
        './app/assets',
        './app/index.html',
        './app/manifest.webmanifest',
      ],
    }),
    workbox({
      mode: 'generateSW',
      options: {
        swDest: 'dist/service-worker.js',
        globDirectory: 'dist',
      },
    }),
    production && filesize(),
    production && terser(), // minify, but only in production
    !production && livereload('dist'), // live reload, but only in dev
  ],
};

const legacyClient = {
  input: 'app/client.bs.js',
  output: {
    dir: pkg.config.publicDir,
    format: 'iife',
    entryFileNames: 'legacy-client.js',
    name: 'legacy_client',
    sourcemap: true,
  },
  plugins: [
    progress(),
    nodeResolve(),
    commonjs({
      include: ['node_modules/**'],
      namedExports,
    }),
    babel({
      babelrc: false,
      exclude: [/core-js/, /regenerator-runtime/],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { browsers: ['ie 11'] },
            useBuiltIns: 'usage',
            corejs: 3,
            loose: true,
          },
        ],
        '@babel/preset-react',
      ],
    }),
    postcss({
      inject: false,
      extract: true,
      modules: true,
      namedExports: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development',
      ),
      'process.browser': JSON.stringify(true),
    }),
    production && filesize(),
    production && terser(), // minify, but only in production
  ],
};

// for ssr
const ssrMiddleware = {
  input: 'server/ssrMiddleware.js',
  output: {
    dir: pkg.config.publicDir,
    format: 'cjs',
    entryFileNames: 'ssr-middleware.js',
    name: 'ssr-middleware',
    sourcemap: true,
  },
  external: [
    'fs',
    'stream',
    'events',
    'assert',
    'util',
    'url',
    'buffer',
    'string_decoder',
    'path',
    'zlib',
    'http',
    'https',
  ],
  plugins: [
    progress(),
    nodeResolve(),
    commonjs({
      include: ['node_modules/**'],
      namedExports,
    }),
    babel({
      babelrc: false,
      exclude: [/core-js/, /regenerator-runtime/],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: { node: 'current' },
            useBuiltIns: 'usage',
            corejs: 3,
            loose: true,
          },
        ],
        '@babel/preset-react',
      ],
    }),
    postcss({
      inject: false,
      extract: true,
      modules: true,
      namedExports: true,
    }),
    json({
      include: 'node_modules/**',
      preferConst: true,
      compact: true,
      namedExports: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development',
      ),
      'process.browser': JSON.stringify(false),
    }),
    production && filesize(),
    production && terser(), // minify, but only in production
  ],
};

// for the api
const api = {
  input: 'packages/api/server.bs.js',
  output: {
    dir: pkg.config.publicDir,
    format: 'cjs',
    entryFileNames: 'api.js',
    name: 'api',
    sourcemap: true,
  },
  external: [
    'events',
    'zlib',
    'http',
    'path',
    'net',
    'fs',
    'querystring',
    'url',
    'buffer',
    'crypto',
    'stream',
    'util',
    'tty',
  ],
  plugins: [
    progress(),
    nodeResolve({ preferBuiltins: false }),
    commonjs({
      include: ['node_modules/**'],
      namedExports,
    }),
    babel({
      babelrc: false,
      exclude: [/core-js/, /regenerator-runtime/],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: { node: 'current' },
            useBuiltIns: 'usage',
            corejs: 3,
            loose: true,
          },
        ],
      ],
    }),
    json({
      include: 'node_modules/**',
      preferConst: true,
      compact: true,
      namedExports: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development',
      ),
    }),
    production && filesize(),
    production && terser(), // minify, but only in production
  ],
};

export default production
  ? [client, legacyClient, ssrMiddleware, api]
  : [client, ssrMiddleware, api];
