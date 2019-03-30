import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFileSync } from 'fs';

import App from '../app/App';

const rawHTML = readFileSync(`${__dirname}/../dist/index.html`, 'utf8');

module.exports = async (req, res) => {
  try {
    const rendered = renderToString(<App />);

    res.setHeader('Content-Type', 'text/html');

    const appString = '<div id="app">';

    const finalHTML = rawHTML.replace(
      appString,
      `<div id="app">${rendered}</div>`,
    );

    res.end(finalHTML);
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end();
  }
};
