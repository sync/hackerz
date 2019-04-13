import { readFileSync } from 'fs';
import glob from 'glob';
import path from 'path';

function getClientHash(legacy) {
  const clientName = legacy ? 'legacy-client' : 'client';
  const pathName = glob.sync(`${__dirname}/../dist/${clientName}-*.css`)[0];
  if (!pathName) {
    return null;
  }

  return path.basename(pathName, '.css').replace(`${clientName}`, '');
}

export function getHTML() {
  const html = readFileSync(`${__dirname}/../dist/index.html`, 'utf8');

  // client
  const clientHash = getClientHash(false) || '';

  // css
  const cssString =
    '<link rel="stylesheet" href="./client.css" crossorigin="anonymous" />';
  const cssFilename = `client${clientHash}.css`;

  // client.js
  const moduleString = '<script type="module" src="./client.js"></script>';
  const clientFilename = `client${clientHash}.js`;

  // legacy client
  const legacyClientHash = getClientHash(true) || '';

  // legacy-client.js
  const noModuleString =
    '<script type="nomodule" src="./legacy-client.js"></script>';
  const legacyClientFilename = `legacy-client${legacyClientHash}.js`;

  return html
    .replace(
      cssString,
      `<link rel="stylesheet" href="./${cssFilename}" crossorigin="anonymous" />`,
    )
    .replace(
      moduleString,
      `<script type="module" src="./${clientFilename}"></script>`,
    )
    .replace(
      noModuleString,
      `<script type="nomodule" src="./${legacyClientFilename}"></script>`,
    );
}

export function getQueryParams(req) {
  let q = req.url.split('?'),
    result = {};
  if (q.length >= 2) {
    q[1].split('&').forEach(item => {
      try {
        result[item.split('=')[0]] = item.split('=')[1];
      } catch (e) {
        result[item.split('=')[0]] = '';
      }
    });
  }
  return result;
}
